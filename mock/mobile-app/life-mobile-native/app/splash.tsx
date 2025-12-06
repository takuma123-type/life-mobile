import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Splash() {
  useEffect(() => {
    const t = setTimeout(() => router.replace("/onboarding"), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LIFE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" },
  title: { fontSize: 42, fontWeight: "800", letterSpacing: 2, color: "#0f172a" },
});
