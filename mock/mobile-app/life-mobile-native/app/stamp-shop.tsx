import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { router } from 'expo-router';

type StampPack = {
  id: string;
  name: string;
  count: number;
  pricePt: number;
};

const packsSeed: StampPack[] = [
  { id: 'pack1', name: 'まるこ', count: 24, pricePt: 100 },
  { id: 'pack2', name: 'りょの', count: 24, pricePt: 100 },
  { id: 'pack3', name: 'ヨギリリ', count: 24, pricePt: 100 },
  { id: 'pack4', name: 'やましたまほ', count: 24, pricePt: 100 },
];

export default function StampShopScreen() {
  const [points, setPoints] = useState(50);
  const [packs, setPacks] = useState<StampPack[]>(packsSeed);
  const [preview, setPreview] = useState<StampPack | null>(null);
  const ownedIds = useMemo(() => new Set<string>(), []);

  const { width } = Dimensions.get('window');
  const cardW = (width - 20 * 2 - 12 * 3) / 2; // padding 20, gap 12

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>スタンプ購入</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Points ribbon */}
      <View style={styles.ribbonWrap}>
        <View style={styles.ribbon}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#334155', fontWeight: '700' }}>保有ポイント</Text>
            <Text style={{ color: '#0EA5E9', fontSize: 20, fontWeight: '800', marginLeft: 10 }}>{points}</Text>
          </View>
          <TouchableOpacity style={styles.adBtn}>
            <Text style={{ color: '#fff', fontWeight: '800' }}>広告を見る</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '800', color: '#0f172a', marginBottom: 6 }}>お気に入りのスタンプを見つけよう</Text>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>タップして詳細・プレビュー / 所有済みは青いバッジが表示されます。</Text>
      </View>

      <FlatList
        data={packs}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => {
          const owned = ownedIds.has(item.id);
          return (
            <TouchableOpacity style={[styles.card, { width: cardW }]} onPress={() => setPreview(item)}>
              {owned && (
                <View style={styles.ownedBadge}><Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>OWNED</Text></View>
              )}
              <View style={styles.stampArea}><Text style={{ color: '#cbd5e1', fontSize: 26, fontWeight: '800' }}>STAMP</Text></View>
              <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 14, fontWeight: '800', color: '#0f172a' }}>{item.name}</Text>
                <Text style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{item.count}個</Text>
                <Text style={{ fontSize: 14, fontWeight: '800', color: '#0f172a', marginTop: 8 }}>{item.pricePt}pt</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Preview modal */}
      {preview && (
        <View style={styles.centerModalWrap}>
          <TouchableOpacity style={styles.centerBackdrop} onPress={() => setPreview(null)} />
          <View style={styles.centerModal}>
            <Text style={styles.centerTitle}>{preview.name}</Text>
            <Text style={styles.centerSub}>ゆるゆるニャンコ</Text>
            <View style={{ marginTop: 12 }} />
            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={() => {
                if (points >= preview.pricePt) {
                  setPoints((p) => p - preview.pricePt);
                  setPreview(null);
                }
              }}
            >
              <Text style={{ color: '#0f172a', fontWeight: '800' }}>{preview.pricePt}ptでダウンロード</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setPreview(null)}>
              <Text style={{ color: '#0f172a', fontWeight: '800' }}>キャンセル</Text>
            </TouchableOpacity>

            {/* Grid preview */}
            <View style={styles.imgGrid}>
              {Array.from({ length: 12 }).map((_, i) => (
                <View key={i} style={styles.imgCell}><Text style={styles.imgText}>IMG</Text></View>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 14, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eef2ff', alignItems: 'center', justifyContent: 'center' },
  backText: { color: '#1f2937', fontSize: 22, fontWeight: '800' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  ribbonWrap: { paddingHorizontal: 20, paddingTop: 10 },
  ribbon: { backgroundColor: '#e6f3ff', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#3b82f6', shadowOpacity: 0.15, shadowRadius: 18, shadowOffset: { width: 0, height: 10 } },
  adBtn: { backgroundColor: '#22c3ff', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999 },
  card: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, borderWidth: 1, borderColor: '#e2e8f0' },
  ownedBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: '#0EA5E9', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4, zIndex: 2 },
  stampArea: { height: 92, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' },
  centerModalWrap: { position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' },
  centerBackdrop: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)' },
  centerModal: { width: '92%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 18, paddingVertical: 18, paddingHorizontal: 16, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 20, shadowOffset: { width: 0, height: 12 } },
  centerTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a', textAlign: 'center', marginBottom: 6 },
  centerSub: { fontSize: 13, color: '#64748b', textAlign: 'center' },
  downloadBtn: { marginTop: 14, backgroundColor: '#cfe8ff', borderRadius: 12, alignItems: 'center', justifyContent: 'center', height: 46 },
  cancelBtn: { marginTop: 10, backgroundColor: '#fff', borderRadius: 12, alignItems: 'center', justifyContent: 'center', height: 46, borderWidth: 1, borderColor: '#e5e7eb' },
  imgGrid: { marginTop: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  imgCell: { width: 64, height: 64, borderRadius: 12, backgroundColor: '#e2e8f0', alignItems: 'center', justifyContent: 'center' },
  imgText: { color: '#94a3b8', fontWeight: '800' }
});
