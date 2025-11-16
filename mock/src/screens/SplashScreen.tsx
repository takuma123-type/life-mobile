import React, { useEffect } from 'react';
// ロゴ画像 (ユーザー提供の PNG を /mock/icon/splash.png に配置してください)
// Vite の相対 import: screens から ../../icon/splash.png
// まだ存在しない場合はビルド時に警告が出るため画像を追加してください。
// @ts-ignore
import logoUrl from '../../icon/splash.png';
import { useAppDispatch, useAppSelector } from '../hooks';
import { hideSplash } from '../store/uiSlice';
import type { RootState } from '../store/store';

const SplashScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector((s: any) => s.ui.showSplash);
  useEffect(() => {
    if (show) {
      const t = setTimeout(() => dispatch(hideSplash()), 1600);
      return () => clearTimeout(t);
    }
  }, [show, dispatch]);
  if (!show) return null;
  return (
    <div style={{ position:'fixed', inset:0, background:'linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-alt) 60%)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999 }} className="fade-in" aria-label="splash">
      <div style={{ textAlign:'center' }}>
        {logoUrl ? <img src={logoUrl} alt="App Logo" style={{ width:180, height:'auto', borderRadius:32, boxShadow:'0 6px 18px -4px rgba(0,0,0,.15)' }} /> : (
          <div style={{ fontSize:'56px', fontWeight:700, letterSpacing:'2px' }}>LIFE</div>
        )}
        <div style={{ marginTop:28, fontSize:14, fontWeight:500, letterSpacing:'.5px', color:'var(--color-accent)' }}>Loading...</div>
      </div>
    </div>
  );
};
export default SplashScreen;
