import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, TouchableOpacity, TextInput } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onDeleted: () => void;
};

export default function DeleteAccountModal({ visible, onClose, onDeleted }: Props) {
  const backdrop = useRef(new Animated.Value(0)).current;
  const sheetY = useRef(new Animated.Value(80)).current;
  const [confirmText, setConfirmText] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdrop, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.spring(sheetY, { toValue: 0, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdrop, { toValue: 0, duration: 160, useNativeDriver: true }),
        Animated.timing(sheetY, { toValue: 80, duration: 160, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) { setConfirmText(''); setShowConfirm(false); }
  }, [visible]);

  if (!visible) return null;

  const canProceed = confirmText.trim() === '退会';

  return (
    <View style={{ position: 'absolute', inset: 0, justifyContent: 'flex-end' }}>
      <Animated.View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', opacity: backdrop }} />
      <Animated.View style={{ transform: [{ translateY: sheetY }], backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
        <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderColor: '#e5e7eb', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#0f172a' }}>退会の確認</Text>
          <TouchableOpacity onPress={onClose} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#eef2f7', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: '#0f172a' }}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 18 }}>
          <View style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, marginBottom: 12 }}>
            <Text style={{ color: '#334155', lineHeight: 22 }}>
              退会すると、プロフィール・フレンド・コミュニティ参加履歴などのデータが削除されます。購入済みスタンプなどのコンテンツは復元できません。
            </Text>
            <Text style={{ color: '#334155', lineHeight: 22, marginTop: 8 }}>
              退会後は同じアカウントを復活できません。新規登録が必要です。法令等にもとづき一定期間、ログ等が保持されることがあります。
            </Text>
          </View>

          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>確認のため「退会」と入力してください。</Text>
          <TextInput
            value={confirmText}
            onChangeText={setConfirmText}
            placeholder="退会"
            style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 }}
          />

          <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
            <TouchableOpacity onPress={onClose} style={{ flex: 1, height: 46, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#0f172a', fontWeight: '800' }}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowConfirm(true)} disabled={!canProceed} style={{ flex: 1, height: 46, borderRadius: 12, backgroundColor: canProceed ? '#ef4444' : '#fca5a5', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: '800' }}>退会する</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {/* 本当に退会しますか？ */}
      {showConfirm && (
        <View style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)' }} />
          <View style={{ width: '90%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 18, paddingVertical: 18, paddingHorizontal: 16, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 20, shadowOffset: { width: 0, height: 12 } }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#0f172a', textAlign: 'center', marginBottom: 10 }}>本当に退会してもよろしいですか？</Text>
            <Text style={{ fontSize: 14, color: '#475569', textAlign: 'center', marginBottom: 16, lineHeight: 22 }}>この操作は元に戻せません。アカウントのデータは削除され、復元できません。</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity onPress={() => setShowConfirm(false)} style={{ flex: 1, height: 46, borderRadius: 12, borderWidth: 2, borderColor: '#e5e7eb', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#0f172a', fontWeight: '800' }}>戻る</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setShowConfirm(false); onDeleted(); }} style={{ flex: 1, height: 46, borderRadius: 12, backgroundColor: '#ef4444', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '800' }}>はい、退会します</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
