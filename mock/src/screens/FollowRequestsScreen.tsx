import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { navigate } from '../store/uiSlice';
import { acceptFollowRequest, rejectFollowRequest } from '../store/userSlice';
import { IconBack, IconAvatar } from '../components/icons';
import type { FollowRequest } from '../store/userSlice';
import { designTokens } from '../styles/designTokens';
import Button from '../components/common/Button';

const FollowRequestsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const requests = useAppSelector((s:any)=> s.user.followRequests as FollowRequest[]);
  const [confirmModal, setConfirmModal] = useState<{ type:'accept'|'reject', request: FollowRequest } | null>(null);

  const handleAccept = (request: FollowRequest) => {
    setConfirmModal({ type:'accept', request });
  };

  const handleReject = (request: FollowRequest) => {
    setConfirmModal({ type:'reject', request });
  };

  const confirmAction = () => {
    if(!confirmModal) return;
    if(confirmModal.type === 'accept') {
      dispatch(acceptFollowRequest(confirmModal.request.id));
    } else {
      dispatch(rejectFollowRequest(confirmModal.request.id));
    }
    setConfirmModal(null);
  };

  return (
    <div className="min-h-screen pb-20 bg-white">
      {/* Header */}
      <div style={{ 
        position:'sticky', 
        top:0, 
        zIndex:50, 
        display:'flex', 
        alignItems:'center', 
        gap: designTokens.spacing.md, 
        borderBottom: `1px solid ${designTokens.colors.border.medium}`, 
        background: designTokens.colors.background.primary, 
        padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`, 
        boxShadow: designTokens.shadow.sm 
      }}>
        <button
          onClick={() => dispatch(navigate('mypage'))}
          aria-label="戻る"
          style={{ 
            display:'inline-flex', 
            alignItems:'center', 
            borderRadius: designTokens.radius.circle, 
            padding: designTokens.spacing.sm, 
            color: designTokens.colors.text.secondary, 
            transition: designTokens.transition.fast,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <IconBack size={24} />
        </button>
        <h1 style={{ 
          margin:0, 
          fontSize: designTokens.typography.h3.fontSize, 
          fontWeight: designTokens.typography.h3.fontWeight as number, 
          letterSpacing: '0.5px', 
          color: designTokens.colors.text.primary 
        }}>フレンド申請</h1>
        <div style={{ marginLeft:'auto' }} />
      </div>

      <div style={{ padding: `${designTokens.spacing.lg} ${designTokens.spacing.lg}` }}>
        <div style={{ marginBottom: designTokens.spacing.lg, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ margin: 0, fontSize: designTokens.typography.body.fontSize, fontWeight: 500, color: designTokens.colors.text.tertiary }}>
            <span style={{ borderRadius: designTokens.radius.full, background: designTokens.colors.background.secondary, padding: `${designTokens.spacing.xs} ${designTokens.spacing.md}`, fontSize: designTokens.typography.caption.fontSize, fontWeight: 600, color: designTokens.colors.text.secondary, boxShadow: designTokens.shadow.xs }}>
              {requests.length}件の申請
            </span>
          </p>
        </div>

        {requests.map((req) => (
          <div
            key={req.id}
            style={{
              marginBottom: designTokens.spacing.lg,
              borderRadius: designTokens.radius.xxl,
              border: `1px solid ${designTokens.colors.border.medium}`,
              background: designTokens.colors.background.primary,
              padding: designTokens.spacing.lg,
              boxShadow: designTokens.shadow.card,
              transition: designTokens.transition.base
            }}
          >
            <div style={{ marginBottom: designTokens.spacing.lg, display: 'flex', alignItems: 'center', gap: designTokens.spacing.md }}>
              <div style={{
                position: 'relative',
                display: 'flex',
                height: 64,
                width: 64,
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: designTokens.radius.circle,
                border: `2px solid ${designTokens.colors.border.medium}`,
                background: designTokens.colors.background.secondary
              }}>
                {req.avatar ? (
                  <img src={req.avatar} alt={req.name} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                ) : (
                  <IconAvatar size={32} color={designTokens.colors.neutral[400]} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ marginBottom: designTokens.spacing.sm, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: designTokens.spacing.sm }}>
                  <span style={{ fontSize: designTokens.typography.h4.fontSize, fontWeight: 600, color: designTokens.colors.text.primary }}>{req.name}</span>
                  {req.age && (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      borderRadius: designTokens.radius.full,
                      background: designTokens.colors.primary.pale,
                      padding: `${designTokens.spacing.xs} ${designTokens.spacing.sm}`,
                      fontSize: designTokens.typography.caption.fontSize,
                      fontWeight: 600,
                      color: designTokens.colors.primary.dark,
                      border: `1px solid ${designTokens.colors.primary.light}`
                    }}>
                      {req.age}
                    </span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: designTokens.typography.body.fontSize, lineHeight: 1.6, color: designTokens.colors.text.secondary, wordBreak: 'break-word' }}>{req.message}</p>
              </div>
            </div>
            <div style={{ display:'flex', gap: designTokens.spacing.md }}>
              <Button
                variant="primary"
                size="md"
                onClick={() => handleAccept(req)}
                style={{ flex:1 }}
              >
                承認
              </Button>
              <Button
                variant="tertiary"
                size="md"
                onClick={() => handleReject(req)}
                style={{ flex:1 }}
              >
                拒否
              </Button>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div style={{
            borderRadius: designTokens.radius.xl,
            border: `1px solid ${designTokens.colors.border.medium}`,
            background: designTokens.colors.background.secondary,
            padding: `${designTokens.spacing.xxxl} ${designTokens.spacing.lg}`,
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, fontSize: designTokens.typography.body.fontSize, color: designTokens.colors.text.tertiary }}>フレンド申請はありません</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            padding: designTokens.spacing.lg,
            animation: 'fade .25s ease'
          }}
          onClick={() => setConfirmModal(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              borderRadius: designTokens.radius.xxl,
              background: designTokens.colors.background.primary,
              padding: `${designTokens.spacing.xxl} ${designTokens.spacing.xl}`,
              boxShadow: designTokens.shadow.xxl,
              animation: 'scale .35s cubic-bezier(.34,1.56,.64,1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              marginBottom: designTokens.spacing.md,
              textAlign: 'center',
              fontSize: designTokens.typography.h2.fontSize,
              fontWeight: designTokens.typography.h2.fontWeight as number,
              color: designTokens.colors.text.primary
            }}>
              フレンド申請の{confirmModal.type === 'accept' ? '承認' : '拒否'}
            </h2>
            <p style={{
              marginBottom: designTokens.spacing.xxl,
              textAlign: 'center',
              fontSize: designTokens.typography.h4.fontSize,
              lineHeight: 1.7,
              color: designTokens.colors.text.secondary
            }}>
              {confirmModal.request.name}さんのフレンド申請を<br />
              {confirmModal.type === 'accept' ? '承認' : '拒否'}してもよろしいですか?
            </p>
            <div style={{ display: 'flex', gap: designTokens.spacing.md }}>
              <Button
                variant="tertiary"
                size="lg"
                onClick={() => setConfirmModal(null)}
                style={{ flex: 1 }}
              >
                キャンセル
              </Button>
              <Button
                variant={confirmModal.type === 'reject' ? 'danger' : 'primary'}
                size="lg"
                onClick={confirmAction}
                style={{ flex: 1 }}
              >
                {confirmModal.type === 'accept' ? '承認する' : '拒否する'}
              </Button>
            </div>
          </div>
          <style>{`
            @keyframes fade {from{opacity:0}to{opacity:1}}
            @keyframes scale {from{transform:scale(.95);opacity:0}to{transform:scale(1);opacity:1}}
            .animate-fade{animation:fade .25s ease}
            .animate-scale{animation:scale .35s cubic-bezier(.34,1.56,.64,1)}
          `}</style>
        </div>
      )}
    </div>
  );
};
export default FollowRequestsScreen;
