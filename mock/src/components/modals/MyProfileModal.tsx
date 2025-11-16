import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { closeProfileModal, navigate } from '../../store/uiSlice';
import { IconX, IconAvatar } from '../icons';

const MyProfileModal: React.FC = () => {
  const open = useAppSelector((s:any)=> s.ui.profileModalOpen);
  const me = useAppSelector((s:any)=> s.user.me);
  const dispatch = useAppDispatch();
  if(!open) return null;
  if(!me) return null;
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', backdropFilter:'blur(6px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', overflowY:'auto', padding:'20px' }}>
      <div style={{ background:'#fff', width:'100%', maxWidth:480, borderRadius:24, padding:'0', position:'relative', boxShadow:'0 20px 60px rgba(0,0,0,.15)', maxHeight:'90vh', overflowY:'auto' }}>
        <button aria-label='閉じる' onClick={()=>dispatch(closeProfileModal())} style={{ position:'absolute', top:16, right:16, background:'rgba(0,0,0,.05)', border:'none', cursor:'pointer', width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', transition:'background .2s ease', zIndex:10 }} onMouseOver={e=>(e.currentTarget.style.background='rgba(0,0,0,.1)')} onMouseOut={e=>(e.currentTarget.style.background='rgba(0,0,0,.05)')}><IconX size={20} /></button>
        <div style={{ padding:'28px 24px 32px', borderBottom:'1px solid var(--color-border)' }}>
          <h2 style={{ margin:'0', fontSize:20, fontWeight:700 }}>マイプロフィール</h2>
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'32px 24px' }}>
          <div style={{ position:'relative', marginBottom:20 }}>
            <div style={{ width:120, height:120, borderRadius:'50%', border:'2px solid var(--color-border)', background:'#f5f5f5', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(0,0,0,.08)' }}>
              {me.avatar ? <img src={me.avatar} alt={me.name} style={{ width:'100%', height:'100%', borderRadius:'50%', objectFit:'cover' }} /> : <IconAvatar size={60} color='#999' />}
            </div>
            <span style={{ position:'absolute', bottom:8, right:8, width:24, height:24, background:'#10b981', border:'3px solid #fff', borderRadius:'50%', boxShadow:'0 2px 4px rgba(0,0,0,.1)' }} />
          </div>
          <h3 style={{ margin:'0 0 6px', fontSize:22, fontWeight:700 }}>{me.name}</h3>
          <p style={{ margin:'0 0 24px', fontSize:13, color:'#666' }}>ID: guest_001</p>
          <button onClick={()=> {dispatch(closeProfileModal()); dispatch(navigate('editProfile'));}} style={{ background:'#000', color:'#fff', border:'none', width:'100%', padding:'14px 20px', fontSize:15, borderRadius:12, cursor:'pointer', fontWeight:600, transition:'opacity .2s ease' }} onMouseOver={e=>(e.currentTarget.style.opacity='0.85')} onMouseOut={e=>(e.currentTarget.style.opacity='1')}>プロフィールを編集</button>
        </div>
        <section style={{ border:'1px solid var(--color-border)', borderRadius:16, padding:'24px', margin:'0 24px 24px', background:'#fafafa' }}>
          <h4 style={{ margin:'0 0 20px', fontSize:16, fontWeight:700 }}>基本情報</h4>
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div>
              <div style={{ fontSize:12, color:'#666', marginBottom:6, fontWeight:500 }}>年代</div>
              <div style={{ fontSize:15, fontWeight:600 }}>{me.age || '未設定'}</div>
            </div>
            <div>
              <div style={{ fontSize:12, color:'#666', marginBottom:6, fontWeight:500 }}>地域</div>
              <div style={{ fontSize:15, fontWeight:600 }}>{me.region || '未設定'}</div>
            </div>
            <div>
              <div style={{ fontSize:12, color:'#666', marginBottom:6, fontWeight:500 }}>よく使う時間帯</div>
              <div style={{ fontSize:15, fontWeight:600 }}>{me.activeTime || '夜'}</div>
            </div>
            <div>
              <div style={{ fontSize:12, color:'#666', marginBottom:6, fontWeight:500 }}>自己紹介</div>
              <div style={{ fontSize:15, lineHeight:1.6 }}>{me.bio || 'よろしくお願いします！'}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default MyProfileModal;
