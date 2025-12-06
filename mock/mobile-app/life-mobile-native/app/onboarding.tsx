import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";
import { router } from "expo-router";
import "@i18n";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

const pages = [
  {
    title: "趣味でつながる、新しいコミュニティ",
    desc: "LIFEへようこそ。あなたの好きが誰かの好きと出会う場所。",
  },
  {
    title: "好きなことで仲間を見つけよう",
    desc: "アニメ、ゲーム、料理など、様々なコミュニティに参加できます。",
  },
  {
    title: "気軽にメッセージでつながる",
    desc: "趣味の仲間とチャットやスタンプで楽しく交流。",
  },
  {
    title: "さあ、始めよう",
    desc: "今すぐ参加してコミュニティを覗いてみよう。",
  },
];

export default function Onboarding() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const isLast = index === pages.length - 1;
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    fade.setValue(0);
    slide.setValue(10);
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start();
  }, [index]);

  const next = () => setIndex((i) => Math.min(i + 1, pages.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const start = () => router.replace("/(tabs)/chat");

  return (
    <View style={styles.container}>
      <View style={styles.centerArea}>
        <Animated.View style={[styles.hero, { opacity: fade, transform: [{ translateY: slide }] }]}>
          <View style={styles.circle} />
          <Text style={styles.heroImgLabel}>IMG</Text>
        </Animated.View>
        <Animated.View style={[styles.textWrap, { opacity: fade, transform: [{ translateY: slide }] }]}>
          <Text style={styles.title}>{t(`onboarding.pages.${index + 1}.title`)}</Text>
          <Text style={styles.desc}>{t(`onboarding.pages.${index + 1}.desc`)}</Text>
        </Animated.View>
        <View style={styles.dotsWrap}>
          <View style={styles.dots}>
            {pages.map((_, i) => (
              <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.controls}>
        <View style={styles.navBtns}>
          <TouchableOpacity onPress={prev} style={[styles.circleBtn, { opacity: index === 0 ? 0.5 : 1 }]}>
            <Text style={styles.arrow}>{"←"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={isLast ? start : next} style={[styles.circleBtn, styles.primaryBtn]}>
            <Text style={[styles.arrow, styles.primaryArrow]}>{isLast ? "✓" : "→"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={start} style={styles.cta}>
          <Text style={styles.ctaText}>{t('cta.startChat')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 24, paddingTop: 8 },
  centerArea: { flex: 1, alignItems: "center", justifyContent: "center" },
  hero: { alignItems: "center", marginBottom: 12 },
  circle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: "#e0f2fe",
    shadowColor: "#38bdf8",
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
  },
  heroImgLabel: { position: "absolute", top: width * 0.35 - 14, fontSize: 28, fontWeight: "700", color: "#0284c7" },
  textWrap: { paddingHorizontal: 12, marginTop: 12, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", color: "#0f172a", textAlign: "center" },
  desc: { fontSize: 16, color: "#475569", textAlign: "center", marginTop: 10 },
  dotsWrap: { marginTop: 8, marginBottom: 0 },
  controls: { alignItems: "center", paddingBottom: 28 },
  dots: { flexDirection: "row", gap: 8, marginBottom: 12 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#cfe8f8" },
  dotActive: { backgroundColor: "#38bdf8", shadowColor: "#38bdf8", shadowOpacity: 0.6, shadowRadius: 6, shadowOffset: { width: 0, height: 4 } },
  navBtns: { flexDirection: "row", gap: 20, marginTop: 0, marginBottom: 12 },
  circleBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#e6f6ff", alignItems: "center", justifyContent: "center" },
  primaryBtn: { backgroundColor: "#22c3ff" },
  arrow: { fontSize: 20, color: "#0ea5e9" },
  primaryArrow: { color: "#fff", fontWeight: "700" },
  cta: { backgroundColor: "#22c3ff", borderRadius: 24, paddingVertical: 14, paddingHorizontal: 24, marginTop: 16 },
  ctaText: { color: "#fff", fontWeight: "700", textAlign: "center" },
  skipText: { color: "#0284c7", fontWeight: "700" },
});
