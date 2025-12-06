import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SignupModal } from "../../src/components/SignupModal";
import { LoginModal } from "../../src/components/LoginModal";
import { VerificationModal } from "../../src/components/VerificationModal";
import { Toast } from "../../src/components/Toast";

export default function MyPageScreen() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('090-1234-5678');
  const [showToast, setShowToast] = useState(false);

  console.log('MyPageScreen render - showVerificationModal:', showVerificationModal, 'phoneNumber:', phoneNumber);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>マイページ</Text>
      </View>
      <View style={styles.content}>
        {/* 新規登録/ログインボタン */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => setShowSignupModal(true)}
        >
          <Ionicons name="person-circle-outline" size={24} color="#fff" />
          <Text style={styles.primaryButtonText}>新規登録 / ログイン</Text>
        </TouchableOpacity>

        {/* 言語設定カード */}
        <TouchableOpacity style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <View style={styles.iconCircle}>
              <Ionicons name="globe-outline" size={28} color="#8b5cf6" />
            </View>
            <Text style={styles.settingText}>言語設定 / Language</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#d1d5db" />
        </TouchableOpacity>
      </View>

      <SignupModal 
        visible={showSignupModal && !showVerificationModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
        onSubmitted={(phone) => {
          console.log('onSuccess called with phone:', phone);
          setPhoneNumber(phone);
          setShowSignupModal(false);
          setTimeout(() => {
            console.log('Setting showVerificationModal to true');
            setShowVerificationModal(true);
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 2000);
          }, 300);
        }}
      />
      
      <LoginModal 
        visible={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />

      <Toast visible={showToast} message="送信成功しました" type="success" />

      <VerificationModal
        visible={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        phoneNumber={phoneNumber}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { 
    paddingTop: 56, 
    paddingHorizontal: 20, 
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  title: { fontSize: 22, fontWeight: "700" },
  content: { paddingHorizontal: 20, paddingTop: 20, gap: 16 },
  primaryButton: {
    backgroundColor: "#22c3ff",
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  settingCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f3e5ff",
    alignItems: "center",
    justifyContent: "center",
  },
  settingText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
  },
});
