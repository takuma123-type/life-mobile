import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MyPageScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>マイページ</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>パスワード変更</Text>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryText}>変更</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 20, fontWeight: "700" },
  content: { paddingHorizontal: 20 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  primaryBtn: { backgroundColor: "#22c3ff", borderRadius: 12, paddingVertical: 12, alignItems: "center" },
  primaryText: { color: "#fff", fontWeight: "700" },
});
