import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, View, Text, TouchableOpacity, TextInput } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onUpdate: (newPassword: string) => void;
  requiresCurrent?: boolean;
};

export default function PasswordModal({ visible, onClose, onUpdate, requiresCurrent = true }: Props) {
  const backdrop = useRef(new Animated.Value(0)).current;
  const sheetY = useRef(new Animated.Value(80)).current;
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

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
    if (!visible) {
      setCurrent(''); setNext(''); setConfirm(''); setError('');
    }
  }, [visible]);

  const strength = useMemo(() => {
    const len = next.length;
    const hasLower = /[a-z]/.test(next);
    const hasUpper = /[A-Z]/.test(next);
    const hasNum = /\d/.test(next);
    const hasSym = /[^A-Za-z0-9]/.test(next);
    const score = (len >= 8 ? 1 : 0) + (hasLower ? 1 : 0) + (hasUpper ? 1 : 0) + (hasNum ? 1 : 0) + (hasSym ? 1 : 0);
    const pct = Math.min(100, score * 20);
    const label = score <= 2 ? '弱い' : score <= 3 ? '普通' : score <= 4 ? '強い' : 'とても強い';
    const color = score <= 2 ? '#ef4444' : score <= 3 ? '#f59e0b' : score <= 4 ? '#10b981' : '#0ea5e9';
    return { pct, label, color };
  }, [next]);

  if (!visible) return null;

  return (
    <View style={{ position: 'absolute', inset: 0, justifyContent: 'flex-end' }}>
      <Animated.View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', opacity: backdrop }} />
      <Animated.View style={{ transform: [{ translateY: sheetY }], backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
        <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderColor: '#e5e7eb', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#0f172a' }}>パスワード変更</Text>
          <TouchableOpacity onPress={onClose} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#eef2f7', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: '#0f172a' }}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 18 }}>
          {requiresCurrent && (
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 6 }}>現在のパスワード</Text>
              <TextInput
                value={current}
                onChangeText={setCurrent}
                secureTextEntry
                placeholder="現在のパスワード"
                style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 }}
              />
            </View>
          )}

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 6 }}>新しいパスワード</Text>
            <TextInput
              value={next}
              onChangeText={setNext}
              secureTextEntry
              placeholder="英数字8文字以上"
              style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 }}
            />
            <View style={{ height: 8, backgroundColor: '#e5e7eb', borderRadius: 8, overflow: 'hidden', marginTop: 8 }}>
              <View style={{ width: `${strength.pct}%`, height: '100%', backgroundColor: strength.color }} />
            </View>
            <Text style={{ marginTop: 6, fontSize: 12, color: '#64748b' }}>強度: <Text style={{ color: strength.color, fontWeight: '700' }}>{strength.label}</Text></Text>
          </View>

          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 6 }}>新しいパスワード（確認）</Text>
            <TextInput
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              placeholder="もう一度入力"
              style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 }}
            />
          </View>

          {!!error && <Text style={{ marginTop: 4, marginBottom: 8, fontSize: 12, color: '#dc2626', fontWeight: '700' }}>{error}</Text>}

          <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}>
            <TouchableOpacity onPress={onClose} style={{ flex: 1, height: 46, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#0f172a', fontWeight: '800' }}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // Validation
                if (!next || !confirm) { setError('新しいパスワードを入力してください'); return; }
                if (next.length < 8) { setError('8文字以上にしてください'); return; }
                if (next !== confirm) { setError('確認用が一致しません'); return; }
                // In demo, skip current validation; in production, check against stored hash
                setError('');
                onUpdate(next);
                onClose();
              }}
              style={{ flex: 1, height: 46, borderRadius: 12, backgroundColor: '#22c3ff', alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ color: '#fff', fontWeight: '800' }}>更新する</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ marginTop: 10, fontSize: 11, color: '#64748b' }}>
            パスワードはデモ用途でローカル状態に保存されます。本番環境では安全なハッシュ化とサーバー側検証を実装してください。
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}
