import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { closeGuestProfileModal, openSmsModal } from '../../store/uiSlice';
import { IconX, IconAvatar } from '../icons';

const GuestProfileModal: React.FC = () => {
  const open = useAppSelector((s:any)=> s.ui.guestProfileModalOpen);
  const dispatch = useAppDispatch();
  
  if(!open) return null;

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', backdropFilter:'blur(6px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', overflowY:'auto', padding:'20px' }}>
      <div style={{ background:'#fff', width:'100%', maxWidth:480, borderRadius:24, padding:'0', position:'relative', boxShadow:'0 20px 60px rgba(0,0,0,.15)', maxHeight:'90vh', overflowY:'auto' }}>
        <button 
          aria-label='閉じる' 
          onClick={()=>dispatch(closeGuestProfileModal())} 
          style={{ position:'absolute', top:16, right:16, background:'rgba(0,0,0,.05)', border:'none', cursor:'pointer', width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', transition:'background .2s ease', zIndex:10 }} 
          onMouseOver={e=>(e.currentTarget.style.background='rgba(0,0,0,.1)')} 
          onMouseOut={e=>(e.currentTarget.style.background='rgba(0,0,0,.05)')}
        >
          <IconX size={20} />
        </button>
        
        <div style={{ padding:'28px 24px 32px', borderBottom:'1px solid var(--color-border)' }}>
          <h2 style={{ margin:'0', fontSize:20, fontWeight:700 }}>マイプロフィール</h2>
        </div>
        
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'32px 24px' }}>
          <div style={{ position:'relative', marginBottom:20 }}>
            <div style={{ width:120, height:120, borderRadius:'50%', border:'2px solid var(--color-border)', background:'#f5f5f5', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(0,0,0,.08)' }}>
              <IconAvatar size={60} color='#999' />
            </div>
            <span style={{ position:'absolute', bottom:8, right:8, width:24, height:24, background:'#10b981', border:'3px solid #fff', borderRadius:'50%', boxShadow:'0 2px 4px rgba(0,0,0,.1)' }} />
          </div>
          
          <h3 style={{ margin:'0 0 24px', fontSize:22, fontWeight:700 }}>ゲストユーザー</h3>
          
          <button 
            onClick={()=> {
              dispatch(closeGuestProfileModal());
              dispatch(openSmsModal());
            }} 
            style={{ background:'#000', color:'#fff', border:'none', width:'100%', padding:'14px 20px', fontSize:15, borderRadius:12, cursor:'pointer', fontWeight:600, transition:'opacity .2s ease', marginBottom:20 }} 
            onMouseOver={e=>(e.currentTarget.style.opacity='0.85')} 
            onMouseOut={e=>(e.currentTarget.style.opacity='1')}
          >
            新規登録
          </button>
          
          <p style={{ fontSize:13, color:'#666', lineHeight:1.6, margin:0, textAlign:'center' }}>
            プロフィールを作成すると、コミュニティやチャット機能を利用できます
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestProfileModal;
