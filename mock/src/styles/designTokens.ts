// LIFE アプリケーション デザインシステム
// UI改善.md に基づいた包括的なデザイントークン定義

export const designTokens = {
  // カラーパレット (Q4, Q5, Q15)
  colors: {
    // Primary - メインアクション、ブランドカラー
    primary: {
      main: '#00A0E9',
      light: '#36C5F5',
      dark: '#0095db',
      pale: '#E0F7FF',
      hover: '#0095db',
    },
    // Secondary - 補助アクション
    secondary: {
      main: '#06B6D4',
      light: '#2BBEF3',
      dark: '#0891b2',
    },
    // Neutral - グレートーン (Q5)
    neutral: {
      50: '#FAFBFC',
      100: '#F5F5F5',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    // Slate - ダークグレー
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    // Success
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      pale: '#ecfdf5',
    },
    // Danger
    danger: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      pale: '#fef2f2',
    },
    // Warning
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      pale: '#fefce8',
    },
    // Background
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      gradient: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)',
    },
    // Text (Q19 - コントラスト比を考慮)
    text: {
      primary: '#0f172a',     // WCAG AAA対応
      secondary: '#475569',   // WCAG AA対応
      tertiary: '#64748b',    // WCAG AA対応 (小さいテキストには注意)
      disabled: '#94a3b8',
      inverse: '#ffffff',
    },
    // Border
    border: {
      light: 'rgba(226, 232, 240, 0.8)',
      medium: '#e5e7eb',
      dark: '#cbd5e1',
    },
  },

  // タイポグラフィスケール (Q16)
  typography: {
    h1: {
      fontSize: '28px',
      fontWeight: 800,
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '0',
    },
    h4: {
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: 1.5,
      letterSpacing: '0',
    },
    body: {
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0',
    },
    bodyBold: {
      fontSize: '15px',
      fontWeight: 600,
      lineHeight: 1.6,
      letterSpacing: '0',
    },
    small: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
    },
    button: {
      fontSize: '15px',
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '0.02em',
    },
  },

  // スペーシングシステム (Q2)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  // 角丸 (Q3)
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    pill: '999px',
    circle: '50%',
  },

  // シャドウ (Q1, Q18 - Elevation)
  shadow: {
    none: 'none',
    sm: '0 1px 3px rgba(15, 23, 42, 0.08)',           // Elevation 0
    md: '0 2px 8px rgba(15, 23, 42, 0.12)',           // Elevation 1
    lg: '0 8px 20px rgba(15, 23, 42, 0.15)',          // Elevation 2
    xl: '0 12px 32px rgba(15, 23, 42, 0.18)',         // Elevation 3
    primary: '0 8px 24px rgba(0, 160, 233, 0.35)',    // Primary color shadow
    primaryHover: '0 12px 32px rgba(0, 160, 233, 0.45)',
    card: '0 2px 8px rgba(0, 0, 0, 0.08)',
    cardHover: '0 8px 24px rgba(0, 160, 233, 0.12)',
  },

  // トランジション
  transition: {
    fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    base: '0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '0.45s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // ブレークポイント
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
  },

  // Z-index
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    modal: 100,
    toast: 1000,
  },
} as const;

// 型エクスポート
export type DesignTokens = typeof designTokens;
export type ColorKeys = keyof typeof designTokens.colors;
export type SpacingKeys = keyof typeof designTokens.spacing;
export type RadiusKeys = keyof typeof designTokens.radius;
export type ShadowKeys = keyof typeof designTokens.shadow;
