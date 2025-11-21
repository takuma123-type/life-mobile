import React from 'react';
import { IconUser } from '../../components/icons';

interface ProfileRowProps {
  name?: string | null;
  avatar?: string | null;
  onClick?: () => void;
}

// プロフィール行（アバター + 名前 + 矢印）
const ProfileRow: React.FC<ProfileRowProps> = ({ name, avatar, onClick }) => {
  const displayName = name || '未設定';
  return (
    <button
      type="button"
      aria-label="プロフィールを開く"
      onClick={onClick}
      className="w-full flex items-center gap-4 px-5 py-4 bg-white rounded-xl shadow-sm border border-slate-200 text-left focus:outline-none focus:ring-2 focus:ring-sky-400 transition hover:bg-slate-50"
    >
      <div className="w-16 h-16 rounded-full border border-slate-200 bg-slate-100 overflow-hidden flex items-center justify-center">
        {avatar ? (
          <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
        ) : (
          <IconUser size={40} color="#94A3B8" />
        )}
      </div>
      <div className="flex-1 flex items-center">
        <span className="text-[17px] font-medium tracking-wide text-slate-700">{displayName} さん</span>
      </div>
      <span aria-hidden className="text-slate-400 text-xl leading-none">›</span>
    </button>
  );
};

export default ProfileRow;
