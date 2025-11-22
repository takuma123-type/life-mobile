import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeLoginModal, setAuthenticated, setRegistered, navigate, openSmsModal } from '../../store/uiSlice';
import { saveSession } from '../../utils/session';
import { setMe } from '../../store/userSlice';
import { IconX, IconUser, IconLock, IconShield } from '../icons';

const LoginModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s:any) => s.ui.loginModalOpen);
  const users = useAppSelector((s:any) => s.user.users);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleLogin = async () => {
    if (!phone.trim()) {
      alert('電話番号を入力してください');
      return;
    }
    if (!password.trim()) {
      alert('パスワードを入力してください');
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    
    // 実際にはバックエンドで認証
    const user = users.find((u:any) => u.phone === phone && u.password === password);
    
    if (user) {
      dispatch(setMe(user));
      dispatch(setAuthenticated(true));
      dispatch(setRegistered(true));
      // persist session
      saveSession(user, true, true);
      dispatch(closeLoginModal());
      dispatch(navigate('chat'));
    } else {
      alert('電話番号またはパスワードが正しくありません');
    }
    setLoading(false);
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'flex-end', justifyContent:'center', padding:0, zIndex:300, animation:'fadeIn .3s ease' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{ background:'#fff', width:'100%', maxHeight:'90vh', borderRadius:'24px 24px 0 0', padding:'0', position:'relative', overflow:'auto', animation:'slideUp .4s cubic-bezier(0.16, 1, 0.3, 1)' }} onClick={e=>e.stopPropagation()}>
        {/* ヘッダー */}
        <div style={{ 
          position:'sticky',
          top:0,
          background:'linear-gradient(180deg, #ffffff 0%, #ffffff 100%)',
          backdropFilter:'blur(10px)',
          borderBottom:'1px solid #f0f0f0',
          padding:'20px 24px 16px',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          zIndex:10,
          boxShadow:'0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <button 
            onClick={()=>dispatch(closeLoginModal())} 
            style={{ 
              background:'rgba(14, 165, 233, 0.1)', 
              border:'none', 
              color:'#0EA5E9', 
              fontSize:15,
              fontWeight:600,
              cursor:'pointer',
              padding:'8px 16px',
              borderRadius:20,
              transition:'all .2s ease',
              display:'flex',
              alignItems:'center',
              gap:4
            }}
            onMouseOver={e=>{e.currentTarget.style.background='rgba(14, 165, 233, 0.2)'; e.currentTarget.style.transform='scale(1.05)';}}
            onMouseOut={e=>{e.currentTarget.style.background='rgba(14, 165, 233, 0.1)'; e.currentTarget.style.transform='scale(1)';}}
          >
            <IconX size={16} />
            閉じる
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <h2 style={{ margin:0, fontSize:18, fontWeight:700, color:'#1a1a1a' }}>ログイン</h2>
          </div>
          <div style={{ width:80 }}></div>
        </div>

        <div style={{ padding:'32px 24px', maxWidth:480, margin:'0 auto' }}>
          {/* 電話番号入力 */}
          <div style={{ marginBottom:24 }}>
            <label style={{ display:'flex', alignItems:'center', gap:8, fontWeight:600, fontSize:15, marginBottom:12, color:'#1a1a1a' }}>
              <IconUser size={20} color='#0EA5E9' />
              電話番号
            </label>
            <input
              type='tel'
              value={phone}
              onChange={e=>setPhone(e.target.value)}
              placeholder='090-1234-5678'
              style={{ 
                width:'100%', 
                padding:'18px 20px', 
                fontSize:16, 
                border:'2px solid #e5e7eb', 
                borderRadius:12, 
                outline:'none',
                boxSizing:'border-box',
                transition:'all .3s ease',
                fontWeight:500
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor='#0EA5E9';
                e.currentTarget.style.boxShadow='0 0 0 4px rgba(14, 165, 233, 0.1)';
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor='#e5e7eb';
                e.currentTarget.style.boxShadow='none';
              }}
            />
          </div>

          {/* パスワード入力 */}
          <div style={{ marginBottom:32 }}>
            <label style={{ display:'flex', alignItems:'center', gap:8, fontWeight:600, fontSize:15, marginBottom:12, color:'#1a1a1a' }}>
              <IconLock size={20} color='#0EA5E9' />
              パスワード
            </label>
            <input
              type='password'
              value={password}
              onChange={e=>setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder='8文字以上のパスワード'
              style={{ 
                width:'100%', 
                padding:'18px 20px', 
                fontSize:16, 
                border:'2px solid #e5e7eb', 
                borderRadius:12, 
                outline:'none',
                boxSizing:'border-box',
                transition:'all .3s ease',
                fontWeight:500
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor='#0EA5E9';
                e.currentTarget.style.boxShadow='0 0 0 4px rgba(14, 165, 233, 0.1)';
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor='#e5e7eb';
                e.currentTarget.style.boxShadow='none';
              }}
            />
          </div>

          {/* ログインボタン */}
          <button 
            onClick={handleLogin} 
            disabled={loading} 
            style={{ 
              width:'100%', 
              background: loading ? '#cbd5e1' : 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)', 
              color:'#fff', 
              border:'none', 
              padding:'18px', 
              fontSize:17, 
              fontWeight:700, 
              borderRadius:12, 
              cursor: loading?'not-allowed':'pointer', 
              transition:'all .3s ease',
              marginBottom:20,
              boxShadow: loading ? 'none' : '0 4px 16px rgba(14, 165, 233, 0.3)'
            }} 
            onMouseOver={e=>!loading && (e.currentTarget.style.transform='scale(1.02)')} 
            onMouseOut={e=>!loading && (e.currentTarget.style.transform='scale(1)')}
          >
            {loading? (
              <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                <span style={{ 
                  width:16, 
                  height:16, 
                  border:'2px solid #fff',
                  borderTopColor:'transparent',
                  borderRadius:'50%',
                  animation:'spin 0.8s linear infinite',
                  display:'inline-block'
                }}></span>
                ログイン中...
              </span>
            ) : 'ログイン'}
          </button>

          {/* 新規登録へのリンク */}
          <div style={{ 
            textAlign:'center',
            padding:'20px 0',
            borderTop:'1px solid #f0f0f0',
            marginTop:20
          }}>
            <p style={{ fontSize:14, color:'#6b7280', margin:'0 0 12px' }}>
              すでにアカウントをお持ちの方
            </p>
            <button 
              onClick={() => {
                dispatch(closeLoginModal());
                dispatch(openSmsModal());
              }}
              style={{ 
                background:'rgba(14, 165, 233, 0.1)', 
                border:'2px solid #0EA5E9', 
                color:'#0EA5E9', 
                padding:'14px 32px',
                fontSize:16,
                fontWeight:700,
                borderRadius:12,
                cursor:'pointer',
                transition:'all .3s ease',
                display:'inline-flex',
                alignItems:'center',
                gap:8
              }}
              onMouseOver={e=>{
                e.currentTarget.style.background='#0EA5E9';
                e.currentTarget.style.color='#fff';
                e.currentTarget.style.transform='scale(1.05)';
              }}
              onMouseOut={e=>{
                e.currentTarget.style.background='rgba(14, 165, 233, 0.1)';
                e.currentTarget.style.color='#0EA5E9';
                e.currentTarget.style.transform='scale(1)';
              }}
            >
              新規登録はこちら
            </button>
          </div>

          {/* フッター */}
          <div style={{ 
            fontSize:12, 
            color:'#9ca3af', 
            textAlign:'center',
            lineHeight:1.8,
            marginTop:24,
            padding:'20px 0'
          }}>
            <a href="#" style={{ color:'#0EA5E9', textDecoration:'none', fontWeight:600 }}>利用規約</a>
            と
            <a href="#" style={{ color:'#0EA5E9', textDecoration:'none', fontWeight:600 }}>プライバシーポリシー</a>
            に同意したものとみなされます
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
