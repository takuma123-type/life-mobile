import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeSmsModal, openSmsModal, setSmsPhone, setSmsStep, setSmsSentCode, setSmsVerified, navigate, openLoginModal } from '../../store/uiSlice';
import { IconX, IconLock, IconShield, IconUser } from '../icons';

const maskPhone = (phone:string) => phone.replace(/(\d{3})(\d+)(\d{3})/, (m,p1,mid,p3)=> p1 + mid.replace(/\d/g,'*') + p3);

const SmsVerificationModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s:any)=> s.ui.smsModalOpen);
  const step = useAppSelector((s:any)=> s.ui.smsStep);
  const phone = useAppSelector((s:any)=> s.ui.smsPhone);
  const sentCode = useAppSelector((s:any)=> s.ui.smsSentCode);
  const [loading, setLoading] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [password, setPassword] = useState('');

  if(!open) return null;

  const sendCode = () => {
    if(phone.replace(/\D/g,'').length < 10) return alert('正しい電話番号を入力してください');
    setLoading(true);
    setTimeout(()=> {
      const generated = '123456'; // デモ用の固定コード
      dispatch(setSmsSentCode(generated));
      dispatch(setSmsStep('code'));
      setLoading(false);
      console.log('SMS認証コード:', generated); // デバッグ用
      alert(`SMS認証コード: ${generated}`); // デモ用に表示
    }, 1200);
  };

  const verify = () => {
    if(codeInput.length !== 6) return alert('6桁のコードを入力してください');
    if(codeInput === sentCode) {
      dispatch(setSmsVerified(true));
      alert('本人確認が完了しました。プロフィールを登録してください。');
      dispatch(closeSmsModal());
      // プロフィール登録画面に遷移
      dispatch(navigate('profileRegistration'));
    } else {
      alert('認証コードが正しくありません');
    }
  };

  const resend = () => { sendCode(); };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'flex-end', justifyContent:'center', padding:0, zIndex:300, animation:'fadeIn .25s ease-out' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
      <div style={{ background:'#fff', width:'100%', maxHeight:'90vh', borderRadius:'24px 24px 0 0', padding:0, position:'relative', overflow:'auto', animation:'slideUp .35s cubic-bezier(0.16, 1, 0.3, 1)' }} onClick={e=>e.stopPropagation()}>
        {/* ヘッダー */}
        <div style={{ 
          position:'sticky',
          top:0,
          background:'linear-gradient(180deg, #ffffff 0%, #ffffff 100%)',
          backdropFilter:'blur(10px)',
          borderBottom:'1px solid #f0f0f0',
          padding:'18px 20px 14px',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          zIndex:10,
          boxShadow:'0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <button 
            onClick={()=>dispatch(closeSmsModal())} 
            style={{ 
              background:'rgba(14, 165, 233, 0.1)', 
              border:'none', 
              color:'#0EA5E9', 
              fontSize:15,
              fontWeight:600,
              cursor:'pointer',
              padding:'8px 16px',
              borderRadius:999,
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
            <h2 style={{ margin:0, fontSize:18, fontWeight:700, color:'#1a1a1a' }}>新規登録</h2>
          </div>
          <div style={{ width:80 }}></div>
        </div>

        <div style={{ padding:'28px 20px 32px', maxWidth:480, margin:'0 auto' }}>
          {step === 'phone' && (
            <div style={{ marginBottom:24 }}>

              {/* 電話番号入力 */}
              <div style={{ marginBottom:24 }}>
                <label style={{ display:'flex', alignItems:'center', gap:8, fontWeight:600, fontSize:15, marginBottom:12, color:'#1a1a1a' }}>
                  <IconUser size={20} color='#0EA5E9' />
                  電話番号
                </label>
                <div style={{ position:'relative' }}>
                  <input
                    type='tel'
                    value={phone}
                    onChange={e=>dispatch(setSmsPhone(e.target.value))}
                    placeholder='090-1234-5678'
                    style={{ 
                      width:'100%', 
                      padding:'16px 18px', 
                      fontSize:16, 
                      border:'2px solid #e5e7eb', 
                      borderRadius:16, 
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
              </div>

              {/* パスワード入力 */}
              <div style={{ marginBottom:28 }}>
                <label style={{ display:'flex', alignItems:'center', gap:8, fontWeight:600, fontSize:15, marginBottom:12, color:'#1a1a1a' }}>
                  <IconLock size={20} color='#0EA5E9' />
                  パスワード
                </label>
                <div style={{ position:'relative' }}>
                  <input
                    type='password'
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    placeholder='8文字以上のパスワード'
                    style={{ 
                      width:'100%', 
                      padding:'16px 18px', 
                      fontSize:16, 
                      border:'2px solid #e5e7eb', 
                      borderRadius:16, 
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
              </div>

              {/* 次へボタン */}
              <button 
                onClick={sendCode} 
                disabled={loading} 
                style={{ 
                  width:'100%', 
                  background: loading ? '#cbd5e1' : 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)', 
                  color:'#fff', 
                  border:'none', 
                  padding:'16px', 
                  fontSize:17, 
                  fontWeight:700, 
                  borderRadius:16, 
                  cursor: loading?'not-allowed':'pointer', 
                  transition:'all .3s ease',
                  marginBottom:20,
                  boxShadow: loading ? 'none' : '0 4px 16px rgba(14, 165, 233, 0.3)',
                  transform: loading ? 'scale(1)' : 'scale(1)',
                  position:'relative',
                  overflow:'hidden'
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
                    送信中...
                  </span>
                ) : '認証コードを送信'}
              </button>
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>

              {/* ログインへのリンク */}
              <div style={{ 
                textAlign:'center',
                padding:'16px 0',
                borderTop:'1px solid #f0f0f0',
                marginTop:20
              }}>
                <p style={{ fontSize:14, color:'#6b7280', margin:'0 0 12px' }}>
                  すでにアカウントをお持ちの方
                </p>
                <button 
                  onClick={() => {
                    dispatch(closeSmsModal());
                    dispatch(openLoginModal());
                  }}
                  style={{ 
                    background:'rgba(14, 165, 233, 0.1)', 
                    border:'2px solid #0EA5E9', 
                    color:'#0EA5E9', 
                    padding:'12px 28px',
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
                  ログインはこちら
                </button>
              </div>

              {/* フッター */}
              <div style={{ 
                fontSize:12, 
                color:'#9ca3af', 
                textAlign:'center',
                lineHeight:1.8,
                marginTop:24,
                padding:'16px 0'
              }}>
                登録することで、
                <a href="#" style={{ color:'#0EA5E9', textDecoration:'none', fontWeight:600 }}>利用規約</a>
                と
                <a href="#" style={{ color:'#0EA5E9', textDecoration:'none', fontWeight:600 }}>プライバシーポリシー</a>
                に同意したものとみなされます
              </div>
            </div>
          )}

          {step === 'code' && (
            <div>
              {/* 説明文 */}
              <div style={{ 
                background:'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)', 
                borderRadius:16, 
                padding:'16px 18px', 
                marginBottom:24,
                boxShadow:'0 3px 12px rgba(14, 165, 233, 0.18)',
                display:'flex',
                alignItems:'center',
                gap:12
              }}>
                <IconShield size={24} color='#fff' />
                <div>
                  <p style={{ margin:0, fontSize:15, color:'#fff', fontWeight:600, lineHeight:1.5 }}>
                    SMSを送信しました
                  </p>
                  <p style={{ margin:'3px 0 0', fontSize:13, color:'rgba(255,255,255,0.9)' }}>
                    {maskPhone(phone)}
                  </p>
                </div>
              </div>

              <label style={{ display:'flex', alignItems:'center', gap:8, fontWeight:600, fontSize:15, marginBottom:12, color:'#1a1a1a' }}>
                <IconLock size={20} color='#0EA5E9' />
                認証コード（6桁）
              </label>
              <input
                type='text'
                value={codeInput}
                onChange={e=> setCodeInput(e.target.value.replace(/\D/g,'').slice(0,6))}
                placeholder='• • • • • •'
                autoFocus
                style={{ 
                  width:'100%', 
                  padding:'18px', 
                  fontSize:28, 
                  textAlign:'center', 
                  letterSpacing:'10px', 
                  border:'2px solid #e5e7eb', 
                  borderRadius:16, 
                  fontWeight:700, 
                  background:'#fff', 
                  outline:'none', 
                  boxSizing:'border-box',
                  transition:'all .3s ease'
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
              {/* 確認ボタン */}
              <button 
                onClick={verify} 
                style={{ 
                  width:'100%', 
                  background:'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)', 
                  color:'#fff', 
                  border:'none', 
                  padding:'16px', 
                  fontSize:17, 
                  fontWeight:700, 
                  borderRadius:16, 
                  cursor:'pointer', 
                  transition:'all .3s ease', 
                  marginTop:24,
                  boxShadow:'0 4px 16px rgba(14, 165, 233, 0.3)'
                }} 
                onMouseOver={e=>{e.currentTarget.style.transform='scale(1.02)';}} 
                onMouseOut={e=>{e.currentTarget.style.transform='scale(1)';}}
              >
                確認して次へ
              </button>

              {/* 戻る・再送信 */}
              <div style={{ 
                display:'flex',
                gap:10,
                marginTop:20
              }}>
                <button 
                  onClick={()=>dispatch(setSmsStep('phone'))} 
                  style={{ 
                    flex:1,
                    background:'#fff', 
                    color:'#6b7280', 
                    border:'2px solid #e5e7eb', 
                    padding:'12px', 
                    fontSize:15, 
                    fontWeight:600, 
                    borderRadius:16, 
                    cursor:'pointer', 
                    transition:'all .3s ease'
                  }} 
                  onMouseOver={e=>{e.currentTarget.style.background='#f9fafb'; e.currentTarget.style.borderColor='#d1d5db';}} 
                  onMouseOut={e=>{e.currentTarget.style.background='#fff'; e.currentTarget.style.borderColor='#e5e7eb';}}
                >
                  戻る
                </button>
                <button 
                  onClick={resend} 
                  style={{ 
                    flex:1,
                    background:'rgba(14, 165, 233, 0.1)', 
                    border:'2px solid #0EA5E9', 
                    color:'#0EA5E9', 
                    padding:'12px',
                    fontSize:15,
                    fontWeight:600,
                    borderRadius:16,
                    cursor:'pointer',
                    transition:'all .3s ease'
                  }} 
                  onMouseOver={e=>{
                    e.currentTarget.style.background='#0EA5E9';
                    e.currentTarget.style.color='#fff';
                  }} 
                  onMouseOut={e=>{
                    e.currentTarget.style.background='rgba(14, 165, 233, 0.1)';
                    e.currentTarget.style.color='#0EA5E9';
                  }}
                >
                  再送信
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SmsVerificationModal;
