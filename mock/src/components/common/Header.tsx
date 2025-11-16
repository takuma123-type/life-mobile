import React from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../store/uiSlice';
import type { AppDispatch } from '../../store/store';

interface HeaderProps {
  title: string;
  right?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, right }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 20px', borderBottom:'1px solid var(--color-border)', background:'var(--color-surface)' }}>
      <h1 style={{ margin:0, fontSize:'18px', fontWeight:600 }}>{title}</h1>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <button
          aria-label="toggle theme"
          onClick={() => dispatch(setTheme(document.documentElement.classList.contains('light') ? 'dark' : 'light'))}
          style={{ background:'transparent', border:'1px solid var(--color-border)', color:'var(--color-text)', padding:'6px 10px', borderRadius:'var(--radius-sm)', cursor:'pointer', fontSize:'12px' }}
        >
          {document.documentElement.classList.contains('light') ? '🌙' : '☀️'}
        </button>
        {right}
      </div>
    </header>
  );
};
export default Header;
