import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import BottomNav from '../components/common/BottomNav';
import { openProfileModal, navigate, openLanguageModal, setAuthenticated, setRegistered } from '../store/uiSlice';
import { setMe } from '../store/userSlice';

const MyPageScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const friendRequestCount = useAppSelector((s:any)=> s.user.followRequests?.length || 0);
  const isAuthenticated = useAppSelector((s:any)=> s.ui.isAuthenticated);

  const handleLogout = () => {
    if (window.confirm('ログアウトしますか？')) {
      dispatch(setMe(null));
      dispatch(setAuthenticated(false));
      dispatch(setRegistered(false));
      dispatch(navigate('login'));
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="px-6 pt-10 pb-6">
        <h1 className="text-[30px] font-bold tracking-wide text-slate-900">マイページ</h1>
      </header>
      <nav aria-label="マイページメニュー" className="mt-2">
        <ul className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {isAuthenticated && (
            <li>
              <button
                type="button"
                onClick={() => dispatch(openProfileModal())}
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none focus:bg-slate-50"
                aria-label="プロフィール"
              >
                <span className="text-[16px] font-medium text-slate-800">プロフィール</span>
                <span aria-hidden className="text-slate-400 text-xl">›</span>
              </button>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <button
                type="button"
                onClick={() => dispatch(navigate('followRequests'))}
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none focus:bg-slate-50"
                aria-label="フレンド申請"
              >
                <span className="text-[16px] font-medium text-slate-800">フレンド申請{friendRequestCount>0 && <span className="ml-2 text-[12px] font-semibold text-rose-500">({friendRequestCount})</span>}</span>
                <span aria-hidden className="text-slate-400 text-xl">›</span>
              </button>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <button
                type="button"
                onClick={() => dispatch(navigate('stampShop'))}
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none focus:bg-slate-50"
                aria-label="スタンプ購入"
              >
                <span className="text-[16px] font-medium text-slate-800">スタンプ購入</span>
                <span aria-hidden className="text-slate-400 text-xl">›</span>
              </button>
            </li>
          )}
          <li>
            <button
              type="button"
              onClick={() => dispatch(openLanguageModal())}
              className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none focus:bg-slate-50"
              aria-label="言語設定"
            >
              <span className="text-[16px] font-medium text-slate-800">言語設定</span>
              <span aria-hidden className="text-slate-400 text-xl">›</span>
            </button>
          </li>
          {isAuthenticated && (
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none focus:bg-rose-50"
                aria-label="ログアウト"
              >
                <span className="text-[16px] font-medium text-rose-600">ログアウト</span>
                <span aria-hidden className="text-rose-400 text-xl">›</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
      <BottomNav />
    </div>
  );
};

export default MyPageScreen;
