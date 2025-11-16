import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeLoginModal, setAuthenticated, setRegistered, navigate, openSmsModal } from '../../store/uiSlice';
import { setMe } from '../../store/userSlice';
import { IconX } from '../icons';

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
      dispatch(closeLoginModal());
      dispatch(navigate('chat'));
    } else {
      alert('電話番号またはパスワードが正しくありません');
    }
    setLoading(false);
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
        padding:20,
        zIndex:300,
        animation:'fadeIn .3s ease'
      }} 
      onClick={() => dispatch(closeLoginModal())}
    >
      <div 
        style={{ 
          background:'#fff',
          width:'100%',
          maxWidth:440,
          borderRadius:24,
          padding:'40px 32px',
          position:'relative',
          boxShadow:'0 20px 60px rgba(0,0,0,.15)',
          animation:'modalScale .35s cubic-bezier(.34,1.56,.64,1)'
        }} 
        onClick={e => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button 
          aria-label='閉じる' 
          onClick={() => dispatch(closeLoginModal())} 
          style={{ 
            position:'absolute', 
            top:16, 
            right:16, 
            background:'rgba(0,0,0,.05)', 
            width:36, 
            height:36, 
            borderRadius:'50%', 
            border:'none', 
            cursor:'pointer', 
            display:'flex', 
            alignItems:'center', 
            justifyContent:'center', 
            transition:'background .2s ease' 
          }} 
          onMouseOver={e => (e.currentTarget.style.background = 'rgba(0,0,0,.1)')} 
          onMouseOut={e => (e.currentTarget.style.background = 'rgba(0,0,0,.05)')}
        >
          <IconX size={20} />
        </button>

        {/* タイトル */}
        <h2 style={{ 
          margin:'0 0 8px', 
          fontSize:26, 
          fontWeight:700,
          textAlign:'center'
        }}>
          ログイン
        </h2>
        <p style={{ 
          margin:'0 0 32px', 
          fontSize:14, 
          color:'#666',
          textAlign:'center'
        }}>
          LIFEへようこそ
        </p>

        {/* 電話番号 */}
        <div style={{ marginBottom:20 }}>
          <label style={{ 
            display:'block', 
            marginBottom:8, 
            fontSize:14, 
            fontWeight:600 
          }}>
            電話番号
          </label>
          <input
            type="tel"
            placeholder="090-1234-5678"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={{
              width:'100%',
              padding:'14px 16px',
              border:'2px solid #000',
              borderRadius:12,
              fontSize:15,
              outline:'none'
            }}
          />
        </div>

        {/* パスワード */}
        <div style={{ marginBottom:24 }}>
          <label style={{ 
            display:'block', 
            marginBottom:8, 
            fontSize:14, 
            fontWeight:600 
          }}>
            パスワード
          </label>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              width:'100%',
              padding:'14px 16px',
              border:'2px solid #000',
              borderRadius:12,
              fontSize:15,
              outline:'none'
            }}
          />
        </div>

        {/* ログインボタン */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width:'100%',
            padding:'16px',
            background:'#000',
            color:'#fff',
            border:'none',
            borderRadius:12,
            fontSize:15,
            fontWeight:600,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom:16,
            opacity: loading ? 0.7 : 1,
            transition:'opacity .2s ease'
          }}
          onMouseOver={e => !loading && (e.currentTarget.style.opacity = '0.85')}
          onMouseOut={e => !loading && (e.currentTarget.style.opacity = '1')}
        >
          {loading ? 'ログイン中...' : 'ログイン'}
        </button>

        {/* パスワード忘れた */}
        <div style={{ 
          textAlign:'center', 
          fontSize:13, 
          color:'#666',
          marginBottom:20
        }}>
          <button 
            style={{ 
              background:'none', 
              border:'none', 
              color:'#000', 
              cursor:'pointer', 
              fontWeight:600,
              textDecoration:'underline',
              fontSize:13
            }}
          >
            パスワードを忘れた場合
          </button>
        </div>

        {/* 区切り線 */}
        <div style={{ 
          position:'relative', 
          margin:'20px 0',
          textAlign:'center'
        }}>
          <div style={{ 
            position:'absolute', 
            top:'50%', 
            left:0, 
            right:0, 
            height:1, 
            background:'#e5e5e5' 
          }} />
          <span style={{ 
            position:'relative', 
            display:'inline-block', 
            padding:'0 16px', 
            fontSize:13, 
            color:'#666', 
            background:'#fff' 
          }}>
            または
          </span>
        </div>

        {/* 新規登録 */}
        <div style={{ textAlign:'center', fontSize:14, color:'#666' }}>
          アカウントをお持ちでない方<br />
          <button 
            onClick={() => {
              dispatch(closeLoginModal());
              dispatch(openSmsModal());
            }}
            style={{ 
              background:'none', 
              border:'none', 
              color:'#000', 
              cursor:'pointer', 
              fontWeight:700,
              fontSize:15,
              marginTop:8,
              textDecoration:'underline'
            }}
          >
            新規登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
