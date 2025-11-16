import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeLanguageModal, setLanguage } from '../../store/uiSlice';

const LanguageModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s:any)=> s.ui.languageModalOpen);
  const currentLanguage = useAppSelector((s:any)=> s.ui.language as 'ja' | 'en');

  if (!isOpen) return null;

  const handleLanguageSelect = (lang: 'ja' | 'en') => {
    dispatch(setLanguage(lang));
    dispatch(closeLanguageModal());
  };

  return (
    <div 
      style={{ 
        position:'fixed', 
        inset:0, 
        background:'rgba(0,0,0,.5)', 
        backdropFilter:'blur(6px)', 
        display:'flex', 
        alignItems:'center', 
        justifyContent:'center', 
        zIndex:300, 
        animation:'fadeIn .3s ease',
        padding:'20px'
      }} 
      onClick={()=>dispatch(closeLanguageModal())}
    >
      <div 
        style={{ 
          background:'#fff', 
          width:'100%', 
          maxWidth:400,
          borderRadius:20,
          padding:'0', 
          boxShadow:'0 20px 60px rgba(0,0,0,.15)', 
          animation:'modalScale .35s cubic-bezier(.34,1.56,.64,1)',
          overflow:'hidden'
        }} 
        onClick={e=>e.stopPropagation()}
      >
        <div style={{ padding:'28px 24px 24px', borderBottom:'1px solid var(--color-border)' }}>
          <h2 style={{ margin:0, fontSize:20, fontWeight:700 }}>言語設定 / Language</h2>
        </div>
        
        <div style={{ padding:'16px' }}>
          {/* 日本語 */}
          <button
            onClick={() => handleLanguageSelect('ja')}
            style={{
              width:'100%',
              background: currentLanguage === 'ja' ? '#000' : '#fff',
              color: currentLanguage === 'ja' ? '#fff' : '#000',
              border: currentLanguage === 'ja' ? 'none' : '1px solid var(--color-border)',
              padding:'16px 20px',
              borderRadius:12,
              fontSize:16,
              fontWeight:600,
              cursor:'pointer',
              transition:'all .2s ease',
              marginBottom:12,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}
          >
            <span>日本語</span>
            {currentLanguage === 'ja' && <span>✓</span>}
          </button>

          {/* English */}
          <button
            onClick={() => handleLanguageSelect('en')}
            style={{
              width:'100%',
              background: currentLanguage === 'en' ? '#000' : '#fff',
              color: currentLanguage === 'en' ? '#fff' : '#000',
              border: currentLanguage === 'en' ? 'none' : '1px solid var(--color-border)',
              padding:'16px 20px',
              borderRadius:12,
              fontSize:16,
              fontWeight:600,
              cursor:'pointer',
              transition:'all .2s ease',
              marginBottom:12,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}
          >
            <span>English</span>
            {currentLanguage === 'en' && <span>✓</span>}
          </button>
        </div>

        <div style={{ padding:'0 16px 16px' }}>
          <button
            onClick={()=>dispatch(closeLanguageModal())}
            style={{
              width:'100%',
              background:'#fff',
              color:'#000',
              border:'1px solid var(--color-border)',
              padding:'14px',
              borderRadius:12,
              fontSize:15,
              fontWeight:600,
              cursor:'pointer',
              transition:'background .2s ease'
            }}
            onMouseOver={e=>(e.currentTarget.style.background='var(--color-surface-alt)')}
            onMouseOut={e=>(e.currentTarget.style.background='#fff')}
          >
            キャンセル / Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
