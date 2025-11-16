import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useSelector((s: RootState) => s.ui.theme);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') root.classList.add('light'); else root.classList.remove('light');
  }, [theme]);
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      {children}
    </div>
  );
};
export default Layout;
