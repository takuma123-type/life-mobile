import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ようこそ Life Mobile へ</Text>
      <Text style={styles.subtitle}>簡単なセットアップから始めましょう</Text>
      <Link href="/(tabs)/chat" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>はじめる</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
