import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { designTokens } from '@styles/designTokens.native';

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  phoneNumber: string;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ visible, onClose, phoneNumber }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    console.log('VerificationModal visible:', visible, 'phoneNumber:', phoneNumber);
    if (visible) {
      // 即時にバックドロップを表示（視認性向上）
      setShowBackdrop(true);
    } else {
      setShowBackdrop(false);
      setCode(['', '', '', '', '', '']);
    }
  }, [visible]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // 自動的に次の入力欄にフォーカス
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const maskedPhone = phoneNumber.replace(/(\d{3})\d+(\d{3})/, '$1*******$2');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity 
          style={[styles.backdrop, showBackdrop && styles.backdropVisible]} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={[
          styles.modalContainer,
          {
            // 下端ぴったりに配置し、重なり防止は内側のpaddingで吸収
            bottom: 0,
            paddingBottom: (Platform.OS === 'ios' ? Math.max(insets.bottom, 0) : insets.bottom) + 12,
          }
        ]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#22c3ff" />
              <Text style={styles.closeText}>閉じる</Text>
            </TouchableOpacity>
            <Text style={styles.title}>認証コードを入力</Text>
            <View style={styles.closeButton} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>
            {/* 説明カード */}
            <View style={styles.infoCard}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#22c3ff" />
              <Text style={styles.infoText}>
                {maskedPhone} に送信された6桁のコードを入力してください
              </Text>
            </View>

            {/* 認証コード入力 */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Ionicons name="lock-closed-outline" size={20} color="#22c3ff" />
                <Text style={styles.label}>認証コード（6桁）</Text>
              </View>
              <View style={styles.codeInputContainer}>
                {code.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    style={styles.codeInput}
                    value={digit}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    autoFocus={index === 0}
                  />
                ))}
              </View>
            </View>

            {/* 送信ボタン */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                // 認証コード入力後の遷移（ダミー）: プロフィール登録画面へ
                onClose();
                router.push('/profile-registration');
              }}
            >
              <Text style={styles.submitText}>送信</Text>
            </TouchableOpacity>

            {/* 戻る/再送信ボタン */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.backButton} onPress={onClose}>
                <Text style={styles.backButtonText}>戻る</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resendButton}>
                <Text style={styles.resendButtonText}>再送信</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 1,
  },
  backdropVisible: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '68%',
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    // 画面全体のオーバーレイは維持しつつ、位置だけ持ち上げる
    position: 'absolute',
    left: 0,
    right: 0,
    // デフォルト値（safe-area未取得時のフォールバック）: 可能な限り下
    bottom: Platform.OS === 'ios' ? 0 : 0,
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 80,
  },
  closeText: {
    color: '#22c3ff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: designTokens.colors.text.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#0369a1',
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 24,
    minHeight: 150,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: designTokens.colors.text.primary,
  },
  codeInputContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    height: 70,
    backgroundColor: '#f0f0f0',
  },
  codeInput: {
    width: 50,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#22c3ff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a1a1a',
  },
  submitButton: {
    backgroundColor: '#22c3ff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 8,
  },
  backButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '700',
  },
  resendButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#22c3ff',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#22c3ff',
    fontSize: 16,
    fontWeight: '700',
  },
});
