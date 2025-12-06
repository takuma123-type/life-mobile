import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, TextInput, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { designTokens } from '@styles/designTokens.native';

interface CommunityCreateModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate?: (payload: { name: string; categories: string[]; description?: string }) => void;
}

const categoryOptions = ['音楽', '旅行', 'ゲーム', '語学', 'スポーツ', '映画', '本・マンガ', 'アート', '車・バイク', 'ホーム・DIY'];

const CommunityCreateModal: React.FC<CommunityCreateModalProps> = ({ visible, onClose, onCreate }) => {
  const insets = useSafeAreaInsets();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(40)).current;

  const [name, setName] = React.useState('');
  const [categories, setCategories] = React.useState<string[]>([]);
  const [description, setDescription] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 6 })
      ]).start();
    } else {
      opacity.setValue(0);
      translateY.setValue(40);
      setError(null);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 40, duration: 180, useNativeDriver: true })
    ]).start(({ finished }) => finished && onClose());
  };

  const toggleCategory = (c: string) => {
    setCategories(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const handleCreate = () => {
    if (!name.trim()) {
      setError('名前は必須です');
      return;
    }
    onCreate?.({ name: name.trim(), categories, description: description.trim() || undefined });
    handleClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none" presentationStyle="overFullScreen" onRequestClose={handleClose}>
      <Animated.View style={[styles.backdrop, { opacity }]} />
      <Animated.View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16), transform: [{ translateY }] } ]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>コミュニティを作成</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color="#111827" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
          {/* 名前 */}
          <View style={styles.labelRow}>
            <Text style={styles.label}>名前</Text>
            <Text style={styles.requiredBadge}>必須</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              value={name}
              onChangeText={(t) => { setName(t); if (error) setError(null); }}
              placeholder="コミュニティ名"
              placeholderTextColor="#98a2b3"
              style={styles.textInput}
            />
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* カテゴリ */}
          <Text style={styles.sectionHeader}>カテゴリ</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputPlaceholder}>例: 音楽・旅行</Text>
          </View>
          <View style={styles.pillGrid}>
            {categoryOptions.map(c => (
              <TouchableOpacity
                key={c}
                style={[styles.pillItem, categories.includes(c) && styles.pillItemActive]}
                onPress={() => toggleCategory(c)}
                activeOpacity={0.8}
              >
                <Ionicons name="pricetag-outline" size={16} color={categories.includes(c) ? '#22c3ff' : '#64748b'} />
                <Text style={[styles.pillItemText, categories.includes(c) && styles.pillItemTextActive]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* アイコン（プレースホルダー改良） */}
          <Text style={styles.sectionHeader}>アイコン</Text>
          <View style={styles.uploadBox}
          >
            <View style={styles.iconPreviewRow}>
              <View style={styles.iconPreviewCircle}
              >
                <Ionicons name="image-outline" size={22} color="#22c3ff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.uploadText}>ファイルを選択（モック）</Text>
                <Text style={styles.uploadHelp}>JPG/PNG/SVG、1MB以内推奨。将来はドラッグ＆ドロップにも対応。</Text>
              </View>
            </View>
            <View style={styles.uploadDashed}
            >
              <Ionicons name="cloud-upload-outline" size={20} color="#98a2b3" />
              <Text style={styles.uploadDashedText}>ここをタップして選択</Text>
            </View>
          </View>

          {/* 説明 */}
          <Text style={styles.sectionHeader}>説明</Text>
          <View style={[styles.inputBox, { height: 96, alignItems: 'flex-start' }] }>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="コミュニティの説明"
              placeholderTextColor="#98a2b3"
              style={[styles.textInput, { flex: 1 } ]}
              multiline
            />
          </View>

          <View style={styles.footerRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}><Text style={styles.cancelText}>キャンセル</Text></TouchableOpacity>
            <TouchableOpacity style={styles.createBtn} onPress={handleCreate}><Text style={styles.createText}>作成</Text></TouchableOpacity>
          </View>
        </ScrollView>
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
    maxHeight: '90%',
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: -4 }, elevation: 8,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: designTokens.colors.text.primary },
  closeBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, marginBottom: 8 },
  label: { color: '#0f172a', fontWeight: '800' },
  requiredBadge: { color: '#22c3ff', backgroundColor: '#e6f7ff', fontWeight: '800', borderRadius: 999, paddingVertical: 2, paddingHorizontal: 8, overflow: 'hidden' },
  inputBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#f8fbff', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: '#e6eef7' },
  textInput: { flex: 1, color: designTokens.colors.text.primary, fontWeight: '700' },
  errorText: { color: '#ef4444', fontWeight: '800', marginTop: 6 },
  sectionHeader: { marginTop: 16, marginBottom: 10, fontSize: 16, fontWeight: '800', color: designTokens.colors.text.primary },
  pillGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  pillItem: { width: '48%', flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#f8fbff', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: '#e6eef7', marginBottom: 10 },
  pillItemActive: { borderColor: '#22c3ff', backgroundColor: '#e6f7ff' },
  pillItemText: { color: '#0f172a', fontWeight: '800' },
  pillItemTextActive: { color: '#22c3ff' },
  uploadBox: { backgroundColor: '#fff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#e6eef7' },
  iconPreviewRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  iconPreviewCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#e6f7ff', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#22c3ff', shadowOpacity: 0.25, shadowRadius: 6, shadowOffset: { width: 0, height: 4 } },
  uploadText: { color: '#0f172a', fontWeight: '800', marginBottom: 2 },
  uploadHelp: { color: '#98a2b3', fontWeight: '700' },
  uploadDashed: { marginTop: 8, borderWidth: 2, borderStyle: 'dashed', borderColor: '#e6eef7', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  uploadDashedText: { color: '#98a2b3', fontWeight: '800' },
  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  cancelBtn: { backgroundColor: '#f3f4f6', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 16 },
  cancelText: { color: '#0f172a', fontWeight: '800' },
  createBtn: { backgroundColor: '#22c3ff', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 16 },
  createText: { color: '#fff', fontWeight: '800' },
});

export default CommunityCreateModal;
