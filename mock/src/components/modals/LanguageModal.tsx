import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeLanguageModal, setLanguage } from '../../store/uiSlice';

const LanguageModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s:any)=> s.ui.languageModalOpen);
  const currentLanguage = useAppSelector((s:any)=> s.ui.language as 'ja' | 'en');

  if (!isOpen) return null;

  const handleLanguageSelect = (lang: 'ja' | 'en') => {
    // 選択のみで閉じる: アクセシビリティ向上のため focus 保持を避ける
    dispatch(setLanguage(lang));
    // そのまま保持し再度選択可能にするため閉じない仕様に変更（ユーザがキャンセルで閉じる）
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
        <div style={{ padding:'24px 24px 16px', borderBottom:'1px solid var(--color-border)' }}>
          <h2 style={{ margin:0, fontSize:20, fontWeight:700 }} id="language-modal-title">言語設定 / Language</h2>
          <p style={{ margin:'8px 0 0', fontSize:12, color:'#64748b' }}>アプリ表示言語を選択してください</p>
        </div>
        
        <div style={{ padding:'16px' }} role="radiogroup" aria-labelledby="language-modal-title">
          {/* 日本語 */}
          <button
            role="radio"
            aria-checked={currentLanguage === 'ja'}
            onClick={() => handleLanguageSelect('ja')}
            style={{
              width:'100%',
              background: currentLanguage === 'ja' ? '#0EA5E9' : '#fff',
              color: currentLanguage === 'ja' ? '#fff' : '#0f172a',
              border: currentLanguage === 'ja' ? '2px solid #0EA5E9' : '2px solid var(--color-border)',
              padding:'14px 18px',
              borderRadius:14,
              fontSize:15,
              fontWeight:600,
              cursor:'pointer',
              transition:'all .15s ease',
              marginBottom:12,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}
            onMouseOver={e=> { if(currentLanguage!=='ja'){ e.currentTarget.style.background='#f8fafc'; }}}
            onMouseOut={e=> { if(currentLanguage!=='ja'){ e.currentTarget.style.background='#fff'; }}}
          >
            <span>日本語</span>
            {currentLanguage === 'ja' && <span aria-hidden>✓</span>}
          </button>

          {/* English */}
          <button
            role="radio"
            aria-checked={currentLanguage === 'en'}
            onClick={() => handleLanguageSelect('en')}
            style={{
              width:'100%',
              background: currentLanguage === 'en' ? '#0EA5E9' : '#fff',
              color: currentLanguage === 'en' ? '#fff' : '#0f172a',
              border: currentLanguage === 'en' ? '2px solid #0EA5E9' : '2px solid var(--color-border)',
              padding:'14px 18px',
              borderRadius:14,
              fontSize:15,
              fontWeight:600,
              cursor:'pointer',
              transition:'all .15s ease',
              marginBottom:12,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}
            onMouseOver={e=> { if(currentLanguage!=='en'){ e.currentTarget.style.background='#f8fafc'; }}}
            onMouseOut={e=> { if(currentLanguage!=='en'){ e.currentTarget.style.background='#fff'; }}}
          >
            <span>English</span>
            {currentLanguage === 'en' && <span aria-hidden>✓</span>}
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
