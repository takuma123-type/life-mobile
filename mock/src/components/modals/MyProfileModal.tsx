import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { closeProfileModal, navigate } from '../../store/uiSlice';
import { IconX, IconAvatar } from '../icons';

const MyProfileModal: React.FC = () => {
  const open = useAppSelector((s:any)=> s.ui.profileModalOpen);
  const me = useAppSelector((s:any)=> s.user.me);
  const dispatch = useAppDispatch();
  if (!open) return null;
  if (!me) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
      <style>{`
        @keyframes fadeInProfile {
          from { opacity:0; }
          to { opacity:1; }
        }
        @keyframes slideUpProfile {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
      <div style={{ background: '#fff', width: '100%', maxWidth: 560, borderRadius: '32px 32px 0 0', padding: 0, position: 'relative', boxShadow: '0 -4px 30px rgba(6,12,34,0.25)', maxHeight: '92vh', overflowY: 'auto', animation: 'fadeInProfile .25s ease, slideUpProfile .4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        {/* Header */}
        <div style={{ padding: '22px 24px', borderBottom: '1px solid rgba(15, 23, 42, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>マイプロフィール</h2>
          <button aria-label='閉じる' onClick={() => dispatch(closeProfileModal())} style={{ background: 'rgba(15, 23, 42, 0.04)', border: 'none', cursor: 'pointer', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .15s ease', zIndex: 10 }} onMouseOver={e => (e.currentTarget.style.background = 'rgba(15,23,42,0.08)')} onMouseOut={e => (e.currentTarget.style.background = 'rgba(15,23,42,0.04)')}>
            <IconX size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '34px 28px' }}>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <div style={{ width: 136, height: 136, borderRadius: '50%', padding: 8, background: 'linear-gradient(180deg,#ffffff,#fbfdff)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(2,6,23,0.08)' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '2px solid rgba(14,165,233,0.12)', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {me.avatar ? <img src={me.avatar} alt={me.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : <IconAvatar size={72} color='#9ca3af' />}
              </div>
            </div>
            <span style={{ position: 'absolute', bottom: 6, right: 6, width: 18, height: 18, background: '#10b981', border: '3px solid #fff', borderRadius: '50%', boxShadow: '0 6px 18px rgba(16,185,129,0.18)' }} />
          </div>

          <h3 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 800, color: '#0b1220' }}>{me.name || '未設定'}</h3>
          <p style={{ margin: '0 0 20px', fontSize: 13, color: '#6b7280' }}>ID: {me.id || 'guest_001'}</p>

          <button onClick={() => { dispatch(closeProfileModal()); dispatch(navigate('editProfile')); }} style={{ background: 'linear-gradient(135deg,#0EA5E9 0%, #06B6D4 100%)', color: '#fff', border: 'none', width: '100%', maxWidth: 420, padding: '15px 20px', fontSize: 16, borderRadius: 18, cursor: 'pointer', fontWeight: 700, letterSpacing: '.5px', transition: 'transform .15s ease, box-shadow .15s ease, filter .15s ease', boxShadow: '0 10px 30px rgba(14,165,233,0.35)' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.08)'; }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}>プロフィールを編集</button>
        </div>

        {/* Info card */}
        <section style={{ border: '1px solid rgba(15,23,42,0.06)', borderRadius: 16, padding: 24, margin: '0 20px 28px', background: '#fff' }}>
          <h4 style={{ margin: '0 0 18px', fontSize: 16, fontWeight: 800, color: '#0b1220' }}>基本情報</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: 600 }}>年代</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0b1220' }}>{me.age || '未設定'}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: 600 }}>地域</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0b1220' }}>{me.region || '未設定'}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: 600 }}>よく使う時間帯</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0b1220' }}>{me.activeTime || '未設定'}</div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: 600 }}>自己紹介</div>
              <div style={{ fontSize: 15, lineHeight: 1.8, color: '#0b1220' }}>{me.bio || 'よろしくお願いします！'}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default MyProfileModal;
