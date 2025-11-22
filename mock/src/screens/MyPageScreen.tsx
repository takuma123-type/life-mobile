import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import BottomNav from '../components/common/BottomNav';
import { openProfileModal, navigate, openLanguageModal, setAuthenticated, setRegistered, openLoginModal, openFollowRequestsModal } from '../store/uiSlice';
import { clearSession } from '../utils/session';
import { setMe } from '../store/userSlice';
import { IconUser, IconUsers, IconStamp, IconLanguage, IconLogout } from '../components/icons';

const MyPageScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const friendRequestCount = useAppSelector((s:any)=> s.user.followRequests?.length || 0);
  const isAuthenticated = useAppSelector((s:any)=> s.ui.isAuthenticated);

  const handleLogout = () => {
    if (window.confirm('ログアウトしますか？')) {
      dispatch(setMe(null));
      dispatch(setAuthenticated(false));
      dispatch(setRegistered(false));
      clearSession();
      // 以前は login 画面へ遷移していたが、マイページ上で未ログイン状態の UI を表示したい要件のため遷移を削除
      // dispatch(navigate('mypage')); // 現在も mypage のため不要
      // 要望: ログアウト後にページをリロードして初期状態を明確化
      setTimeout(() => {
        window.location.reload();
      }, 50);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', paddingBottom: 96 }}>
      <header style={{ padding: '48px 20px 32px', background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', margin: 0 }}>マイページ</h1>
      </header>

      {/* メインメニューグリッド */}
      <div style={{ padding: '24px 20px' }}>
        {!isAuthenticated && (
          <div style={{ marginBottom: 20 }}>
            <button
              type="button"
              onClick={() => dispatch(openLoginModal())}
              style={{
                width: '100%',
                padding: '18px 24px',
                background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
                border: 'none',
                borderRadius: 20,
                color: '#fff',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(14, 165, 233, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                letterSpacing: '0.02em'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(14, 165, 233, 0.35)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(14, 165, 233, 0.25)';
              }}
            >
              <IconUser size={22} color="#fff" />
              <span>新規登録 / ログイン</span>
            </button>
          </div>
        )}

        {isAuthenticated && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 14,
            marginBottom: 20
          }}>
            {/* プロフィール */}
            <button
              type="button"
              onClick={() => dispatch(openProfileModal())}
              style={{
                padding: '28px 20px',
                background: '#fff',
                border: 'none',
                borderRadius: 20,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(14, 165, 233, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.08)';
              }}
            >
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.15)'
              }}>
                <IconUser size={32} color="#0284c7" />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', letterSpacing: '0.01em' }}>プロフィール</span>
            </button>

            {/* フレンド申請 */}
            <button
              type="button"
              onClick={() => dispatch(openFollowRequestsModal())}
              style={{
                padding: '28px 20px',
                background: '#fff',
                border: 'none',
                borderRadius: 20,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(239, 68, 68, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.08)';
              }}
            >
              {friendRequestCount > 0 && (
                <div style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  minWidth: 26,
                  height: 26,
                  padding: '0 8px',
                  background: '#ef4444',
                  borderRadius: 13,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                  border: '2px solid #fff'
                }}>
                  {friendRequestCount}
                </div>
              )}
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)'
              }}>
                <IconUsers size={32} color="#dc2626" />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', letterSpacing: '0.01em' }}>フレンド申請</span>
            </button>

            {/* スタンプ購入 */}
            <button
              type="button"
              onClick={() => dispatch(navigate('stampShop'))}
              style={{
                padding: '28px 20px',
                background: '#fff',
                border: 'none',
                borderRadius: 20,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(202, 138, 4, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.08)';
              }}
            >
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(202, 138, 4, 0.15)'
              }}>
                <IconStamp size={32} color="#ca8a04" />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', letterSpacing: '0.01em' }}>スタンプ購入</span>
            </button>

            {/* 言語設定 */}
            <button
              type="button"
              onClick={() => dispatch(openLanguageModal())}
              style={{
                padding: '28px 20px',
                background: '#fff',
                border: 'none',
                borderRadius: 20,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.08)';
              }}
            >
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)'
              }}>
                <IconLanguage size={32} color="#7c3aed" />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', textAlign: 'center', lineHeight: 1.3, letterSpacing: '0.01em' }}>
                言語設定
              </span>
            </button>
          </div>
        )}

        {!isAuthenticated && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr',
            gap: 14
          }}>
            {/* 言語設定 */}
            <button
              type="button"
              onClick={() => dispatch(openLanguageModal())}
              style={{
                padding: '22px 24px',
                background: '#fff',
                border: 'none',
                borderRadius: 20,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(124, 58, 237, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.08)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)'
                }}>
                  <IconLanguage size={26} color="#7c3aed" />
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', letterSpacing: '0.01em' }}>言語設定 / Language</span>
              </div>
              <span style={{ color: '#cbd5e1', fontSize: 22 }}>›</span>
            </button>
          </div>
        )}

        {/* ログアウトボタン */}
        {isAuthenticated && (
          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '20px 24px',
              marginTop: 20,
              background: '#fff',
              border: 'none',
              borderRadius: 20,
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(239, 68, 68, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#fef2f2';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(239, 68, 68, 0.1)';
            }}
          >
            <IconLogout size={20} color="#ef4444" />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#ef4444', letterSpacing: '0.01em' }}>ログアウト</span>
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default MyPageScreen;
