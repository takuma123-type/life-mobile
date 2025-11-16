import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { hideSplash } from '../store/uiSlice';

const SplashScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector((s: any) => s.ui.showSplash);
  const [fadeOut, setFadeOut] = useState(false);
  
  useEffect(() => {
    if (show) {
      const t = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => dispatch(hideSplash()), 500);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [show, dispatch]);
  
  if (!show) return null;
  
  return (
    <div 
      style={{ 
        position:'fixed', 
        inset:0, 
        background:'#ffffff', 
        display:'flex', 
        alignItems:'center', 
        justifyContent:'center', 
        zIndex:9999,
        transition:'opacity 0.5s ease',
        opacity: fadeOut ? 0 : 1
      }} 
      aria-label="splash"
    >
      <style>{`
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .logo-container {
          animation: fadeInScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), logoFloat 3s ease-in-out infinite 0.8s;
        }
        .loading-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          margin: 0 4px;
          animation: pulse 1.4s ease-in-out infinite;
        }
        .loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .loading-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
      
      <div style={{ textAlign:'center' }}>
        <div className="logo-container">
          <img 
            src="/public/icon/generated_image_transparent_test.png"
            alt="Talk! Logo" 
            style={{ 
              width: 250, 
              height: 'auto',
              filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))'
            }} 
          />
        </div>
        
        <div style={{ 
          marginTop: 40, 
          fontSize: 16, 
          fontWeight: 600, 
          color: 'white',
          letterSpacing: '1px'
        }}>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>
      </div>
    </div>
  );
};
export default SplashScreen;
