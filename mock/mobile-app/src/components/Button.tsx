import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  style?: ViewStyle;
};

export const Button: React.FC<Props> = ({ children, onPress, variant = 'primary', fullWidth, style }) => {
  const styles = StyleSheet.create({
    base: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      width: fullWidth ? '100%' : undefined,
    },
    primary: {
      backgroundColor: '#0EA5E9',
    },
    secondary: {
      backgroundColor: '#f8fafc',
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    label: {
      color: variant === 'primary' ? '#fff' : '#0f172a',
      fontWeight: '700',
    },
  });

  return (
    <Pressable onPress={onPress} style={[styles.base, variant === 'primary' ? styles.primary : styles.secondary, style]}>
      <Text style={styles.label}>{children as any}</Text>
    </Pressable>
  );
};

export default Button;
