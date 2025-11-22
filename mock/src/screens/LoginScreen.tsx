import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setRegistered, setAuthenticated, navigate, openSmsModal } from '../store/uiSlice';
import { setMe } from '../store/userSlice';
import { designTokens } from '../styles/designTokens';
import Button from '../components/common/Button';

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((s:any) => s.user.users);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const doLogin = async () => {
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
    // ここではモックとして、電話番号でユーザーを検索
    const user = users.find((u:any) => u.phone === phone && u.password === password);
    
    if (user) {
      dispatch(setMe(user));
      dispatch(setAuthenticated(true));
      dispatch(setRegistered(true));
      dispatch(navigate('chat'));
    } else {
      alert('電話番号またはパスワードが正しくありません');
    }
    setLoading(false);
  };

  const handleSignUp = () => {
    // SMS認証モーダルを開く
    dispatch(openSmsModal());
  };

  return (
    <div style={{ 
      minHeight:'100vh', 
      display:'flex', 
      alignItems:'center', 
      justifyContent:'center', 
      padding: designTokens.spacing.lg,
      background: designTokens.colors.background.secondary
    }}>
      <div style={{ 
        width:'100%', 
        maxWidth:420,
        background: designTokens.colors.background.primary,
        borderRadius: designTokens.radius.xxl,
        padding: `${designTokens.spacing.xxxl} ${designTokens.spacing.xl}`,
        border: `1px solid ${designTokens.colors.border.medium}`,
        boxShadow: designTokens.shadow.lg
      }}>
        <h1 style={{ 
          margin:'0 0 8px', 
          fontSize:'32px', 
          fontWeight:700,
          textAlign:'center'
        }}>
          LIFE
        </h1>
        <p style={{ 
          margin:'0 0 36px', 
          fontSize:'14px', 
          color:'#666',
          textAlign:'center'
        }}>
          つながる、話す、楽しむ
        </p>

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
            onChange={e=>setPhone(e.target.value)}
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
            onChange={e=>setPassword(e.target.value)}
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

        <div style={{ marginBottom: designTokens.spacing.md }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={doLogin}
            disabled={loading}
            loading={loading}
          >
            ログイン
          </Button>
        </div>

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
              textDecoration:'underline'
            }}
          >
            パスワードを忘れた場合
          </button>
        </div>

        <div style={{ 
          position:'relative', 
          margin:'28px 0',
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

        <div style={{ textAlign:'center', fontSize:14, color:'#666' }}>
          アカウントをお持ちでない方<br />
          <button 
            onClick={handleSignUp}
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
export default LoginScreen;
