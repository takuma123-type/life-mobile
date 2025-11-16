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
        <h1 style={{ margin:0, fontSize:18, fontWeight:600 }}>LIFE</h1>
      </div>

      <div style={{ padding:'18px 20px' }}>
        {/* Point Banner */}
        <div style={{ 
          background:'#fff',
          border:'1px solid var(--color-border)',
          borderRadius:16,
          padding:'18px 20px',
          marginBottom:24,
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          boxShadow:'0 2px 8px rgba(0,0,0,.08)'
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:15, fontWeight:600, color:'#666' }}>保有ポイント:</span>
            <span style={{ fontSize:20, fontWeight:700, color:'#000' }}>{points}</span>
          </div>
          <button
            onClick={()=>setShowAdModal(true)}
            style={{
              background:'#000',
              color:'#fff',
              border:'none',
              padding:'10px 20px',
              borderRadius:8,
              fontSize:14,
              fontWeight:600,
              cursor:'pointer',
              transition:'all .2s ease',
              whiteSpace:'nowrap'
            }}
            onMouseOver={e=>(e.currentTarget.style.opacity='0.85')}
            onMouseOut={e=>(e.currentTarget.style.opacity='1')}
          >
            広告を見る
          </button>
        </div>

        {/* Section Title */}
        <h2 style={{ margin:'0 0 18px', fontSize:16, fontWeight:600, color:'#333' }}>
          お気に入りのスタンプを見つけよう
        </h2>

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
                  border:'1px solid var(--color-border)',
                  borderRadius:16,
                  padding:0,
                  cursor:'pointer',
                  transition:'all .2s ease',
                  overflow:'hidden',
                  boxShadow:'0 2px 8px rgba(0,0,0,.08)'
                }}
              >
                <div style={{ 
                  height:160,
                  background:'#f5f5f5',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  borderBottom:'1px solid var(--color-border)'
                }}>
                  <span style={{ 
                    fontSize:48, 
                    fontWeight:700, 
                    color:'#ccc'
                  }}>STAMP</span>
                </div>
                <div style={{ padding:'14px 16px', background:'#fff' }}>
                  <h3 style={{ margin:'0 0 6px', fontSize:16, fontWeight:700 }}>{pack.name}</h3>
                  <p style={{ margin:'0 0 10px', fontSize:13, color:'#666' }}>{pack.count}個</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                    <span style={{ fontSize:18, fontWeight:700 }}>{pack.price}pt</span>
                    {isOwned && (
                      <span style={{ 
                        fontSize:11,
                        background:'#10b981',
                        color:'#fff',
                        padding:'4px 10px',
                        borderRadius:6,
                        fontWeight:600
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
            <h2 style={{ margin:'0 0 12px', fontSize:20, fontWeight:700 }}>
              広告を視聴してポイント獲得
            </h2>
            <p style={{ margin:'0 0 28px', fontSize:15, color:'var(--color-text-soft)', lineHeight:1.6 }}>
              広告を最後まで視聴すると<br/>
              <strong style={{ fontSize:18, color:'#000', fontWeight:700 }}>10pt</strong> 獲得できます
            </p>
            {isWatchingAd ? (
              <div style={{ padding:'20px 0' }}>
                <div style={{ 
                  width:40, 
                  height:40, 
                  border:'3px solid #e5e5e5', 
                  borderTop:'3px solid #000', 
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
              <h2 style={{ margin:'0 0 8px', fontSize:20, fontWeight:700 }}>{selectedStamp.name}</h2>
              <p style={{ margin:0, fontSize:14, color:'var(--color-text-soft)' }}>
                {selectedStamp.description}
              </p>
            </div>

            {/* Content */}
            <div style={{ padding:'24px' }}>
              <p style={{ margin:'0 0 20px', fontSize:14, color:'var(--color-text-soft)', lineHeight:1.6 }}>
                かわいい！ゆるゆるニャンコのスタンプです！
              </p>

              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                disabled={ownedStamps.includes(selectedStamp.id) || points < selectedStamp.price}
                style={{
                  width:'100%',
                  background: ownedStamps.includes(selectedStamp.id) ? '#94a3b8' : '#666',
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
                    (e.currentTarget as HTMLButtonElement).style.background='#000';
                  }
                }}
                onMouseOut={e=>{
                  if (!ownedStamps.includes(selectedStamp.id) && points >= selectedStamp.price) {
                    (e.currentTarget as HTMLButtonElement).style.background='#666';
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
              <div style={{ 
                border:'1px solid var(--color-border)',
                borderRadius:12,
                padding:16,
                background:'#fafafa'
              }}>
                <div style={{ 
                  display:'grid', 
                  gridTemplateColumns:'repeat(4, 1fr)', 
                  gap:10
                }}>
                  {Array.from({ length:12 }).map((_,i) => (
                    <div 
                      key={i}
                      style={{ 
                        background:'#e5e5e5',
                        border:'1px solid #ddd',
                        borderRadius:8,
                        aspectRatio:'1',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center'
                      }}
                    >
                      <span style={{ fontSize:10, color:'#999', fontWeight:600 }}>IMG</span>
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
