import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { closeGuestProfileModal, openSmsModal, navigate } from '../../store/uiSlice';
import { setActiveChat } from '../../store/chatSlice';
import { IconX, IconAvatar } from '../icons';

const GuestProfileModal: React.FC = () => {
  const open = useAppSelector((s:any)=> s.ui.guestProfileModalOpen);
  const activeUserId = useAppSelector((s:any)=> s.user.activeUserId);
  const users = useAppSelector((s:any)=> s.user.users);
  const isAuthenticated = useAppSelector((s:any)=> s.ui.isAuthenticated);
  const dispatch = useAppDispatch();
  
  if(!open) return null;

  // activeUserIdからユーザー情報を取得
  const user = activeUserId ? users.find((u:any) => u.id === activeUserId) : null;

  const handleStartChat = () => {
    if (!isAuthenticated) {
      dispatch(closeGuestProfileModal());
      dispatch(openSmsModal());
      return;
    }
    if (user) {
      dispatch(setActiveChat(user.id));
      dispatch(closeGuestProfileModal());
      dispatch(navigate('chatDetail'));
    }
  };

  return (
    <div 
      style={{ 
        position:'fixed', 
        inset:0, 
        background:'rgba(0,0,0,.5)', 
        backdropFilter:'blur(6px)', 
        zIndex:200, 
        display:'flex', 
        alignItems:'center', 
        justifyContent:'center', 
        overflowY:'auto', 
        padding:'20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={()=>dispatch(closeGuestProfileModal())}
    >
      <div 
        style={{ 
          background:'#fff', 
          width:'100%', 
          maxWidth:480, 
          borderRadius:24, 
          padding:'0', 
          position:'relative', 
          boxShadow:'0 20px 60px rgba(0,0,0,.15)', 
          maxHeight:'90vh', 
          overflowY:'auto',
          animation: 'slideUp 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          aria-label='閉じる' 
          onClick={()=>dispatch(closeGuestProfileModal())} 
          style={{ 
            position:'absolute', 
            top:16, 
            right:16, 
            background:'rgba(0,0,0,.05)', 
            border:'none', 
            cursor:'pointer', 
            width:36, 
            height:36, 
            borderRadius:'50%', 
            display:'flex', 
            alignItems:'center', 
            justifyContent:'center', 
            transition:'background .2s ease', 
            zIndex:10 
          }} 
          onMouseOver={e=>(e.currentTarget.style.background='rgba(0,0,0,.1)')} 
          onMouseOut={e=>(e.currentTarget.style.background='rgba(0,0,0,.05)')}
        >
          <IconX size={20} />
        </button>
        
        {user ? (
          <>
            {/* ユーザープロフィール表示 */}
            <div style={{ 
              background: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
              padding: '40px 24px 80px',
              position: 'relative',
              borderRadius: '24px 24px 0 0'
            }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div style={{ position:'relative', marginBottom:16 }}>
                  <div style={{ 
                    width:120, 
                    height:120, 
                    borderRadius:'50%', 
                    border:'4px solid rgba(255,255,255,0.3)', 
                    background:'#fff', 
                    display:'flex', 
                    alignItems:'center', 
                    justifyContent:'center', 
                    boxShadow:'0 8px 24px rgba(0,0,0,.15)',
                    overflow: 'hidden'
                  }}>
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        style={{ width:'100%', height:'100%', objectFit:'cover' }} 
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 40,
                        fontWeight: 700,
                        color: '#0284c7'
                      }}>
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  {user.online && (
                    <span style={{ 
                      position:'absolute', 
                      bottom:4, 
                      right:4, 
                      width:28, 
                      height:28, 
                      background:'#10b981', 
                      border:'4px solid #fff', 
                      borderRadius:'50%', 
                      boxShadow:'0 2px 8px rgba(0,0,0,.2)' 
                    }} />
                  )}
                </div>
                
                <h3 style={{ 
                  margin:'0 0 8px', 
                  fontSize:24, 
                  fontWeight:700, 
                  color: '#fff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {user.name}
                </h3>
                
                {user.age && (
                  <span style={{ 
                    fontSize:13, 
                    background:'rgba(255,255,255,0.25)', 
                    color:'#fff',
                    padding:'6px 16px', 
                    borderRadius:16,
                    fontWeight:600,
                    backdropFilter: 'blur(10px)'
                  }}>
                    {user.age}
                  </span>
                )}
              </div>
            </div>

            <div style={{ padding:'24px', marginTop: '-60px', position: 'relative' }}>
              {/* ステータスメッセージ */}
              {user.message && (
                <div style={{
                  background: '#fff',
                  padding: '20px',
                  borderRadius: 16,
                  marginBottom: 20,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}>
                  <p style={{ 
                    margin:0, 
                    fontSize:15, 
                    color:'#1f2937', 
                    lineHeight:1.6,
                    textAlign: 'center'
                  }}>
                    {user.message}
                  </p>
                </div>
              )}

              {/* プロフィール情報 */}
              <div style={{
                background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
                padding: '20px',
                borderRadius: 16,
                marginBottom: 20
              }}>
                {user.region && (
                  <div style={{ marginBottom: 12 }}>
                    <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>地域</span>
                    <p style={{ margin: '4px 0 0', fontSize: 15, color: '#1f2937', fontWeight: 600 }}>
                      {user.region}{user.city ? ` / ${user.city}` : ''}
                    </p>
                  </div>
                )}
                {user.country && user.country !== '日本' && (
                  <div>
                    <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>国</span>
                    <p style={{ margin: '4px 0 0', fontSize: 15, color: '#1f2937', fontWeight: 600 }}>
                      {user.country}
                    </p>
                  </div>
                )}
              </div>

              {/* アクションボタン */}
              <button 
                onClick={handleStartChat}
                style={{ 
                  background:'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)', 
                  color:'#fff', 
                  border:'none', 
                  width:'100%', 
                  padding:'16px 24px', 
                  fontSize:16, 
                  borderRadius:16, 
                  cursor:'pointer', 
                  fontWeight:700, 
                  transition:'all .2s ease',
                  boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
                }} 
                onMouseOver={e=>{
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.4)';
                }} 
                onMouseOut={e=>{
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
                }}
              >
                {isAuthenticated ? 'チャットを開始' : 'ログインしてチャット'}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* ゲストユーザー表示（activeUserIdがない場合） */}
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
          </>
        )}
      </div>
    </div>
  );
};

export default GuestProfileModal;
