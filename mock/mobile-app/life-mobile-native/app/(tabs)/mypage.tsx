import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SignupModal } from "../../src/components/SignupModal";
import { LoginModal } from "../../src/components/LoginModal";
import { VerificationModal } from "../../src/components/VerificationModal";
import { Toast } from "../../src/components/Toast";
import { useLoggedIn } from "../../src/src/store/authState";

export default function MyPageScreen() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('090-1234-5678');
  const [showToast, setShowToast] = useState(false);
  const isLoggedIn = useLoggedIn();

  console.log('MyPageScreen render - showVerificationModal:', showVerificationModal, 'phoneNumber:', phoneNumber);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>マイページ</Text>
      </View>
      <View style={styles.content}>
        {isLoggedIn ? (
          <>
            <View style={styles.gridRow}>
              <TouchableOpacity style={styles.gridCard}>
                <View style={[styles.iconCircleSm, { backgroundColor: '#cce7ff' }]}>
                  <Ionicons name="person-outline" size={26} color="#1e3a8a" />
                </View>
                <Text style={styles.gridLabel}>プロフィール</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gridCard}>
                <View style={[styles.iconCircleSm, { backgroundColor: '#ffd6d6' }]}>
                  <Ionicons name="people-outline" size={26} color="#9f1239" />
                </View>
                <Text style={styles.gridLabel}>フレンド申請</Text>
                <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
              </TouchableOpacity>
            </View>
            <View style={styles.gridRow}>
              <TouchableOpacity style={styles.gridCard}>
                <View style={[styles.iconCircleSm, { backgroundColor: '#ffe9a8' }]}>
                  <Ionicons name="pricetag-outline" size={26} color="#92400e" />
                </View>
                <Text style={styles.gridLabel}>スタンプ購入</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gridCard}>
                <View style={[styles.iconCircleSm, { backgroundColor: '#e3d5ff' }]}>
                  <Ionicons name="globe-outline" size={26} color="#6d28d9" />
                </View>
                <Text style={styles.gridLabel}>言語設定</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gridRow}>
              <TouchableOpacity style={styles.gridCard}>
                <View style={[styles.iconCircleSm, { backgroundColor: '#cce7ff' }]}>
                  <Ionicons name="lock-closed-outline" size={26} color="#1e3a8a" />
                </View>
                <Text style={styles.gridLabel}>パスワード変更</Text>
              </TouchableOpacity>
              <View style={styles.placeholderCard} />
            </View>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionRow}>
                <Ionicons name="log-out-outline" size={22} color="#ef4444" style={styles.actionIcon} />
                <Text style={styles.actionText}>ログアウト</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionRow}>
                <Ionicons name="shield-outline" size={22} color="#ef4444" style={styles.actionIcon} />
                <Text style={styles.actionText}>退会（アカウント削除）</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
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
          </>
        )}
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
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20, gap: 16 },
  gridRow: { flexDirection: 'row', gap: 12 },
  gridCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, paddingVertical: 22, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center',
    minHeight: 120,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 1, position: 'relative', marginBottom: 12, overflow: 'hidden' },
  placeholderCard: { flex: 1, borderRadius: 16, marginBottom: 12 },
  gridCardSmall: { flex: 1, backgroundColor: '#fff', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center',
    minHeight: 96,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 1, position: 'relative', marginBottom: 12, overflow: 'hidden' },
  iconCircleSm: { width: 54, height: 54, borderRadius: 27, marginBottom: 12, alignItems: 'center', justifyContent: 'center' },
  gridLabel: { fontSize: 14, fontWeight: '800', color: '#1a1a1a' },
  badge: { position: 'absolute', right: 10, top: 10, backgroundColor: '#ff4d4f', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  actionCard: { backgroundColor: '#fff', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 16, marginTop: 8,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  actionIcon: { marginRight: 8 },
  actionText: { color: '#ef4444', fontSize: 16, fontWeight: '800' },
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
