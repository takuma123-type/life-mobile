import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { toggleFollow } from '../store/userSlice';
import { navigate } from '../store/uiSlice';
import { IconBack, IconAvatar } from '../components/icons';
import { designTokens } from '../styles/designTokens';
import Button from '../components/common/Button';

const UserProfileView: React.FC<{ userId: string }> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s:any)=> s.user.users.find((u:any)=> u.id === userId));
  const following = useAppSelector((s:any)=> s.user.following[userId]);
  if(!user) return <p style={{ color: designTokens.colors.text.tertiary }}>ユーザーが見つかりません。</p>;
  return (
    <div style={{ padding: `${designTokens.spacing.lg} ${designTokens.spacing.lg}` }}>
      <button 
        onClick={()=>dispatch(navigate('chat'))} 
        aria-label='戻る' 
        style={{ 
          background: designTokens.colors.primary.pale, 
          border:'none', 
          color: designTokens.colors.text.primary, 
          cursor:'pointer', 
          marginBottom: designTokens.spacing.md, 
          display:'flex',
          padding: designTokens.spacing.sm,
          borderRadius: designTokens.radius.circle
        }}>
        <IconBack size={22} />
      </button>
      <div style={{ textAlign:'center', marginBottom: designTokens.spacing.lg }}>
        <div style={{ 
          width:110, 
          height:110, 
          borderRadius: designTokens.radius.circle, 
          background: designTokens.colors.border.medium, 
          margin: `0 auto ${designTokens.spacing.md}`, 
          display:'flex', 
          alignItems:'center', 
          justifyContent:'center',
          border: `2px solid ${designTokens.colors.border.light}` 
        }}>
          {user.avatar ? <img src={user.avatar} alt={user.name} style={{ width:'100%', height:'100%', borderRadius: designTokens.radius.circle, objectFit:'cover' }} /> : <IconAvatar size={64} />}
        </div>
        <h2 style={{ 
          margin: `0 0 ${designTokens.spacing.xs}`, 
          fontSize: designTokens.typography.h1.fontSize, 
          fontWeight: designTokens.typography.h1.fontWeight as number 
        }}>{user.name}</h2>
        {user.age && <p style={{ 
          margin: `0 0 ${designTokens.spacing.xs}`, 
          fontSize: designTokens.typography.caption.fontSize, 
          color: designTokens.colors.text.tertiary 
        }}>{user.age} / {user.region}</p>}
        <p style={{ 
          margin:0, 
          fontSize: designTokens.typography.body.fontSize, 
          color: designTokens.colors.text.secondary 
        }}>{user.bio}</p>
      </div>
      <div style={{ marginBottom: designTokens.spacing.md }}>
        <Button
          variant={following ? 'tertiary' : 'primary'}
          size="lg"
          fullWidth
          onClick={()=>dispatch(toggleFollow(user.id))}
        >
          {following? 'フレンド' : 'フレンド申請'}
        </Button>
      </div>
      {following && (
        <Button
          variant="tertiary"
          size="lg"
          fullWidth
        >
          メッセージ
        </Button>
      )}
    </div>
  );
};
export default UserProfileView;
