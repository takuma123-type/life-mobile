import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ visible, message, type = 'success' }) => {
  const translateX = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateX, {
        toValue: 0,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: 400,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const iconName = type === 'success' ? 'checkmark-circle' : type === 'error' ? 'close-circle' : 'information-circle';
  const backgroundColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';

  if (!visible) return null;
  return (
    <View style={styles.wrapper} pointerEvents="none">
      <Animated.View
        style={[
          styles.container,
          { backgroundColor },
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <Ionicons name={iconName} size={20} color="#fff" />
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    // 画面上部・右側に固定表示
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    paddingRight: 20,
    zIndex: 9999,
  },
  container: {
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  message: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});
