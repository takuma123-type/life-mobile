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
    <div className="min-h-screen pb-20 bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center gap-3 border-b border-slate-200 bg-white px-5 py-3 shadow-sm">
        <button
          onClick={() => dispatch(navigate('mypage'))}
          aria-label="戻る"
          className="inline-flex items-center rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <IconBack size={24} />
        </button>
        <h1 className="m-0 text-[18px] font-semibold tracking-wide text-slate-900">フレンド申請</h1>
        <div className="ml-auto" />
      </div>

      <div className="px-5 py-5">
        <div className="mb-5 flex items-center justify-between">
          <p className="m-0 text-sm font-medium text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
              {requests.length}件の申請
            </span>
          </p>
        </div>

        {requests.map((req) => (
          <div
            key={req.id}
            className="group mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] transition hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.1)]"
          >
            <div className="mb-5 flex items-center gap-4">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-slate-200 bg-slate-50">
                {req.avatar ? (
                  <img src={req.avatar} alt={req.name} className="h-full w-full object-cover" />
                ) : (
                  <IconAvatar size={32} color="#94a3b8" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-[16px] font-semibold text-slate-900">{req.name}</span>
                  {req.age && (
                    <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-700 ring-1 ring-inset ring-sky-100">
                      {req.age}
                    </span>
                  )}
                </div>
                <p className="m-0 text-[14px] leading-relaxed text-slate-600 break-words">{req.message}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleAccept(req)}
                className="flex-1 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3 text-[15px] font-semibold text-white shadow-sm transition active:scale-[0.97] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                承認
              </button>
              <button
                onClick={() => handleReject(req)}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] font-semibold text-slate-800 transition active:scale-[0.97] hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
              >
                拒否
              </button>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-16 text-center">
            <p className="m-0 text-sm text-slate-500">フレンド申請はありません</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-5 animate-fade"
          onClick={() => setConfirmModal(null)}
        >
          <div
            className="w-full max-w-[420px] rounded-2xl bg-white px-8 py-10 shadow-2xl ring-1 ring-black/10 animate-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-3 text-center text-[20px] font-bold text-slate-900">
              フレンド申請の{confirmModal.type === 'accept' ? '承認' : '拒否'}
            </h2>
            <p className="mb-8 text-center text-[15px] leading-relaxed text-slate-600">
              {confirmModal.request.name}さんのフレンド申請を<br />
              {confirmModal.type === 'accept' ? '承認' : '拒否'}してもよろしいですか?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-5 py-4 text-[15px] font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 active:scale-[0.97]"
              >
                キャンセル
              </button>
              <button
                onClick={confirmAction}
                className={
                  `flex-1 rounded-xl px-5 py-4 text-[15px] font-semibold text-white shadow-sm transition active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-2 ` +
                  (confirmModal.type === 'reject'
                    ? 'bg-rose-500 hover:bg-rose-600 focus:ring-rose-400'
                    : 'bg-slate-900 hover:bg-slate-800 focus:ring-slate-500')
                }
              >
                {confirmModal.type === 'accept' ? '承認する' : '拒否する'}
              </button>
            </div>
          </div>
          <style>{`
            @keyframes fade {from{opacity:0}to{opacity:1}}
            @keyframes scale {from{transform:scale(.95);opacity:0}to{transform:scale(1);opacity:1}}
            .animate-fade{animation:fade .25s ease}
            .animate-scale{animation:scale .35s cubic-bezier(.34,1.56,.64,1)}
          `}</style>
        </div>
      )}
    </div>
  );
};
export default FollowRequestsScreen;
