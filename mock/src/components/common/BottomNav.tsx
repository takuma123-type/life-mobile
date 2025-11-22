import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { navigate } from '../../store/uiSlice';
import { IconChat, IconUser } from '../icons';
import { designTokens } from '../../styles/designTokens';

interface NavTab { key: string; label: string; icon: React.ReactNode }
const tabs: NavTab[] = [
  { key:'chat', label:'チャット', icon:<IconChat size={22} /> },
  { key:'mypage', label:'マイページ', icon:<IconUser size={22} /> },
];

const BottomNav: React.FC = () => {
  const current = useAppSelector((s: any) => s.ui.currentScreen);
  const dispatch = useAppDispatch();
  return (
    <nav style={{ 
      position:'fixed', 
      left:0, 
      right:0, 
      bottom:0, 
      display:'flex', 
      background: designTokens.colors.background.primary, 
      borderTop: `1px solid ${designTokens.colors.border.medium}`, 
      padding: `${designTokens.spacing.xs} 0`, 
      zIndex:50,
      boxShadow: `0 -2px 8px ${designTokens.colors.border.light}`
    }}>
      {tabs.map(t => {
        const active = current === t.key;
        return (
          <button
            key={t.key}
            onClick={()=>dispatch(navigate(t.key))}
            aria-label={t.label}
            style={{ 
              flex:1, 
              background:'none', 
              border:'none', 
              cursor:'pointer', 
              color: active ? designTokens.colors.primary.main : designTokens.colors.text.tertiary, 
              display:'flex', 
              flexDirection:'column', 
              alignItems:'center', 
              gap: designTokens.spacing.xs, 
              padding: `${designTokens.spacing.sm} 0`, 
              fontSize: designTokens.typography.caption.fontSize, 
              fontWeight: active ? 600 : 500,
              transition: designTokens.transition.fast
            }}
          >
            <span style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>{t.icon}</span>
            {t.label}
          </button>
        );
      })}
    </nav>
  );
};
export default BottomNav;
