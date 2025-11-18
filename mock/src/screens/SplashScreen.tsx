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
        background:'#fff',
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
      
      <div style={{ textAlign:'center', position: 'relative', zIndex: 2 }}>
        <div className="logo-container">
          <div style={{
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: '0.05em',
            color: '#0EA5E9',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 8px 40px rgba(14, 165, 233, 0.3)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            LIFE
          </div>
        </div>
      </div>
    </div>
  );
};
export default SplashScreen;
