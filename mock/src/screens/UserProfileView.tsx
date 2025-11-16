import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { toggleFollow } from '../store/userSlice';
import { navigate } from '../store/uiSlice';
import { IconBack, IconAvatar } from '../components/icons';

const UserProfileView: React.FC<{ userId: string }> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s:any)=> s.user.users.find((u:any)=> u.id === userId));
  const following = useAppSelector((s:any)=> s.user.following[userId]);
  if(!user) return <p style={{ color:'var(--color-muted)' }}>ユーザーが見つかりません。</p>;
  return (
    <div style={{ padding:'24px 20px' }}>
      <button onClick={()=>dispatch(navigate('chat'))} aria-label='戻る' style={{ background:'none', border:'none', color:'var(--color-text)', cursor:'pointer', marginBottom:12, display:'flex' }}>
        <IconBack size={22} />
      </button>
      <div style={{ textAlign:'center', marginBottom:24 }}>
        <div style={{ width:110, height:110, borderRadius:'50%', background:'var(--color-border)', margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {user.avatar ? <img src={user.avatar} alt={user.name} style={{ width:'100%', height:'100%', borderRadius:'50%', objectFit:'cover' }} /> : <IconAvatar size={64} />}
        </div>
        <h2 style={{ margin:'0 0 6px', fontSize:26 }}>{user.name}</h2>
        {user.age && <p style={{ margin:'0 0 4px', fontSize:12, color:'var(--color-muted)' }}>{user.age} / {user.region}</p>}
        <p style={{ margin:0, fontSize:13, color:'var(--color-muted)' }}>{user.bio}</p>
      </div>
      <button onClick={()=>dispatch(toggleFollow(user.id))} style={{ width:'100%', background: following? 'transparent':'var(--color-accent)', color: following? 'var(--color-text)':'#fff', border:'1px solid var(--color-border)', padding:'14px', borderRadius:30, cursor:'pointer', fontSize:15, marginBottom:12 }}>
        {following? 'フレンド' : 'フレンド申請'}
      </button>
      {following && <button style={{ width:'100%', background:'transparent', color:'var(--color-text)', border:'1px solid var(--color-border)', padding:'14px', borderRadius:30, cursor:'pointer', fontSize:15 }}>メッセージ</button>}
    </div>
  );
};
export default UserProfileView;
