import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { designTokens } from '@styles/designTokens.native';

interface MyProfileModalProps {
  visible: boolean;
  onClose: () => void;
  user?: { id?: string; name?: string; age?: string; region?: string; time?: string; intro?: string; image?: string };
  onEdit?: () => void;
}

const MyProfileModal: React.FC<MyProfileModalProps> = ({ visible, onClose, user, onEdit }) => {
  const insets = useSafeAreaInsets();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(40)).current;

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

  const displayName = user?.name || '未設定';
  const avatarUri = user?.image || undefined;

  return (
    <Modal visible={visible} transparent animationType="none" presentationStyle="overFullScreen" onRequestClose={handleClose}>
      <Animated.View style={[styles.backdrop, { opacity }]} />
      <Animated.View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16), transform: [{ translateY }] } ]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>マイプロフィール</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color="#111827" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={styles.centerBlock}>
            <View style={styles.avatarWrap}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person-outline" size={42} color="#9ca3af" />
                </View>
              )}
              <View style={styles.avatarRing} />
              <View style={styles.onlineDot} />
            </View>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text style={styles.userId}>ID: {user?.id || 'me'}</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={onEdit}>
              <Text style={styles.primaryBtnText}>プロフィールを編集</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>基本情報</Text>
            <View style={styles.row}> 
              <Text style={styles.label}>年代</Text>
              <Text style={styles.value}>{user?.age || '未設定'}</Text>
            </View>
            <View style={styles.row}> 
              <Text style={styles.label}>地域</Text>
              <Text style={styles.value}>{user?.region || '未設定'}</Text>
            </View>
            <View style={styles.row}> 
              <Text style={styles.label}>よく使う時間帯</Text>
              <Text style={styles.value}>{user?.time || '未設定'}</Text>
            </View>
            <View style={styles.row}> 
              <Text style={styles.label}>自己紹介</Text>
              <Text style={styles.value}>{user?.intro || 'よろしくお願いします！'}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>ギャラリー</Text>
            <View style={styles.galleryBox} />
          </View>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 20, paddingTop: 16,
    maxHeight: '88%',
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: -4 }, elevation: 8,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: designTokens.colors.text.primary },
  closeBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' },
  centerBlock: { alignItems: 'center', marginTop: 8, marginBottom: 16 },
  avatarWrap: { width: 120, height: 120, borderRadius: 60, position: 'relative', marginBottom: 12, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' },
  avatar: { width: '100%', height: '100%' },
  avatarPlaceholder: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  avatarRing: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, borderRadius: 60, borderWidth: 6, borderColor: 'rgba(34,195,255,0.25)' },
  onlineDot: { position: 'absolute', right: 8, bottom: 8, width: 12, height: 12, borderRadius: 6, backgroundColor: '#22c55e', borderWidth: 2, borderColor: '#fff' },
  displayName: { fontSize: 22, fontWeight: '800', color: designTokens.colors.text.primary },
  userId: { fontSize: 12, fontWeight: '700', color: '#6b7280', marginTop: 4 },
  primaryBtn: { backgroundColor: '#22c3ff', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 24, marginTop: 12,
    shadowColor: '#22c3ff', shadowOpacity: 0.35, shadowRadius: 8, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  primaryBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#eef2f7',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 1 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: designTokens.colors.text.primary, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontSize: 14, fontWeight: '700', color: '#64748b' },
  value: { fontSize: 14, fontWeight: '800', color: designTokens.colors.text.primary },
  galleryBox: { height: 120, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed', borderColor: '#cbd5e1', backgroundColor: '#f8fafc' },
});

export default MyProfileModal;
