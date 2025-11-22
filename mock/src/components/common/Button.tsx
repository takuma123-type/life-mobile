/**
 * Button コンポーネント
 * 
 * UI改善.md Q7, Q10 対応:
 * - Primary: メインアクション（ログイン、送信など）
 * - Secondary: 補助アクション（キャンセル、戻るなど）
 * - Tertiary: 軽微なアクション（リンク的な動作）
 * - Danger: 削除・警告アクション
 */

import React from 'react';
import { designTokens } from '../../styles/designTokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ボタンのバリアント */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  /** ボタンのサイズ */
  size?: 'sm' | 'md' | 'lg';
  /** 左側のアイコン */
  leftIcon?: React.ReactNode;
  /** 右側のアイコン */
  rightIcon?: React.ReactNode;
  /** ローディング状態 */
  loading?: boolean;
  /** フルワイド */
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  fullWidth = false,
  style,
  ...rest
}) => {
  // サイズ設定
  const sizeStyles = {
    sm: {
      padding: '8px 16px',
      fontSize: designTokens.typography.small.fontSize,
      height: '36px',
    },
    md: {
      padding: '12px 24px',
      fontSize: designTokens.typography.button.fontSize,
      height: '44px',
    },
    lg: {
      padding: '14px 32px',
      fontSize: designTokens.typography.h4.fontSize,
      height: '52px',
    },
  };

  // バリアントスタイル
  const variantStyles = {
    primary: {
      background: `linear-gradient(135deg, ${designTokens.colors.primary.dark} 0%, ${designTokens.colors.primary.main} 50%, ${designTokens.colors.secondary.light} 100%)`,
      color: designTokens.colors.text.inverse,
      border: 'none',
      boxShadow: designTokens.shadow.primary,
    },
    secondary: {
      background: designTokens.colors.background.primary,
      color: designTokens.colors.primary.main,
      border: `2px solid ${designTokens.colors.primary.main}`,
      boxShadow: designTokens.shadow.sm,
    },
    tertiary: {
      background: 'transparent',
      color: designTokens.colors.text.secondary,
      border: 'none',
      boxShadow: 'none',
    },
    danger: {
      background: `linear-gradient(135deg, ${designTokens.colors.danger.dark} 0%, ${designTokens.colors.danger.main} 100%)`,
      color: designTokens.colors.text.inverse,
      border: 'none',
      boxShadow: designTokens.shadow.lg,
    },
  };

  // ホバー状態のスタイル
  const getHoverStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          boxShadow: designTokens.shadow.primaryHover,
          transform: 'translateY(-2px)',
        };
      case 'secondary':
        return {
          background: designTokens.colors.primary.pale,
          borderColor: designTokens.colors.primary.dark,
        };
      case 'tertiary':
        return {
          background: designTokens.colors.background.secondary,
        };
      case 'danger':
        return {
          boxShadow: '0 12px 32px rgba(239, 68, 68, 0.45)',
          transform: 'translateY(-2px)',
        };
    }
  };

  // アクティブ状態のスタイル
  const getActiveStyles = () => ({
    transform: 'translateY(0)',
  });

  // ベーススタイル
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: designTokens.spacing.sm,
    fontWeight: designTokens.typography.button.fontWeight as number,
    letterSpacing: designTokens.typography.button.letterSpacing,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    borderRadius: designTokens.radius.md,
    transition: designTokens.transition.base,
    outline: 'none',
    opacity: disabled || loading ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const appliedStyle: React.CSSProperties = {
    ...baseStyle,
    ...(isHovered && !disabled && !loading ? getHoverStyles() : {}),
    ...(isActive && !disabled && !loading ? getActiveStyles() : {}),
  };

  return (
    <button
      style={appliedStyle}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      {...rest}
    >
      {loading && (
        <div
          style={{
            width: 16,
            height: 16,
            border: `2px solid ${variant === 'tertiary' ? designTokens.colors.text.secondary : designTokens.colors.text.inverse}`,
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      )}
      {leftIcon && !loading && <span style={{ display: 'inline-flex' }}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && !loading && <span style={{ display: 'inline-flex' }}>{rightIcon}</span>}
    </button>
  );
};

export default Button;
