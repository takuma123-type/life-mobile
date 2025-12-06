import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { designTokens } from '@styles/designTokens.native';

interface Community {
  id: string;
  name: string;
  members: number;
  posts: number;
  tag: string;
  description?: string;
}

interface CommunityProfileModalProps {
  visible: boolean;
  onClose: () => void;
  community: Community | null;
}

const CommunityProfileModal: React.FC<CommunityProfileModalProps> = ({ visible, onClose, community }) => {
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

  if (!community) return null;

  return (
    <Modal visible={visible} transparent animationType="none" presentationStyle="overFullScreen" onRequestClose={handleClose}>
      <Animated.View style={[styles.backdrop, { opacity }]} />
      <Animated.View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16), transform: [{ translateY }] } ]}>
        <View style={styles.headerRow}>
          <View style={{ width: 40 }} />
          <Text style={styles.headerTitle}>コミュニティ</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color="#111827" />
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 8 }}>
          <View style={styles.logoPlaceholder} />
          <View style={{ marginTop: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={styles.title}>{community.name}</Text>
              <View style={styles.tag}><Text style={styles.tagText}>{community.tag}</Text></View>
            </View>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{community.members}</Text>
              <Text style={styles.statLabel}>メンバー</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{community.posts}</Text>
              <Text style={styles.statLabel}>投稿</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.joinBtn} activeOpacity={0.9}>
            <Text style={styles.joinBtnText}>チャットに参加</Text>
          </TouchableOpacity>

          <View style={styles.descCard}>
            <Text style={styles.descTitle}>コミュニティについて</Text>
            <Text style={styles.descText}>{community.description || 'このコミュニティでは、メンバー同士が交流し、情報を共有しています。'}</Text>
          </View>
        </View>
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
  logoPlaceholder: { width: 96, height: 96, borderRadius: 20, backgroundColor: '#f3f7fc', borderWidth: 2, borderColor: '#e6effa', alignSelf: 'center' },
  title: { fontSize: 22, fontWeight: '800', color: designTokens.colors.text.primary },
  tag: { marginLeft: 6, backgroundColor: '#e6f7ff', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999 },
  tagText: { color: '#22c3ff', fontWeight: '800', fontSize: 12 },
  statsCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#eaf5ff', borderRadius: 16, paddingVertical: 18, paddingHorizontal: 24, marginTop: 16 },
  statItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  statNumber: { color: '#22c3ff', fontWeight: '800', fontSize: 24 },
  statLabel: { color: '#5b6b7f', fontWeight: '700', fontSize: 12, marginTop: 4 },
  statDivider: { width: 1, height: 28, backgroundColor: '#cfe3f7' },
  joinBtn: { backgroundColor: '#22c3ff', borderRadius: 999, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  joinBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  descCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginTop: 16, borderWidth: 1, borderColor: '#eef2f7',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 1 },
  descTitle: { fontSize: 16, fontWeight: '800', color: designTokens.colors.text.primary, marginBottom: 8 },
  descText: { fontSize: 14, fontWeight: '600', color: '#64748b' },
});

export default CommunityProfileModal;
