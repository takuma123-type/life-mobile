import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { navigate } from '../../store/uiSlice';
import { IconChat, IconUser } from '../icons';

interface NavTab { key: string; label: string; icon: React.ReactNode }
const tabs: NavTab[] = [
  { key:'chat', label:'チャット', icon:<IconChat size={22} /> },
  { key:'mypage', label:'マイページ', icon:<IconUser size={22} /> },
];

const BottomNav: React.FC = () => {
  const current = useAppSelector((s: any) => s.ui.currentScreen);
  const dispatch = useAppDispatch();
  return (
    <nav style={{ position:'fixed', left:0, right:0, bottom:0, display:'flex', background:'var(--color-surface)', borderTop:'1px solid var(--color-border)', padding:'4px 0', zIndex:50 }}>
      {tabs.map(t => {
        const active = current === t.key;
        return (
          <button
            key={t.key}
            onClick={()=>dispatch(navigate(t.key))}
            aria-label={t.label}
            style={{ flex:1, background:'none', border:'none', cursor:'pointer', color: active? 'var(--color-accent)':'var(--color-muted)', display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'6px 0', fontSize:11, fontWeight:500 }}
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
