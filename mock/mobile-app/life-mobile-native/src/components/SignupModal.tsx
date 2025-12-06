import React from 'react';
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
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { designTokens } from '@styles/designTokens.native';

interface SignupModalProps {
  visible: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSubmitted?: (phone: string) => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ visible, onClose, onSwitchToLogin, onSubmitted }) => {
  const [showBackdrop, setShowBackdrop] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      // モーダルが開く時は少し遅延させてフェードイン
      const timer = setTimeout(() => setShowBackdrop(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowBackdrop(false);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
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
        
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#22c3ff" />
              <Text style={styles.closeText}>閉じる</Text>
            </TouchableOpacity>
            <Text style={styles.title}>新規登録</Text>
            <View style={styles.closeButton} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* 電話番号 */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Ionicons name="person-outline" size={20} color="#22c3ff" />
                <Text style={styles.label}>電話番号</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="090-1234-5678"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

            {/* パスワード */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Ionicons name="lock-closed-outline" size={20} color="#22c3ff" />
                <Text style={styles.label}>パスワード</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="8文字以上のパスワード"
                placeholderTextColor="#9ca3af"
                secureTextEntry
              />
            </View>

            {/* 送信ボタン */}
            <TouchableOpacity 
              style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
              onPress={async () => {
                console.log('[SignupModal] Submit button pressed');
                if (isLoading) return;
                if (!phoneNumber) {
                  alert('電話番号を入力してください');
                  return;
                }
                // キーボードが開いたままだと次のモーダルが押し上げられることがあるため閉じる
                Keyboard.dismiss();
                setIsLoading(true);
                // 送信処理をシミュレート
                await new Promise(resolve => setTimeout(resolve, 1500));
                setIsLoading(false);
                // onSuccessコールバックを呼び出す(親コンポーネントでonCloseを呼ぶ)
                if (onSubmitted) {
                  console.log('[SignupModal] onSubmitted with phone:', phoneNumber);
                  onSubmitted(phoneNumber);
                } else {
                  console.warn('onSubmitted callback not provided');
                }
              }}
              disabled={isLoading}
            >
              <Text style={styles.submitText}>
                {isLoading ? '送信中...' : '送信'}
              </Text>
            </TouchableOpacity>

            {/* ログインリンク */}
            <View style={styles.loginSection}>
              <Text style={styles.loginPrompt}>すでにアカウントをお持ちの方</Text>
              <TouchableOpacity style={styles.loginButton} onPress={onSwitchToLogin}>
                <Text style={styles.loginButtonText}>ログインはこちら</Text>
              </TouchableOpacity>
            </View>

            {/* 利用規約 */}
            <View style={styles.termsSection}>
              <Text style={styles.termsText}>
                登録することで、
                <Text style={styles.termsLink}>利用規約</Text>
                と
                <Text style={styles.termsLink}>プライバシーポリシー</Text>
                に同意したものとみなされます
              </Text>
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
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  backdropVisible: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '75%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
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
  },
  inputGroup: {
    marginBottom: 24,
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
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: designTokens.colors.text.primary,
    borderWidth: 1,
    borderColor: '#e5e7eb',
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
  submitButtonDisabled: {
    backgroundColor: '#93c5fd',
    opacity: 0.7,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  loginSection: {
    marginTop: 32,
    alignItems: 'center',
    gap: 12,
  },
  loginPrompt: {
    fontSize: 14,
    color: '#6b7280',
  },
  loginButton: {
    borderWidth: 2,
    borderColor: '#22c3ff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  loginButtonText: {
    color: '#22c3ff',
    fontSize: 16,
    fontWeight: '700',
  },
  termsSection: {
    marginTop: 32,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  termsText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#22c3ff',
    textDecorationLine: 'underline',
  },
});
