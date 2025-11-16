import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { navigate } from '../store/uiSlice';
import { acceptFollowRequest, rejectFollowRequest } from '../store/userSlice';
import { IconBack, IconAvatar } from '../components/icons';
import type { FollowRequest } from '../store/userSlice';

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
    <div style={{ minHeight:'100vh', paddingBottom:80, background:'var(--color-bg)' }}>
      {/* Header */}
      <div style={{ 
        position:'sticky', 
        top:0, 
        zIndex:100, 
        background:'#fff', 
        borderBottom:'1px solid var(--color-border)', 
        padding:'14px 20px', 
        display:'flex', 
        alignItems:'center', 
        gap:12
      }}>
        <button 
          onClick={()=>dispatch(navigate('mypage'))} 
          aria-label='戻る' 
          style={{ 
            background:'none', 
            border:'none', 
            cursor:'pointer', 
            display:'flex',
            padding:8,
            transition:'opacity .2s ease',
            opacity:1
          }}
          onMouseOver={e=>(e.currentTarget.style.opacity='0.6')}
          onMouseOut={e=>(e.currentTarget.style.opacity='1')}
        >
          <IconBack size={24} />
        </button>
        <h1 style={{ margin:0, fontSize:18, fontWeight:600 }}>フレンド申請</h1>
      </div>

      <div style={{ padding:'18px 20px' }}>
        <p style={{ margin:'0 0 18px', fontSize:13, color:'var(--color-muted)' }}>{requests.length}件の申請</p>

        {requests.map((req, index) => (
          <div 
            key={req.id} 
            style={{ 
              background:'#fff',
              border:'1px solid var(--color-border)',
              borderRadius:16, 
              padding:'20px', 
              marginBottom:16, 
              boxShadow:'0 2px 8px rgba(0,0,0,.08)',
              transition:'all .2s ease'
            }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
              {/* Avatar */}
              <div style={{ position:'relative', flexShrink:0 }}>
                <div style={{ 
                  width:60, 
                  height:60, 
                  borderRadius:'50%',
                  border:'2px solid var(--color-border)',
                  background:'var(--color-surface-alt)', 
                  display:'flex', 
                  alignItems:'center', 
                  justifyContent:'center',
                  overflow:'hidden'
                }}>
                  {req.avatar ? (
                    <img src={req.avatar} alt={req.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  ) : (
                    <IconAvatar size={32} color='var(--color-muted)' />
                  )}
                </div>
              </div>

              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, flexWrap:'wrap' }}>
                  <span style={{ fontWeight:600, fontSize:16 }}>{req.name}</span>
                  {req.age && (
                    <span className='badge badge-neutral' style={{ fontSize:12 }}>
                      {req.age}
                    </span>
                  )}
                </div>
                <p style={{ 
                  margin:0, 
                  fontSize:14, 
                  color:'var(--color-text-soft)', 
                  lineHeight:1.5
                }}>
                  {req.message}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display:'flex', gap:12 }}>
              <button 
                onClick={()=>handleAccept(req)} 
                style={{ 
                  flex:1,
                  background:'#000',
                  color:'#fff',
                  border:'none',
                  padding:'14px',
                  fontSize:15,
                  fontWeight:600,
                  borderRadius:12,
                  cursor:'pointer',
                  transition:'all .2s ease'
                }}
                onMouseOver={e=>(e.currentTarget.style.opacity='0.85')}
                onMouseOut={e=>(e.currentTarget.style.opacity='1')}
              >
                承認
              </button>
              <button 
                onClick={()=>handleReject(req)} 
                style={{ 
                  flex:1,
                  background:'#fff',
                  color:'#000',
                  border:'1px solid var(--color-border)',
                  padding:'14px',
                  fontSize:15,
                  fontWeight:600,
                  borderRadius:12,
                  cursor:'pointer',
                  transition:'all .2s ease'
                }}
                onMouseOver={e=>(e.currentTarget.style.background='var(--color-surface-alt)')}
                onMouseOut={e=>(e.currentTarget.style.background='#fff')}
              >
                拒否
              </button>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div style={{ 
            textAlign:'center', 
            padding:'60px 20px',
            background:'var(--color-surface)',
            border:'1px solid var(--color-border)',
            borderRadius:14
          }}>
            <p style={{ margin:0, fontSize:14, color:'var(--color-muted)' }}>
              フレンド申請はありません
            </p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div 
          style={{ 
            position:'fixed', 
            inset:0, 
            background:'rgba(0,0,0,.5)', 
            backdropFilter:'blur(6px)', 
            display:'flex', 
            alignItems:'center', 
            justifyContent:'center', 
            zIndex:300, 
            animation:'fadeIn .3s ease',
            padding:'20px'
          }} 
          onClick={()=>setConfirmModal(null)}
        >
          <div 
            style={{ 
              background:'#fff', 
              width:'100%', 
              maxWidth:400, 
              borderRadius:20, 
              padding:'32px 28px', 
              boxShadow:'0 20px 60px rgba(0,0,0,.2)', 
              animation:'modalScale .35s cubic-bezier(.34,1.56,.64,1)'
            }} 
            onClick={e=>e.stopPropagation()}
          >
            <h2 style={{ 
              margin:'0 0 12px', 
              textAlign:'center', 
              fontSize:20, 
              fontWeight:700
            }}>
              フレンド申請の{confirmModal.type==='accept'?'承認':'拒否'}
            </h2>
            <p style={{ 
              margin:'0 0 28px', 
              fontSize:15, 
              textAlign:'center', 
              color:'var(--color-text-soft)', 
              lineHeight:1.6
            }}>
              {confirmModal.request.name}さんのフレンド申請を<br/>
              {confirmModal.type==='accept'?'承認':'拒否'}してもよろしいですか?
            </p>
            <div style={{ display:'flex', gap:12 }}>
              <button 
                onClick={()=>setConfirmModal(null)} 
                style={{ 
                  flex:1,
                  background:'#fff',
                  color:'#000',
                  border:'1px solid var(--color-border)',
                  padding:'16px',
                  fontSize:15,
                  fontWeight:600,
                  borderRadius:12,
                  cursor:'pointer',
                  transition:'all .2s ease'
                }}
                onMouseOver={e=>(e.currentTarget.style.background='var(--color-surface-alt)')}
                onMouseOut={e=>(e.currentTarget.style.background='#fff')}
              >
                キャンセル
              </button>
              <button 
                onClick={confirmAction} 
                style={{ 
                  flex:1,
                  background:confirmModal.type==='reject' ? '#ef4444' : '#000',
                  color:'#fff',
                  border:'none',
                  padding:'16px',
                  fontSize:15,
                  fontWeight:600,
                  borderRadius:12,
                  cursor:'pointer',
                  transition:'all .2s ease'
                }}
                onMouseOver={e=>(e.currentTarget.style.opacity='0.85')}
                onMouseOut={e=>(e.currentTarget.style.opacity='1')}
              >
                {confirmModal.type==='accept'?'承認する':'拒否する'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FollowRequestsScreen;
