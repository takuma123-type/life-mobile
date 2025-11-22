import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeFollowRequestsModal } from '../../store/uiSlice';
import { acceptFollowRequest, rejectFollowRequest } from '../../store/userSlice';
import type { FollowRequest } from '../../store/userSlice';
import { IconX, IconAvatar } from '../icons';
import { designTokens } from '../../styles/designTokens';
import Button from '../common/Button';

// フレンド申請モーダル: 新規登録などと同じ下からスライド表示 UI
const FollowRequestsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s:any) => s.ui.followRequestsModalOpen);
  const requests = useAppSelector((s:any) => s.user.followRequests as FollowRequest[]);
  const [confirm, setConfirm] = useState<{ type:'accept'|'reject', id:string }|null>(null);

  if (!open) return null;

  const reqObj = (id:string) => requests.find(r=> r.id === id)!;

  const doAction = () => {
    if(!confirm) return;
    if(confirm.type === 'accept') dispatch(acceptFollowRequest(confirm.id));
    else dispatch(rejectFollowRequest(confirm.id));
    setConfirm(null);
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'flex-end', justifyContent:'center', padding:0, zIndex:400, animation:'fadeIn .25s ease' }}>
      <style>{`
        @keyframes fadeIn {from{opacity:0}to{opacity:1}}
        @keyframes slideUp {from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes scale {from{transform:scale(.95);opacity:0}to{transform:scale(1);opacity:1}}
      `}</style>
      <div style={{ background:'#fff', width:'100%', maxHeight:'90vh', borderRadius:'28px 28px 0 0', padding:0, position:'relative', overflow:'auto', animation:'slideUp .35s cubic-bezier(0.16,1,0.3,1)' }} onClick={e=>e.stopPropagation()}>
        {/* ヘッダー */}
        <div style={{ 
          position:'sticky', 
          top:0, 
          background: designTokens.colors.background.primary, 
          borderBottom: `1px solid ${designTokens.colors.border.light}`, 
          padding: `${designTokens.spacing.md} ${designTokens.spacing.lg} ${designTokens.spacing.md}`, 
          display:'flex', 
          alignItems:'center', 
          justifyContent:'space-between', 
          zIndex:10,
          boxShadow: designTokens.shadow.sm
        }}>
          <button 
            onClick={()=>dispatch(closeFollowRequestsModal())} 
            style={{ 
              background: designTokens.colors.primary.pale, 
              border:'none', 
              color: designTokens.colors.primary.main, 
              fontSize: designTokens.typography.body.fontSize, 
              fontWeight:600, 
              cursor:'pointer', 
              padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`, 
              borderRadius: designTokens.radius.full, 
              display:'flex', 
              alignItems:'center', 
              gap: designTokens.spacing.xs
            }}>
            <IconX size={16} />閉じる
          </button>
          <h2 style={{ 
            margin:0, 
            fontSize: designTokens.typography.h3.fontSize, 
            fontWeight: designTokens.typography.h3.fontWeight as number 
          }}>フレンド申請</h2>
          <div style={{ width:70 }} />
        </div>

        <div style={{ padding:'26px 20px 40px', maxWidth:640, margin:'0 auto' }}>
          <div style={{ marginBottom:24 }}>
            <span style={{ display:'inline-block', background:'#f1f5f9', color:'#334155', fontSize:12, fontWeight:600, padding:'6px 14px', borderRadius:999 }}>{requests.length}件の申請</span>
          </div>
          {requests.map(r => (
            <div key={r.id} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:24, padding:'20px 20px 24px', marginBottom:28, boxShadow:'0 4px 16px -4px rgba(0,0,0,0.06)' }}>
              <div style={{ display:'flex', gap:16, marginBottom:18 }}>
                <div style={{ width:72, height:72, borderRadius:'50%', background:'#f8fafc', border:'2px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                  {r.avatar ? <img src={r.avatar} alt={r.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <IconAvatar size={34} color="#94a3b8" />}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:8, marginBottom:6 }}>
                    <span style={{ fontSize:16, fontWeight:700, color:'#0f172a' }}>{r.name}</span>
                    {r.age && <span style={{ fontSize:11, fontWeight:600, background:'#e0f2fe', color:'#0369a1', padding:'4px 10px', borderRadius:999 }}>{r.age}</span>}
                  </div>
                  <p style={{ margin:0, fontSize:14, lineHeight:1.6, color:'#475569', wordBreak:'break-word' }}>{r.message}</p>
                </div>
              </div>
              <div style={{ display:'flex', gap: designTokens.spacing.md }}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={()=>setConfirm({ type:'accept', id:r.id })}
                  style={{ flex:1 }}
                >
                  承認
                </Button>
                <Button
                  variant="tertiary"
                  size="md"
                  onClick={()=>setConfirm({ type:'reject', id:r.id })}
                  style={{ flex:1 }}
                >
                  拒否
                </Button>
              </div>
            </div>
          ))}
          {requests.length === 0 && (
            <div style={{ border:'1px solid #e2e8f0', background:'#f8fafc', borderRadius:20, padding:'60px 24px', textAlign:'center' }}>
              <p style={{ margin:0, fontSize:14, color:'#64748b' }}>フレンド申請はありません</p>
            </div>
          )}
        </div>
      </div>

      {/* 確認モーダル (センター表示) */}
      {confirm && (
        <div style={{ position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:500, background:'rgba(0,0,0,0.55)', animation:'fadeIn .2s ease' }} onClick={()=>setConfirm(null)}>
          <div onClick={e=>e.stopPropagation()} style={{ width:'100%', maxWidth:420, background:'#fff', borderRadius:24, padding:'36px 32px 32px', boxShadow:'0 20px 60px -10px rgba(0,0,0,0.25)', animation:'scale .3s cubic-bezier(.34,1.56,.64,1)' }}>
            <h3 style={{ margin:'0 0 12px', fontSize:20, fontWeight:800, textAlign:'center', color:'#0f172a' }}>申請を{confirm.type==='accept'?'承認':'拒否'}しますか？</h3>
            <p style={{ margin:'0 0 28px', fontSize:15, lineHeight:1.7, textAlign:'center', color:'#475569' }}>{reqObj(confirm.id).name}さんのフレンド申請を{confirm.type==='accept'?'承認':'拒否'}しようとしています。</p>
            <div style={{ display:'flex', gap:14 }}>
              <button onClick={()=>setConfirm(null)} style={{ flex:1, background:'#fff', color:'#0f172a', border:'2px solid #e2e8f0', padding:'14px 0', fontSize:15, fontWeight:700, borderRadius:16, cursor:'pointer' }}>キャンセル</button>
              <button onClick={doAction} style={{ flex:1, background: confirm.type==='accept' ? '#0EA5E9' : '#dc2626', color:'#fff', border:'none', padding:'14px 0', fontSize:15, fontWeight:700, borderRadius:16, cursor:'pointer', boxShadow: confirm.type==='accept' ? '0 4px 14px rgba(14,165,233,.3)' : '0 4px 14px rgba(220,38,38,.3)' }}>{confirm.type==='accept'?'承認する':'拒否する'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowRequestsModal;