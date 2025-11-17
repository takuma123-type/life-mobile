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
        background:'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #ffffff 100%)',
        display:'flex', 
        alignItems:'center', 
        justifyContent:'center', 
        zIndex:9999,
        transition:'opacity 0.5s ease',
        opacity: fadeOut ? 0 : 1,
        overflow: 'hidden'
      }} 
      aria-label="splash"
    >
      <style>{`
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.03); }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes geometricFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -20px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        @keyframes geometricFloat2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 30px) rotate(-120deg); }
          66% { transform: translate(30px, -30px) rotate(-240deg); }
        }
        .logo-container {
          animation: fadeInScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), logoFloat 4s ease-in-out infinite 0.8s;
          position: relative;
          z-index: 2;
        }
        .loading-dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          margin: 0 5px;
          animation: pulse 1.4s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        .loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .loading-dot:nth-child(3) { animation-delay: 0.4s; }
        .geometric-shape {
          position: absolute;
          opacity: 0.15;
        }
        .shape1 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #38BDF8, #0EA5E9);
          top: 10%;
          left: 10%;
          animation: geometricFloat 20s ease-in-out infinite;
        }
        .shape2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #0EA5E9, #38BDF8);
          bottom: 20%;
          right: 15%;
          animation: geometricFloat2 15s ease-in-out infinite;
        }
        .shape3 {
          width: 180px;
          height: 180px;
          background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(56,189,248,0.6));
          top: 50%;
          right: 5%;
          animation: geometricFloat 18s ease-in-out infinite 5s;
        }
        .shape4 {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #38BDF8, rgba(255,255,255,0.8));
          bottom: 10%;
          left: 20%;
          animation: geometricFloat2 22s ease-in-out infinite 3s;
        }
      `}</style>
      
      {/* 幾何学的な背景パターン */}
      <div className="geometric-shape shape1" />
      <div className="geometric-shape shape2" />
      <div className="geometric-shape shape3" />
      <div className="geometric-shape shape4" />
      
      <div style={{ textAlign:'center', position: 'relative', zIndex: 2 }}>
        <div className="logo-container">
          <img 
            src="/icon/generated_image_transparent_test.png"
            alt="Talk! Logo" 
            style={{ 
              width: 250, 
              height: 'auto',
              filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 40px rgba(14, 165, 233, 0.3))'
            }} 
          />
        </div>
        
        <div style={{ 
          marginTop: 50, 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px'
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
