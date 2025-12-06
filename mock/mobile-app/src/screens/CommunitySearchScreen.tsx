import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { useAppDispatch, useAppSelector } from '../store';
import { setLanguage } from '../store/uiSlice';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { designTokens } from '../styles/designTokens.native';

const CATEGORIES = [
  '音楽', '映画', 'ゲーム', '語学', 'スポーツ', '旅行', '本・マンガ', 'アート'
];

const CommunitySearchScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(s => s.ui.language);

  const switchLang = () => {
    const next = lang === 'ja' ? 'en' : 'ja';
    dispatch(setLanguage(next));
    i18n.changeLanguage(next);
  };
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (q: string) => {
    setKeyword(q);
    const k = q.trim();
    if (!k) { setResults([]); return; }
    setResults(CATEGORIES.filter(c => c.includes(k)));
  };

  return (
    <View style={styles.container}>
      <Header title={t('screen.community.title')} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* 検索バー */}
        <View style={styles.searchBox}>
          <TextInput
            value={keyword}
            onChangeText={handleSearch}
            placeholder={'カテゴリ名で検索...'}
            style={styles.searchInput}
          />
        </View>

        {/* 言語切替 */}
        <Pressable onPress={switchLang} style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
          <Text style={{ color: designTokens.colors.text.secondary }}>{lang === 'ja' ? 'English' : '日本語'}</Text>
        </Pressable>

        {/* カテゴリグリッド */}
        <Text style={styles.sectionTitle}>カテゴリ</Text>
        <View style={styles.grid}>
          {CATEGORIES.map((name) => (
            <Pressable key={name} style={styles.gridItem} onPress={() => handleSearch(name)}>
              <Text style={styles.gridLabel}>{name}</Text>
            </Pressable>
          ))}
        </View>

        {/* 簡易検索結果 */}
        {results.length > 0 && (
          <View style={{ marginTop: 16 }}>
            <Text style={styles.sectionTitle}>検索結果</Text>
            {results.map(r => (
              <View key={r} style={styles.resultItem}>
                <Text style={{ color: designTokens.colors.text.primary }}>{r}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <BottomNav active="community" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: designTokens.colors.background.secondary },
  content: { padding: designTokens.spacing.lg },
  searchBox: {
    marginBottom: 16,
  },
  searchInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: designTokens.radius.md,
    backgroundColor: designTokens.colors.background.primary,
    borderWidth: 1,
    borderColor: designTokens.colors.border.light,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: designTokens.colors.text.primary,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12 as any,
  },
  gridItem: {
    height: 44,
    borderRadius: designTokens.radius.sm,
    backgroundColor: designTokens.colors.background.primary,
    borderWidth: 1,
    borderColor: designTokens.colors.border.light,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
    marginBottom: 12,
  },
  gridLabel: {
    fontWeight: '700',
    color: designTokens.colors.text.primary,
  },
  resultItem: {
    padding: 14,
    borderRadius: designTokens.radius.md,
    backgroundColor: designTokens.colors.background.primary,
    borderWidth: 1,
    borderColor: designTokens.colors.border.light,
    marginBottom: 10,
  },
});

export default CommunitySearchScreen;
