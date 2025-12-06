import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { designTokens } from '@styles/designTokens.native';

interface CommunitySearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSearch?: (filters: { keyword?: string; category?: string }) => void;
}

const categories = ['音楽', '映画', '芸能人・テレビ', 'ゲーム', '本・マンガ', 'アート', 'スポーツ', '車・バイク', '旅行', 'ホーム・DIY'];

const CommunitySearchModal: React.FC<CommunitySearchModalProps> = ({ visible, onClose, onSearch }) => {
  const insets = useSafeAreaInsets();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(40)).current;
  const [keyword, setKeyword] = React.useState('');
  const [category, setCategory] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 6 })
      ]).start();
    } else {
      opacity.setValue(0);
      translateY.setValue(40);
      setKeyword('');
      setCategory(undefined);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 40, duration: 180, useNativeDriver: true })
    ]).start(({ finished }) => finished && onClose());
  };

  const handleSearch = () => {
    onSearch?.({ keyword, category });
    handleClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none" presentationStyle="overFullScreen" onRequestClose={handleClose}>
      <Animated.View style={[styles.backdrop, { opacity }]} />
      <Animated.View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16), transform: [{ translateY }] } ]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>コミュニティ検索</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* キーワード */}
        <View style={styles.inputBox}>
          <Text style={styles.hash}>#</Text>
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="カテゴリ名で検索…"
            placeholderTextColor="#98a2b3"
            style={styles.textInput}
          />
        </View>

        <Text style={styles.sectionHeader}>カテゴリ</Text>
        <View style={styles.grid}> 
          {categories.map(cat => (
            <TouchableOpacity key={cat} style={[styles.gridItem, category === cat && styles.gridItemActive]} onPress={() => setCategory(cat)}>
              <Text style={[styles.gridItemText, category === cat && styles.gridItemTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>検索</Text>
        </TouchableOpacity>
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
  inputBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#f8fbff', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: '#e6eef7' },
  hash: { color: '#98a2b3', fontWeight: '800' },
  textInput: { flex: 1, color: designTokens.colors.text.primary, fontWeight: '700' },
  sectionHeader: { marginTop: 16, marginBottom: 10, fontSize: 16, fontWeight: '800', color: designTokens.colors.text.primary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '48%', backgroundColor: '#f8fbff', borderRadius: 16, paddingVertical: 14, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#e6eef7' },
  gridItemActive: { borderColor: '#22c3ff', backgroundColor: '#e6f7ff' },
  gridItemText: { color: designTokens.colors.text.primary, fontWeight: '800' },
  gridItemTextActive: { color: '#22c3ff' },
  searchBtn: { backgroundColor: '#22c3ff', borderRadius: 16, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  searchBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});

export default CommunitySearchModal;
