import React from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../store/uiSlice';
import type { AppDispatch } from '../../store/store';
import { designTokens } from '../../styles/designTokens';

interface HeaderProps {
  title: string;
  right?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, right }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <header style={{ 
      display:'flex', 
      alignItems:'center', 
      justifyContent:'space-between', 
      padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`, 
      borderBottom: `1px solid ${designTokens.colors.border.medium}`, 
      background: designTokens.colors.background.primary,
      boxShadow: designTokens.shadow.sm
    }}>
      <h1 style={{ 
        margin:0, 
        fontSize: designTokens.typography.h3.fontSize, 
        fontWeight: designTokens.typography.h3.fontWeight as number,
        color: designTokens.colors.text.primary,
        letterSpacing: designTokens.typography.h3.letterSpacing
      }}>{title}</h1>
      <div style={{ display:'flex', alignItems:'center', gap: designTokens.spacing.md }}>
        <button
          aria-label="toggle theme"
          onClick={() => dispatch(setTheme(document.documentElement.classList.contains('light') ? 'dark' : 'light'))}
          style={{ 
            background:'transparent', 
            border: `1px solid ${designTokens.colors.border.medium}`, 
            color: designTokens.colors.text.secondary, 
            padding: `${designTokens.spacing.xs} ${designTokens.spacing.sm}`, 
            borderRadius: designTokens.radius.sm, 
            cursor:'pointer', 
            fontSize: designTokens.typography.caption.fontSize,
            transition: designTokens.transition.base
          }}
        >
          {document.documentElement.classList.contains('light') ? '🌙' : '☀️'}
        </button>
        {right}
      </div>
    </header>
  );
};
export default Header;
