import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeLanguageModal, setLanguage } from '../../store/uiSlice';
import { designTokens } from '../../styles/designTokens';

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
          background: designTokens.colors.background.primary, 
          width:'100%', 
          maxWidth:400,
          borderRadius: designTokens.radius.xl,
          padding:'0', 
          boxShadow: designTokens.shadow.xl, 
          animation:'modalScale .35s cubic-bezier(.34,1.56,.64,1)',
          overflow:'hidden'
        }} 
        onClick={e=>e.stopPropagation()}
      >
        <div style={{ 
          padding: `${designTokens.spacing.lg} ${designTokens.spacing.lg} ${designTokens.spacing.md}`, 
          borderBottom: `1px solid ${designTokens.colors.border.medium}` 
        }}>
          <h2 style={{ 
            margin:0, 
            fontSize: designTokens.typography.h2.fontSize, 
            fontWeight: designTokens.typography.h2.fontWeight as number 
          }} id="language-modal-title">言語設定 / Language</h2>
          <p style={{ 
            margin: `${designTokens.spacing.sm} 0 0`, 
            fontSize: designTokens.typography.caption.fontSize, 
            color: designTokens.colors.text.tertiary 
          }}>アプリ表示言語を選択してください</p>
        </div>
        
        <div style={{ padding:'16px' }} role="radiogroup" aria-labelledby="language-modal-title">
          {/* 日本語 */}
          <button
            role="radio"
            aria-checked={currentLanguage === 'ja'}
            onClick={() => handleLanguageSelect('ja')}
            style={{
              width:'100%',
              background: currentLanguage === 'ja' ? designTokens.colors.primary.main : designTokens.colors.background.primary,
              color: currentLanguage === 'ja' ? designTokens.colors.text.inverse : designTokens.colors.text.primary,
              border: currentLanguage === 'ja' ? `2px solid ${designTokens.colors.primary.main}` : `2px solid ${designTokens.colors.border.medium}`,
              padding: `${designTokens.spacing.md} ${designTokens.spacing.md}`,
              borderRadius: designTokens.radius.lg,
              fontSize: designTokens.typography.h4.fontSize,
              fontWeight:600,
              cursor:'pointer',
              transition: designTokens.transition.fast,
              marginBottom: designTokens.spacing.md,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}
            onMouseOver={e=> { if(currentLanguage!=='ja'){ e.currentTarget.style.background = designTokens.colors.background.secondary; }}}
            onMouseOut={e=> { if(currentLanguage!=='ja'){ e.currentTarget.style.background = designTokens.colors.background.primary; }}}
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
              background: currentLanguage === 'en' ? designTokens.colors.primary.main : designTokens.colors.background.primary,
              color: currentLanguage === 'en' ? designTokens.colors.text.inverse : designTokens.colors.text.primary,
              border: currentLanguage === 'en' ? `2px solid ${designTokens.colors.primary.main}` : `2px solid ${designTokens.colors.border.medium}`,
              padding: `${designTokens.spacing.md} ${designTokens.spacing.md}`,
              borderRadius: designTokens.radius.lg,
              fontSize: designTokens.typography.h4.fontSize,
              fontWeight:600,
              cursor:'pointer',
              transition: designTokens.transition.fast,
              marginBottom: designTokens.spacing.md,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}
            onMouseOver={e=> { if(currentLanguage!=='en'){ e.currentTarget.style.background = designTokens.colors.background.secondary; }}}
            onMouseOut={e=> { if(currentLanguage!=='en'){ e.currentTarget.style.background = designTokens.colors.background.primary; }}}
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
