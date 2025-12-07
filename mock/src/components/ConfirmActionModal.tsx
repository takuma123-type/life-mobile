import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, TouchableOpacity, Dimensions } from 'react-native';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmType?: 'primary' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmActionModal({
  visible,
  title,
  message,
  confirmLabel = '承認する',
  cancelLabel = 'キャンセル',
  confirmType = 'primary',
  onConfirm,
  onCancel,
}: Props) {
  const backdrop = useRef(new Animated.Value(0)).current;
  const sheetY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdrop, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.spring(sheetY, { toValue: 0, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdrop, { toValue: 0, duration: 160, useNativeDriver: true }),
        Animated.timing(sheetY, { toValue: 40, duration: 160, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  const { height } = Dimensions.get('window');

  return (
    <View style={{ position: 'absolute', inset: 0, justifyContent: 'flex-end' }}>
      <Animated.View
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.35)',
          opacity: backdrop,
        }}
      />
      <Animated.View
        style={{
          transform: [{ translateY: sheetY }],
          alignSelf: 'center',
          width: '92%',
          marginBottom: height * 0.15,
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingVertical: 20,
          paddingHorizontal: 18,
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 8 },
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#111', marginBottom: 8 }}>{title}</Text>
        <Text style={{ fontSize: 15, color: '#556', lineHeight: 22 }}>{message}</Text>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 18 }}>
          <TouchableOpacity
            onPress={onCancel}
            style={{
              flex: 1,
              height: 48,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#d9dee8',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#334' }}>{cancelLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            style={{
              flex: 1,
              height: 48,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: confirmType === 'danger' ? '#e0362d' : '#1e9afc',
              shadowColor: confirmType === 'danger' ? '#e0362d' : '#1e9afc',
              shadowOpacity: 0.3,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 6 },
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>{confirmLabel}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
