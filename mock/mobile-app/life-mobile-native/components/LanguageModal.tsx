import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, TouchableOpacity } from 'react-native';

type Props = {
  visible: boolean;
  value: 'ja' | 'en';
  onClose: () => void;
  onChange: (lang: 'ja' | 'en') => void;
};

export default function LanguageModal({ visible, value, onClose, onChange }: Props) {
  const backdrop = useRef(new Animated.Value(0)).current;
  const sheetY = useRef(new Animated.Value(80)).current;

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

  if (!visible) return null;

  const Option = ({ label, code }: { label: string; code: 'ja' | 'en' }) => (
    <TouchableOpacity
      onPress={() => onChange(code)}
      style={{
        marginTop: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: value === code ? '#22c3ff' : '#e5e7eb',
        backgroundColor: value === code ? '#22c3ff' : '#fff',
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ color: value === code ? '#fff' : '#0f172a', fontWeight: '800' }}>{label}</Text>
      {value === code && <Text style={{ color: '#fff', fontWeight: '800' }}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={{ position: 'absolute', inset: 0, justifyContent: 'flex-end' }}>
      <Animated.View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', opacity: backdrop }} />
      <Animated.View
        style={{
          transform: [{ translateY: sheetY }],
          backgroundColor: '#fff',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingBottom: 24,
        }}
      >
        <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderColor: '#e5e7eb', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#0f172a' }}>言語設定 / Language</Text>
          <TouchableOpacity onPress={onClose} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: '#f1f5f9' }}>
            <Text style={{ color: '#0f172a', fontWeight: '800' }}>閉じる</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
          <Text style={{ color: '#64748b' }}>アプリ表示言語を選択してください</Text>
          <Option label="日本語" code="ja" />
          <Option label="English" code="en" />
          <TouchableOpacity onPress={onClose} style={{ marginTop: 16, borderRadius: 14, borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#fff', paddingVertical: 16, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#0f172a', fontWeight: '800' }}>キャンセル / Cancel</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
