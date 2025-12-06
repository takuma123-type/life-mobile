import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

type Tab = 'chat' | 'community' | 'mypage';

type Props = {
  active?: Tab;
  onChange?: (tab: Tab) => void;
};

export const BottomNav: React.FC<Props> = ({ active = 'chat', onChange }) => {
  const { t } = useTranslation();
  const Item = ({ label, tab }: { label: string; tab: Tab }) => (
    <Pressable onPress={() => onChange?.(tab)} style={[styles.item, active === tab && styles.activeItem]}>
      <Text style={[styles.label, active === tab && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <Item label={t('screen.chat.title')} tab="chat" />
      <Item label={t('screen.community.title')} tab="community" />
      <Item label={t('screen.mypage.title')} tab="mypage" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeItem: {
    backgroundColor: '#f8fafc',
  },
  label: {
    color: '#64748b',
    fontWeight: '600',
  },
  activeLabel: {
    color: '#0f172a',
    fontWeight: '800',
  },
});

export default BottomNav;
