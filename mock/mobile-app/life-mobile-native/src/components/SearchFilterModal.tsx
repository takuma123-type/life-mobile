import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { designTokens } from '@styles/designTokens.native';

interface SearchFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onSearch?: (filters: { keyword?: string; age?: string; region?: string; time?: string }) => void;
}

const ages = ['10代前半', '10代後半', '20代', '30代', '40代', '50代以上'];
const times = ['朝', '昼', '夜', '深夜'];

const SearchFilterModal: React.FC<SearchFilterModalProps> = ({ visible, onClose, onSearch }) => {
  const insets = useSafeAreaInsets();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(40)).current;
  const [keyword, setKeyword] = React.useState('');
  const [age, setAge] = React.useState<string | undefined>(undefined);
  const [region, setRegion] = React.useState<string>('こだわらない');
  const [time, setTime] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 6 })
      ]).start();
    } else {
      opacity.setValue(0);
      translateY.setValue(40);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 40, duration: 180, useNativeDriver: true })
    ]).start(({ finished }) => finished && onClose());
  };

  const handleClear = () => {
    setKeyword('');
    setAge(undefined);
    setRegion('こだわらない');
    setTime(undefined);
  };

  const handleSearch = () => {
    onSearch?.({ keyword, age, region, time });
    handleClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none" presentationStyle="overFullScreen" onRequestClose={handleClose}>
      <Animated.View style={[styles.backdrop, { opacity }]} />
      <Animated.View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16), transform: [{ translateY }] } ]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>詳細検索</Text>
          <TouchableOpacity onPress={handleClear}><Text style={styles.clearText}>条件をクリア</Text></TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 8 }}>
          {/* キーワード */}
          <View style={styles.sectionRow}>
            <View style={styles.iconRow}><Ionicons name="search" size={18} color="#64748b" /><Text style={styles.sectionTitle}>キーワード</Text></View>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              value={keyword}
              onChangeText={setKeyword}
              placeholder="ユーザー名で検索…"
              placeholderTextColor="#98a2b3"
              style={styles.textInput}
            />
          </View>

          {/* 年代 */}
          <View style={styles.sectionRow}>
            <View style={styles.iconRow}><Ionicons name="calendar-outline" size={18} color="#64748b" /><Text style={styles.sectionTitle}>年代</Text></View>
          </View>
          <View style={styles.pillWrap}>
            {ages.map(a => (
              <TouchableOpacity key={a} style={[styles.pill, age === a && styles.pillActive]} onPress={() => setAge(a)}>
                <Text style={[styles.pillText, age === a && styles.pillTextActive]}>{a}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 居住地 */}
          <View style={styles.sectionRow}>
            <View style={styles.iconRow}><Ionicons name="location-outline" size={18} color="#64748b" /><Text style={styles.sectionTitle}>居住地</Text></View>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputPlaceholder}>{region}</Text>
            <Ionicons name="chevron-forward" size={18} color="#98a2b3" />
          </View>

          {/* よく使う時間帯 */}
          <View style={styles.sectionRow}>
            <View style={styles.iconRow}><Ionicons name="time-outline" size={18} color="#64748b" /><Text style={styles.sectionTitle}>よく使う時間帯</Text></View>
          </View>
          <View style={styles.pillWrap}>
            {times.map(t => (
              <TouchableOpacity key={t} style={[styles.pill, time === t && styles.pillActive]} onPress={() => setTime(t)}>
                <Text style={[styles.pillText, time === t && styles.pillTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 検索ボタン */}
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchBtnText}>検索</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.35)' },
  sheet: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 20, paddingTop: 16,
    maxHeight: '88%',
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: -4 }, elevation: 8,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: designTokens.colors.text.primary },
  closeBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' },
  clearText: { color: '#22c3ff', fontWeight: '800' },
  sectionRow: { marginTop: 8, marginBottom: 8 },
  iconRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { color: '#64748b', fontWeight: '800' },
  inputBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: '#e6eef7' },
  textInput: { flex: 1, color: designTokens.colors.text.primary, fontWeight: '700' },
  inputPlaceholder: { color: '#98a2b3', fontWeight: '700' },
  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pill: { borderColor: '#e6eef7', borderWidth: 2, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#fff' },
  pillActive: { borderColor: '#22c3ff', backgroundColor: '#e6f7ff' },
  pillText: { color: '#64748b', fontWeight: '800' },
  pillTextActive: { color: '#22c3ff' },
  searchBtn: { backgroundColor: '#22c3ff', borderRadius: 16, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  searchBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});

export default SearchFilterModal;
