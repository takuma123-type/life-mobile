import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function ChatListScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>LIFE</Text>
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        {[...Array(10)].map((_, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardImg} />
            <Text style={styles.cardTitle}>アニメとゲームが好きです！</Text>
            <Text style={styles.cardMeta}>ゆい 10代後半</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "700" },
  grid: { paddingHorizontal: 16, paddingBottom: 24, flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { width: "48%", borderRadius: 12, overflow: "hidden", backgroundColor: "#fff", shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  cardImg: { height: 120, backgroundColor: "#e2e8f0" },
  cardTitle: { fontSize: 14, fontWeight: "600", color: "#0f172a", paddingHorizontal: 12, paddingTop: 10 },
  cardMeta: { fontSize: 12, color: "#475569", paddingHorizontal: 12, paddingBottom: 12 },
});
