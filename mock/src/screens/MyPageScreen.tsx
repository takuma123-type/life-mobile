import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import BottomNav from '../components/common/BottomNav';
import { openProfileModal, navigate, openLanguageModal, setAuthenticated, setRegistered, openLoginModal, openFollowRequestsModal } from '../store/uiSlice';
import { clearSession } from '../utils/session';
import { setMe } from '../store/userSlice';
import { IconUser, IconUsers, IconStamp, IconLanguage, IconLogout } from '../components/icons';
import { IconShield } from '../components/icons';
import { designTokens } from '../styles/designTokens';
import Button from '../components/common/Button';

const MyPageScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const friendRequestCount = useAppSelector((s:any)=> s.user.followRequests?.length || 0);
  const isAuthenticated = useAppSelector((s:any)=> s.ui.isAuthenticated);

  // 退会モーダル状態
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

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

  // 退会（アカウント削除）
  const handleDeleteAccount = () => {
    if (confirmText !== '退会') {
      alert('確認のため「退会」と入力してください。');
      return;
    }
    // 実際の本番ではサーバーに削除リクエストを送る想定
    // ここではローカルの状態をクリアして未ログインに戻す
    dispatch(setMe(null));
    dispatch(setAuthenticated(false));
    dispatch(setRegistered(false));
    clearSession();
    setShowDeleteModal(false);
    setConfirmText('');
    // 最終確認モーダルを表示（リロードはユーザーの選択で実行）
    setShowDeletedModal(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: designTokens.colors.background.secondary, paddingBottom: 96 }}>
      <header style={{ 
        padding: `${designTokens.spacing.xxl} ${designTokens.spacing.lg} ${designTokens.spacing.xl}`, 
        background: designTokens.colors.background.gradient 
      }}>
        <h1 style={{ 
          fontSize: designTokens.typography.h1.fontSize, 
          fontWeight: designTokens.typography.h1.fontWeight as number, 
          letterSpacing: designTokens.typography.h1.letterSpacing, 
          color: designTokens.colors.text.primary, 
          margin: 0 
        }}>マイページ</h1>
      </header>

      {/* メインメニューグリッド */}
      <div style={{ padding: `${designTokens.spacing.lg} ${designTokens.spacing.lg}` }}>
        {!isAuthenticated && (
          <div style={{ marginBottom: designTokens.spacing.lg }}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<IconUser size={22} color="#fff" />}
              onClick={() => dispatch(openLoginModal())}
            >
              新規登録 / ログイン
            </Button>
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

        {/* 退会ボタン */}
        {isAuthenticated && (
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            style={{
              width: '100%',
              padding: '20px 24px',
              marginTop: 12,
              background: '#fff',
              border: 'none',
              borderRadius: 20,
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#fff0f0';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(239, 68, 68, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.08)';
            }}
          >
            <IconShield size={20} color="#ef4444" />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#ef4444', letterSpacing: '0.01em' }}>退会（アカウント削除）</span>
          </button>
        )}
      </div>

      {/* 退会モーダル */}
      {showDeleteModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(6px)', zIndex:1000, display:'flex', alignItems:'flex-end', justifyContent:'center' }} onClick={()=> setShowDeleteModal(false)}>
          <style>{`
            @keyframes slideUpDelete { from { transform: translateY(100%);} to { transform: translateY(0);} }
          `}</style>
          <div style={{ background:'#fff', width:'100%', maxWidth:560, borderRadius:'24px 24px 0 0', border:'1px solid #e5e7eb', animation:'slideUpDelete .3s cubic-bezier(0.16, 1, 0.3, 1)' }} onClick={e=> e.stopPropagation()}>
            <div style={{ padding:'20px 24px', borderBottom:'1px solid #e5e7eb', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <h3 style={{ margin:0, fontSize:18, fontWeight:800, color:'#0f172a' }}>退会の確認</h3>
              <button onClick={()=> setShowDeleteModal(false)} style={{ background:'rgba(15,23,42,0.06)', border:'none', width:36, height:36, borderRadius:'50%', cursor:'pointer' }}>×</button>
            </div>

            <div style={{ padding:'20px 24px' }}>
              <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:'16px 14px', marginBottom:16 }}>
                <ul style={{ margin:0, paddingLeft:18, color:'#334155', fontSize:14, lineHeight:1.6 }}>
                  <li>退会すると、プロフィール・フレンド・コミュニティ参加履歴などのデータが削除されます。</li>
                  <li>購入済みスタンプなどのコンテンツは復元できません。</li>
                  <li>退会後は同じアカウントを復活できません。新規登録が必要です。</li>
                  <li>法令等にもとづき一定期間、ログ等が保持されることがあります。</li>
                </ul>
              </div>
              <div style={{ fontSize:13, color:'#64748b', marginBottom:8 }}>確認のため「退会」と入力してください。</div>
              <input
                value={confirmText}
                onChange={(e)=> setConfirmText(e.target.value)}
                placeholder="退会"
                style={{ width:'100%', padding:'12px 14px', border:'1px solid #e5e7eb', borderRadius:8, outline:'none', marginBottom:16 }}
              />
              <div style={{ display:'flex', gap:12 }}>
                <button onClick={()=> setShowDeleteModal(false)} style={{ flex:1, padding:'12px 16px', background:'#f8fafc', border:'1px solid #e5e7eb', borderRadius:8, cursor:'pointer' }}>キャンセル</button>
                <button onClick={()=> setShowConfirmDeleteModal(true)} style={{ flex:1, padding:'12px 16px', background:'#ef4444', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontWeight:700 }}>退会する</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 本当に退会してもよろしいですか？モーダル */}
      {showConfirmDeleteModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(6px)', zIndex:1002, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ background:'#fff', width:'92%', maxWidth:420, borderRadius:16, border:'1px solid #e5e7eb', boxShadow:'0 12px 32px rgba(0,0,0,0.12)', overflow:'hidden' }}>
            <div style={{ padding:'18px 20px', borderBottom:'1px solid #e5e7eb' }}>
              <h3 style={{ margin:0, fontSize:18, fontWeight:800, color:'#0f172a' }}>本当に退会してもよろしいですか？</h3>
            </div>
            <div style={{ padding:'18px 20px' }}>
              <p style={{ margin:'0 0 12px', fontSize:14, color:'#334155', lineHeight:1.7 }}>
                この操作は元に戻せません。アカウントのデータは削除され、復元できません。
              </p>
              <div style={{ display:'flex', gap:12 }}>
                <button onClick={()=> setShowConfirmDeleteModal(false)} style={{ flex:1, padding:'12px 16px', background:'#f8fafc', border:'1px solid #e5e7eb', borderRadius:8, cursor:'pointer' }}>戻る</button>
                <button onClick={()=> { setShowConfirmDeleteModal(false); handleDeleteAccount(); }} style={{ flex:1, padding:'12px 16px', background:'#ef4444', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontWeight:700 }}>はい、退会します</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 最終モーダル（退会完了） */}
      {showDeletedModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(6px)', zIndex:1001, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ background:'#fff', width:'92%', maxWidth:420, borderRadius:16, border:'1px solid #e5e7eb', boxShadow:'0 12px 32px rgba(0,0,0,0.12)', overflow:'hidden' }}>
            <div style={{ padding:'18px 20px', borderBottom:'1px solid #e5e7eb' }}>
              <h3 style={{ margin:0, fontSize:18, fontWeight:800, color:'#0f172a' }}>退会が完了しました</h3>
            </div>
            <div style={{ padding:'18px 20px' }}>
              <p style={{ margin:'0 0 12px', fontSize:14, color:'#334155', lineHeight:1.7 }}>
                ご利用ありがとうございました。必要に応じて、再度ご登録いただけます。
              </p>
              <ul style={{ margin:0, paddingLeft:18, color:'#64748b', fontSize:13, lineHeight:1.6 }}>
                <li>保持されるログがある場合でも、個人情報保護方針に基づき適切に取り扱います。</li>
                <li>フィードバックがあれば、ヘッダーの言語設定からお問い合わせください。</li>
              </ul>
              <div style={{ display:'flex', gap:12, marginTop:16 }}>
                <button onClick={()=> { setShowDeletedModal(false); }} style={{ flex:1, padding:'12px 16px', background:'#f8fafc', border:'1px solid #e5e7eb', borderRadius:8, cursor:'pointer' }}>閉じる</button>
                <button onClick={()=> { setShowDeletedModal(false); setTimeout(()=> window.location.reload(), 50); }} style={{ flex:1, padding:'12px 16px', background:'#0EA5E9', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontWeight:700 }}>トップへ</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default MyPageScreen;
