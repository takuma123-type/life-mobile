import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import BottomNav from '../components/common/BottomNav';
import { IconShield, IconUsers, IconHeart, IconLanguage, IconLogout, IconAvatar, IconUser } from '../components/icons';
import { openProfileModal, openGuestProfileModal, openSmsModal, navigate, openLanguageModal, setAuthenticated, setRegistered, openLoginModal } from '../store/uiSlice';
import { setMe } from '../store/userSlice';

const MyPageScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((s:any)=> s.user.me);
  const friendRequestCount = useAppSelector((s:any)=> s.user.followRequests?.length || 0);
  const verified = useAppSelector((s:any)=> s.ui.smsVerified);
  const isAuthenticated = useAppSelector((s:any)=> s.ui.isAuthenticated);

  const handleLogout = () => {
    if (window.confirm('ログアウトしますか？')) {
      dispatch(setMe(null));
      dispatch(setAuthenticated(false));
      dispatch(setRegistered(false));
      dispatch(navigate('login'));
    }
  };

  const handleSignUpLogin = () => {
    dispatch(openSmsModal());
  };

  return (
    <div style={{ paddingBottom:80, background:'#fff', minHeight:'100vh' }}>
      {/* ヘッダー */}
      <div style={{ 
        background:'#fff', 
        borderBottom:'1px solid #e5e7eb',
        padding:'16px 20px'
      }}>
        <div style={{
          fontSize:20,
          fontWeight:700,
          letterSpacing:'0.1em',
          color:'#000',
          textAlign:'center'
        }}>
          LIFE
        </div>
      </div>

      {/* プロフィールセクション */}
      {isAuthenticated && me ? (
        <div style={{ background:'#fff', padding:'30px 20px 24px' }}>
          {/* アバター */}
          <div style={{
            width:100, 
            height:100, 
            borderRadius:'50%', 
            overflow:'hidden',
            border:'2px solid #e5e7eb',
            margin:'0 auto 16px',
            background:'#f3f4f6'
          }}>
            {me?.avatar ? (
              <img src={me.avatar} alt={me.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            ) : (
              <div style={{ 
                width:'100%', 
                height:'100%', 
                background:'#e0f2fe', 
                display:'flex', 
                alignItems:'center', 
                justifyContent:'center' 
              }}>
                <IconUser size={50} color='#0EA5E9' />
              </div>
            )}
          </div>

          {/* ユーザー情報 */}
          <div style={{ textAlign:'center', marginBottom:20 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:8 }}>
              <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:'#000' }}>
                {me?.name || '未設定'}
              </h2>
              <span style={{ 
                fontSize:11, 
                background:'#FEF3C7',
                color:'#92400E',
                padding:'4px 10px', 
                borderRadius:12,
                fontWeight:600
              }}>
                🎮 +5
              </span>
            </div>
            
            <div style={{ 
              fontSize:13, 
              color:'#999',
              marginBottom:12,
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              gap:4
            }}>
              📇 ID: 434918634
            </div>
            
            <p style={{ 
              margin:'0 0 20px', 
              fontSize:14, 
              color:'#666',
              lineHeight:1.6
            }}>
              {me?.bio || 'デフォルトのプロフィール紹介です。お好みで変更してください～'}
            </p>

            {/* 統計 */}
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(3, 1fr)',
              gap:20,
              marginBottom:20
            }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ 
                  fontSize:22, 
                  fontWeight:700, 
                  color:'#0EA5E9',
                  marginBottom:4
                }}>19</div>
                <div style={{ fontSize:12, color:'#999' }}>フォロー</div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ 
                  fontSize:22, 
                  fontWeight:700, 
                  color:'#0EA5E9',
                  marginBottom:4
                }}>4</div>
                <div style={{ fontSize:12, color:'#999' }}>フォロワー</div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ 
                  fontSize:22, 
                  fontWeight:700, 
                  color:'#F43F5E',
                  marginBottom:4
                }}>4</div>
                <div style={{ fontSize:12, color:'#999' }}>いいね</div>
              </div>
            </div>

            {/* 編集ボタン */}
            <button 
              style={{
                width:'100%',
                background:'#E0F2FE',
                border:'none',
                color:'#0369A1',
                padding:'12px',
                borderRadius:24,
                fontSize:15,
                cursor:'pointer',
                fontWeight:600,
                transition:'all .2s ease'
              }}
              onClick={()=>dispatch(openProfileModal())}
              onMouseOver={e => {
                e.currentTarget.style.background = '#BAE6FD';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#E0F2FE';
              }}
            >
              ✏️ 編集
            </button>
          </div>
        </div>
      ) : null}

      {/* メニューリスト */}
      <div style={{ background:'#fff' }}>
        {!isAuthenticated ? (
          <div 
            onClick={handleSignUpLogin} 
            style={{ 
              padding:'16px 20px',
              display:'flex',
              alignItems:'center',
              gap:12,
              cursor:'pointer',
              borderBottom:'1px solid #f0f0f0',
              transition:'background .2s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#fafafa';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#fff';
            }}
          >
            <div style={{
              width:48,
              height:48,
              borderRadius:'50%',
              background:'#E0F2FE',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              flexShrink:0
            }}>
              <IconUser size={24} color="#0EA5E9" />
            </div>
            <span style={{ fontSize:15, fontWeight:500, color:'#000', flex:1 }}>新規登録 / ログイン</span>
            <span style={{ fontSize:20, color:'#ccc' }}>›</span>
          </div>
        ) : (
          <>
            <div 
              onClick={()=>dispatch(openSmsModal())} 
              style={{ 
                padding:'16px 20px',
                display:'flex',
                alignItems:'center',
                gap:12,
                cursor:'pointer',
                borderBottom:'1px solid #f0f0f0',
                transition:'background .2s ease'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#fafafa';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#fff';
              }}
            >
              <div style={{
                width:48,
                height:48,
                borderRadius:'50%',
                background:'#F3E8FF',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <IconShield size={24} color="#9333EA" />
              </div>
              <span style={{ fontSize:15, fontWeight:500, color:'#000', flex:1 }}>SMS本人確認</span>
              <span style={{ 
                fontSize:11, 
                padding:'3px 8px', 
                borderRadius:10,
                background: verified ? '#D1FAE5' : '#FEE2E2',
                color: verified ? '#065F46' : '#991B1B',
                fontWeight:600
              }}>
                {verified? '確認済':'未認証'}
              </span>
            </div>
            
            <div 
              onClick={()=>dispatch(navigate('followRequests'))} 
              style={{ 
                padding:'16px 20px',
                display:'flex',
                alignItems:'center',
                gap:12,
                cursor:'pointer',
                borderBottom:'1px solid #f0f0f0',
                transition:'background .2s ease'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#fafafa';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#fff';
              }}
            >
              <div style={{
                width:48,
                height:48,
                borderRadius:'50%',
                background:'#D1FAE5',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <IconUsers size={24} color="#059669" />
              </div>
              <span style={{ fontSize:15, fontWeight:500, color:'#000', flex:1 }}>フレンド申請</span>
              {friendRequestCount>0 && (
                <span style={{ 
                  fontSize:11, 
                  padding:'3px 8px', 
                  borderRadius:10,
                  background:'#FEE2E2',
                  color:'#991B1B',
                  fontWeight:600,
                  marginRight:4
                }}>
                  {friendRequestCount}
                </span>
              )}
              <span style={{ fontSize:20, color:'#ccc' }}>›</span>
            </div>
            
            <div 
              onClick={()=>dispatch(navigate('stampShop'))} 
              style={{ 
                padding:'16px 20px',
                display:'flex',
                alignItems:'center',
                gap:12,
                cursor:'pointer',
                borderBottom:'1px solid #f0f0f0',
                transition:'background .2s ease'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#fafafa';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#fff';
              }}
            >
              <div style={{
                width:48,
                height:48,
                borderRadius:'50%',
                background:'#FCE7F3',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <IconHeart size={24} color="#E11D48" />
              </div>
              <span style={{ fontSize:15, fontWeight:500, color:'#000', flex:1 }}>スタンプ購入</span>
              <span style={{ fontSize:20, color:'#ccc' }}>›</span>
            </div>
          </>
        )}
        
        <div 
          onClick={()=>dispatch(openLanguageModal())} 
          style={{ 
            padding:'16px 20px',
            display:'flex',
            alignItems:'center',
            gap:12,
            cursor:'pointer',
            borderBottom:'1px solid #f0f0f0',
            transition:'background .2s ease'
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#fafafa';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#fff';
          }}
        >
          <div style={{
            width:48,
            height:48,
            borderRadius:'50%',
            background:'#FEF3C7',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flexShrink:0
          }}>
            <IconLanguage size={24} color="#D97706" />
          </div>
          <span style={{ fontSize:15, fontWeight:500, color:'#000', flex:1 }}>言語設定</span>
          <span style={{ fontSize:20, color:'#ccc' }}>›</span>
        </div>
        
        {isAuthenticated && (
          <div 
            onClick={handleLogout} 
            style={{ 
              padding:'16px 20px',
              display:'flex',
              alignItems:'center',
              gap:12,
              cursor:'pointer',
              transition:'background .2s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#fafafa';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#fff';
            }}
          >
            <div style={{
              width:48,
              height:48,
              borderRadius:'50%',
              background:'#FEE2E2',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              flexShrink:0
            }}>
              <IconLogout size={24} color="#DC2626" />
            </div>
            <span style={{ fontSize:15, fontWeight:500, color:'#DC2626', flex:1 }}>ログアウト</span>
            <span style={{ fontSize:20, color:'#ccc' }}>›</span>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};
export default MyPageScreen;
