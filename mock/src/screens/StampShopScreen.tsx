import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { navigate } from '../store/uiSlice';
import { addPoints, purchaseStamp } from '../store/userSlice';
import BottomNav from '../components/common/BottomNav';
import { IconBack, IconStamp } from '../components/icons';
import { mockStampPacks } from '../data/mockData';
import type { StampPack } from '../store/userSlice';

const StampShopScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const points = useAppSelector((s:any)=> s.user.points as number);
  const ownedStamps = useAppSelector((s:any)=> s.user.ownedStamps as string[]);
  const [showAdModal, setShowAdModal] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState<StampPack | null>(null);
  const [isWatchingAd, setIsWatchingAd] = useState(false);

  const handleWatchAd = () => {
    setIsWatchingAd(true);
    // Simulate ad watching
    setTimeout(() => {
      dispatch(addPoints(10));
      setIsWatchingAd(false);
      setShowAdModal(false);
    }, 2000);
  };

  const handlePurchase = () => {
    if (!selectedStamp) return;
    if (points >= selectedStamp.price) {
      dispatch(purchaseStamp({ stampId: selectedStamp.id, price: selectedStamp.price }));
      setSelectedStamp(null);
    }
  };

  return (
    <div style={{ minHeight:'100vh', paddingBottom:80, background:'var(--color-bg)', WebkitOverflowScrolling:'touch' }}>
      {/* Header */}
      <div style={{ 
        position:'sticky', 
        top:0, 
        zIndex:100, 
        background:'var(--color-surface)', 
        borderBottom:'1px solid var(--color-border)', 
        padding:'14px 20px', 
        display:'flex', 
        alignItems:'center', 
        gap:12,
        justifyContent:'flex-start',
        position:'sticky'
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
        <h1 style={{ 
          margin:0, 
          fontSize:18, 
          fontWeight:600, 
          letterSpacing:'.5px', 
          position:'absolute', 
          left:'50%', 
          transform:'translateX(-50%)', 
          top:'50%', 
          translate:'0 -50%'
        }}>スタンプ購入</h1>
      </div>

      <div style={{ padding:'18px 20px' }}>
        {/* Point Banner */}
        <div style={{ 
          background:'linear-gradient(135deg,#f8fbff 0%,#eef7ff 45%, #e6f5ff 100%)',
          border:'1px solid #dbeafe',
          borderRadius:16,
          padding:'18px 20px',
          marginBottom:24,
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          boxShadow:'0 4px 14px rgba(0,0,0,.06)'
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:14, fontWeight:600, color:'#0f172a' }}>保有ポイント</span>
            <span style={{ fontSize:22, fontWeight:700, color:'#0EA5E9', textShadow:'0 1px 0 rgba(255,255,255,.6)' }}>{points}</span>
          </div>
          <button
            onClick={()=>setShowAdModal(true)}
            style={{
              background:'#0EA5E9',
              color:'#fff',
              border:'1px solid #0EA5E9',
              padding:'10px 20px',
              borderRadius:10,
              fontSize:14,
              fontWeight:600,
              cursor:'pointer',
              transition:'all .25s cubic-bezier(.4,0,.2,1)',
              whiteSpace:'nowrap',
              boxShadow:'0 4px 10px rgba(14,165,233,.25)'
            }}
            onMouseOver={e=>{
              e.currentTarget.style.background='#0284c7';
              e.currentTarget.style.boxShadow='0 6px 16px rgba(2,132,199,.35)';
            }}
            onMouseOut={e=>{
              e.currentTarget.style.background='#0EA5E9';
              e.currentTarget.style.boxShadow='0 4px 10px rgba(14,165,233,.25)';
            }}
          >
            広告を見る
          </button>
        </div>

        {/* Section Title */}
        <h2 style={{ margin:'0 0 10px', fontSize:16, fontWeight:600, color:'#0f172a' }}>お気に入りのスタンプを見つけよう</h2>
        <p style={{ margin:'0 0 18px', fontSize:12, color:'#64748b' }}>タップして詳細・プレビュー / 所有済みは青いバッジが表示されます。</p>

        {/* Stamp Grid */}
        <div style={{ 
          display:'grid', 
          gridTemplateColumns:'repeat(2, 1fr)', 
          gap:14
        }}>
          {mockStampPacks.map(pack => {
            const isOwned = ownedStamps.includes(pack.id);
            return (
              <div 
                key={pack.id}
                onClick={()=>setSelectedStamp(pack)}
                style={{ 
                  background:'#fff',
                  border:'1px solid #e2e8f0',
                  borderRadius:18,
                  padding:0,
                  cursor:'pointer',
                  transition:'all .25s cubic-bezier(.4,0,.2,1)',
                  overflow:'hidden',
                  boxShadow:'0 2px 6px rgba(0,0,0,.06)',
                  position:'relative'
                }}
                onMouseOver={e=>{
                  e.currentTarget.style.boxShadow='0 6px 18px rgba(0,0,0,.12)';
                  e.currentTarget.style.transform='translateY(-3px)';
                }}
                onMouseOut={e=>{
                  e.currentTarget.style.boxShadow='0 2px 6px rgba(0,0,0,.06)';
                  e.currentTarget.style.transform='translateY(0)';
                }}
                aria-label={`${pack.name} スタンプパック 詳細を開く`}
              >
                <div style={{ 
                  height:150,
                  background:'linear-gradient(135deg,#f1f5f9 0%,#f8fafc 100%)',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  borderBottom:'1px solid #e2e8f0'
                }}>
                  <span style={{ fontSize:44, fontWeight:700, color:'#cbd5e1', letterSpacing:1 }}>STAMP</span>
                </div>
                <div style={{ padding:'14px 16px', background:'#fff' }}>
                  <h3 style={{ margin:'0 0 4px', fontSize:15, fontWeight:700, color:'#0f172a' }}>{pack.name}</h3>
                  <p style={{ margin:'0 0 8px', fontSize:12, color:'#64748b' }}>{pack.count}個</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                    <span style={{ fontSize:16, fontWeight:700, color:'#0f172a' }}>{pack.price}pt</span>
                    {isOwned && (
                      <span style={{ 
                        fontSize:10,
                        background:'#0EA5E9',
                        color:'#fff',
                        padding:'4px 8px',
                        borderRadius:20,
                        fontWeight:600,
                        boxShadow:'0 2px 6px rgba(14,165,233,.3)'
                      }}>
                        購入済み
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />

      {/* Ad Modal */}
      {showAdModal && (
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
          onClick={()=>!isWatchingAd && setShowAdModal(false)}
        >
          <div 
            style={{ 
              background:'#fff', 
              width:'100%', 
              maxWidth:400,
              borderRadius:20,
              padding:'32px 28px', 
              boxShadow:'0 20px 60px rgba(0,0,0,.15)', 
              animation:'modalScale .35s cubic-bezier(.34,1.56,.64,1)',
              textAlign:'center'
            }} 
            onClick={e=>e.stopPropagation()}
          >
            <h2 style={{ margin:'0 0 12px', fontSize:20, fontWeight:700, color:'#0f172a' }}>広告視聴でポイント獲得</h2>
            <p style={{ margin:'0 0 28px', fontSize:15, color:'var(--color-text-soft)', lineHeight:1.6 }}>
              広告を最後まで視聴すると<br/>
              <strong style={{ fontSize:18, color:'#0EA5E9', fontWeight:700 }}>10pt</strong> 獲得できます
            </p>
            {isWatchingAd ? (
              <div style={{ padding:'20px 0' }}>
                <div style={{ 
                  width:40, 
                  height:40, 
                  border:'3px solid #e5e5e5', 
                  borderTop:'3px solid #0EA5E9', 
                  borderRadius:'50%', 
                  margin:'0 auto',
                  animation:'spin 1s linear infinite'
                }} />
                <p style={{ marginTop:16, fontSize:14, color:'var(--color-muted)' }}>広告を読み込み中...</p>
              </div>
            ) : (
              <div style={{ display:'flex', gap:12 }}>
                <button 
                  onClick={()=>setShowAdModal(false)} 
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
                  キャンセル
                </button>
                <button 
                  onClick={handleWatchAd} 
                  style={{ 
                    flex:1,
                    background:'#0EA5E9',
                    color:'#fff',
                    border:'none',
                    padding:'14px',
                    fontSize:15,
                    fontWeight:600,
                    borderRadius:12,
                    cursor:'pointer',
                    transition:'all .2s ease'
                  }}
                  onMouseOver={e=>(e.currentTarget.style.background='#0284c7')}
                  onMouseOut={e=>(e.currentTarget.style.background='#0EA5E9')}
                >
                  視聴する
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stamp Detail Modal */}
      {selectedStamp && (
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
          onClick={()=>setSelectedStamp(null)}
        >
          <div 
            style={{ 
              background:'#fff', 
              width:'100%', 
              maxWidth:440,
              borderRadius:20,
              padding:'0', 
              boxShadow:'0 20px 60px rgba(0,0,0,.15)', 
              animation:'modalScale .35s cubic-bezier(.34,1.56,.64,1)',
              overflow:'hidden'
            }} 
            onClick={e=>e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ 
              background:'#fff',
              borderBottom:'1px solid var(--color-border)',
              padding:'24px',
              textAlign:'center'
            }}>
              <h2 style={{ margin:'0 0 8px', fontSize:20, fontWeight:700, color:'#0f172a' }}>{selectedStamp.name}</h2>
              <p style={{ margin:0, fontSize:14, color:'#64748b' }}>
                {selectedStamp.description}
              </p>
            </div>

            {/* Content */}
            <div style={{ padding:'24px' }}>
              <p style={{ margin:'0 0 20px', fontSize:14, color:'#64748b', lineHeight:1.6 }}>かわいい！ゆるゆるニャンコのスタンプです！</p>

              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                disabled={ownedStamps.includes(selectedStamp.id) || points < selectedStamp.price}
                style={{
                  width:'100%',
                  background: ownedStamps.includes(selectedStamp.id) ? '#94a3b8' : '#0EA5E9',
                  color:'#fff',
                  border:'none',
                  padding:'16px',
                  fontSize:16,
                  fontWeight:700,
                  borderRadius:12,
                  cursor: ownedStamps.includes(selectedStamp.id) || points < selectedStamp.price ? 'not-allowed' : 'pointer',
                  opacity: ownedStamps.includes(selectedStamp.id) || points < selectedStamp.price ? 0.6 : 1,
                  marginBottom:12,
                  transition:'all .2s ease'
                }}
                onMouseOver={e=>{
                  if (!ownedStamps.includes(selectedStamp.id) && points >= selectedStamp.price) {
                    (e.currentTarget as HTMLButtonElement).style.background='#0284c7';
                  }
                }}
                onMouseOut={e=>{
                  if (!ownedStamps.includes(selectedStamp.id) && points >= selectedStamp.price) {
                    (e.currentTarget as HTMLButtonElement).style.background='#0EA5E9';
                  }
                }}
              >
                {ownedStamps.includes(selectedStamp.id) ? '購入済み' : `${selectedStamp.price}ptでダウンロード`}
              </button>

              <button
                onClick={()=>setSelectedStamp(null)}
                style={{
                  width:'100%',
                  background:'#fff',
                  color:'#000',
                  border:'1px solid var(--color-border)',
                  padding:'16px',
                  fontSize:15,
                  fontWeight:600,
                  borderRadius:12,
                  cursor:'pointer',
                  transition:'all .2s ease',
                  marginBottom:20
                }}
                onMouseOver={e=>(e.currentTarget.style.background='var(--color-surface-alt)')}
                onMouseOut={e=>(e.currentTarget.style.background='#fff')}
              >
                キャンセル
              </button>

              {/* Stamp Preview Grid */}
              <div style={{ border:'1px solid #e2e8f0', borderRadius:12, padding:16, background:'#f8fafc' }}>
                <div style={{ 
                  display:'grid', 
                  gridTemplateColumns:'repeat(4, 1fr)', 
                  gap:10
                }}>
                  {Array.from({ length:12 }).map((_,i) => (
                    <div 
                      key={i}
                      style={{ 
                        background:'#e2e8f0',
                        border:'1px solid #cbd5e1',
                        borderRadius:8,
                        aspectRatio:'1',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center'
                      }}
                    >
                      <span style={{ fontSize:10, color:'#64748b', fontWeight:600 }}>IMG</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default StampShopScreen;
