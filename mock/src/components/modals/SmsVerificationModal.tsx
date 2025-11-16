import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeSmsModal, openSmsModal, setSmsPhone, setSmsStep, setSmsSentCode, setSmsVerified, navigate, openLoginModal } from '../../store/uiSlice';
import { IconX } from '../icons';

const maskPhone = (phone:string) => phone.replace(/(\d{3})(\d+)(\d{3})/, (m,p1,mid,p3)=> p1 + mid.replace(/\d/g,'*') + p3);

const SmsVerificationModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s:any)=> s.ui.smsModalOpen);
  const step = useAppSelector((s:any)=> s.ui.smsStep);
  const phone = useAppSelector((s:any)=> s.ui.smsPhone);
  const sentCode = useAppSelector((s:any)=> s.ui.smsSentCode);
  const [loading, setLoading] = useState(false);
  const [codeInput, setCodeInput] = useState('');

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
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', backdropFilter:'blur(6px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20, zIndex:300, animation:'fadeIn .3s ease' }} onClick={()=>dispatch(closeSmsModal())}>
      <div style={{ background:'#fff', width:'100%', maxWidth:440, borderRadius:24, padding:'40px 32px', position:'relative', boxShadow:'0 20px 60px rgba(0,0,0,.15)', animation:'modalScale .35s cubic-bezier(.34,1.56,.64,1)' }} onClick={e=>e.stopPropagation()}>
        <button aria-label='閉じる' onClick={()=>dispatch(closeSmsModal())} style={{ position:'absolute', top:16, right:16, background:'rgba(0,0,0,.05)', width:36, height:36, borderRadius:'50%', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'background .2s ease' }} onMouseOver={e=>(e.currentTarget as HTMLButtonElement).style.background='rgba(0,0,0,.1)'} onMouseOut={e=>(e.currentTarget as HTMLButtonElement).style.background='rgba(0,0,0,.05)'}><IconX size={20} /></button>
        <h2 style={{ margin:'0 0 8px', textAlign:'center', fontSize:26, fontWeight:700 }}>新規登録</h2>
        <p style={{ margin:'0 0 32px', fontSize:14, textAlign:'center', color:'#666' }}>電話番号による本人確認を行います</p>

        {step === 'phone' && (
          <div style={{ marginBottom:24 }}>
            <label style={{ display:'block', fontWeight:600, fontSize:14, marginBottom:8 }}>電話番号</label>
            <input
              type='tel'
              value={phone}
              onChange={e=>dispatch(setSmsPhone(e.target.value))}
              placeholder='090-1234-5678'
              style={{ width:'100%', padding:'14px 16px', fontSize:15, border:'2px solid #000', borderRadius:12, outline:'none' }}
            />
            <p style={{ fontSize:12, color:'#666', margin:'8px 0 0' }}>※ハイフンなしでも入力可能です</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button onClick={sendCode} disabled={loading} style={{ flex:1, background:'#000', color:'#fff', border:'none', padding:'16px', fontSize:15, fontWeight:600, borderRadius:12, cursor: loading?'not-allowed':'pointer', opacity: loading?.7:1, transition:'opacity .2s ease' }} onMouseOver={e=>!loading && (e.currentTarget.style.opacity='0.85')} onMouseOut={e=>!loading && (e.currentTarget.style.opacity='1')}>
                {loading? '送信中...' : '送信'}
              </button>
              <button onClick={()=>dispatch(closeSmsModal())} style={{ flex:1, background:'#fff', color:'#000', border:'2px solid #000', padding:'16px', fontSize:15, fontWeight:600, borderRadius:12, cursor:'pointer', transition:'background .2s ease' }} onMouseOver={e=>(e.currentTarget.style.background='#f5f5f5')} onMouseOut={e=>(e.currentTarget.style.background='#fff')}>キャンセル</button>
            </div>
          </div>
        )}

        {step === 'code' && (
          <div>
            <div style={{ background:'#f5f5f5', border:'1px solid #e5e5e5', borderRadius:12, padding:'12px 16px', marginBottom:24, textAlign:'center' }}>
              <p style={{ fontSize:13, margin:0, color:'#666' }}><strong style={{ fontSize:15, color:'#000' }}>{maskPhone(phone)}</strong> にSMSを送信しました</p>
            </div>
            <label style={{ display:'block', fontWeight:600, fontSize:14, marginBottom:8 }}>認証コード（6桁）</label>
            <input
              type='text'
              value={codeInput}
              onChange={e=> setCodeInput(e.target.value.replace(/\D/g,'').slice(0,6))}
              placeholder='・・・・・・'
              autoFocus
              style={{ width:'100%', padding:'20px 16px', fontSize:32, textAlign:'center', letterSpacing:'12px', border:'2px solid #000', borderRadius:12, fontWeight:700, background:'#fff', outline:'none' }}
            />
            <div style={{ display:'flex', gap:12, marginTop:24, marginBottom:16 }}>
              <button onClick={verify} style={{ flex:1, background:'#000', color:'#fff', border:'none', padding:'16px', fontSize:15, fontWeight:600, borderRadius:12, cursor:'pointer', transition:'opacity .2s ease' }} onMouseOver={e=>(e.currentTarget.style.opacity='0.85')} onMouseOut={e=>(e.currentTarget.style.opacity='1')}>確認</button>
              <button onClick={()=>dispatch(setSmsStep('phone'))} style={{ flex:1, background:'#fff', color:'#000', border:'2px solid #000', padding:'16px', fontSize:15, fontWeight:600, borderRadius:12, cursor:'pointer', transition:'background .2s ease' }} onMouseOver={e=>(e.currentTarget.style.background='#f5f5f5')} onMouseOut={e=>(e.currentTarget.style.background='#fff')}>戻る</button>
            </div>
            <button onClick={resend} style={{ background:'none', border:'none', color:'#000', padding:'12px 16px', fontSize:13, cursor:'pointer', width:'100%', fontWeight:600, borderRadius:10, transition:'background .2s ease', textDecoration:'underline' }} onMouseOver={e=>(e.currentTarget.style.background='#f5f5f5')} onMouseOut={e=>(e.currentTarget.style.background='none')}>認証コードを再送信</button>
          </div>
        )}

        {/* 区切り線 */}
        <div style={{ 
          position:'relative', 
          margin:'24px 0 20px',
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

        {/* ログイン */}
        <div style={{ textAlign:'center', fontSize:14, color:'#666' }}>
          アカウントをお持ちの方
          <button 
            onClick={() => {
              dispatch(closeSmsModal());
              dispatch(openLoginModal());
            }}
            style={{ 
              background:'none', 
              border:'none', 
              color:'#000', 
              cursor:'pointer', 
              fontWeight:700,
              fontSize:15,
              marginLeft:8,
              textDecoration:'underline'
            }}
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
};
export default SmsVerificationModal;
