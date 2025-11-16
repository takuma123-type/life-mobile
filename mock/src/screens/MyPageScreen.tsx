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
    <div style={{ paddingBottom:80, background:'var(--color-bg)' }}>
      <div className='profile-header-card'>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
          <div className='profile-avatar' style={{ marginRight:0, marginBottom:16 }}>
            {me?.avatar ? <img src={me.avatar} alt={me.name} style={{ width:'100%', height:'100%', borderRadius:'50%', objectFit:'cover' }} /> : <IconAvatar size={54} color='#999' />}
          </div>
          <h3 style={{ margin:'0 0 20px' }}>{me?.name || 'ゲストユーザー'}</h3>
          <button 
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
              border: 'none',
              color: '#fff',
              width: '100%',
              padding: '12px 16px',
              borderRadius: 10,
              fontSize: 14,
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all .2s ease',
              boxShadow: 'var(--shadow-primary)'
            }}
            onClick={()=>dispatch(me ? openProfileModal() : openGuestProfileModal())}
            onMouseOver={e => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-primary-lg)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-primary)';
            }}
          >
            タップしてプロフィールを見る
          </button>
        </div>
      </div>

      <div className='settings-list'>
        {!isAuthenticated ? (
          <>
            <div className='settings-item' onClick={handleSignUpLogin} style={{ cursor:'pointer' }}>
              <span className='settings-icon'><IconUser size={22} /></span>
              <span className='settings-label'>新規登録 / ログイン</span>
            </div>
          </>
        ) : (
          <>
            <div className='settings-item' onClick={()=>dispatch(openSmsModal())} style={{ cursor:'pointer' }}>
              <span className='settings-icon'><IconShield size={22} /></span>
              <span className='settings-label'>SMS本人確認</span>
              <span className={`badge ${verified? 'badge-neutral':'badge-danger'}`}>{verified? '確認済':'未認証'}</span>
            </div>
            <div className='settings-item' onClick={()=>dispatch(navigate('followRequests'))} style={{ cursor:'pointer' }}>
              <span className='settings-icon'><IconUsers size={22} /></span>
              <span className='settings-label'>フレンド申請</span>
              {friendRequestCount>0 && <span className='badge badge-danger'>{friendRequestCount}</span>}
            </div>
            <div className='settings-item' onClick={()=>dispatch(navigate('stampShop'))} style={{ cursor:'pointer' }}>
              <span className='settings-icon'><IconHeart size={22} /></span>
              <span className='settings-label'>スタンプ購入</span>
            </div>
          </>
        )}
        <div className='settings-item' onClick={()=>dispatch(openLanguageModal())} style={{ cursor:'pointer' }}>
          <span className='settings-icon'><IconLanguage size={22} /></span>
          <span className='settings-label'>言語設定</span>
        </div>
        {isAuthenticated && (
          <div className='settings-item settings-item-logout' onClick={handleLogout} style={{ cursor:'pointer' }}>
            <span className='settings-icon'><IconLogout size={22} /></span>
            <span className='settings-label'>ログアウト</span>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};
export default MyPageScreen;
