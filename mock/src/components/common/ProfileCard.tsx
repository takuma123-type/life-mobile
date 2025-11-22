import React from 'react';
import { IconUser } from '../../components/icons';
import { designTokens } from '../../styles/designTokens';
import Button from './Button';

interface ProfileCardProps {
  name?: string | null;
  avatar?: string | null;
  bio?: string | null;
  idLabel?: string; // 表示ID文字列（例: 434918634）
  gameBadge?: string; // 🎮 +5 など
  stats?: { label: string; value: string | number; color?: string }[];
  onEdit?: () => void;
}

// プロフィール詳細カード（表示項目を変更せず UI を改善）
const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  avatar,
  bio,
  idLabel,
  gameBadge,
  stats = [],
  onEdit
}) => {
  const displayName = name || '未設定';
  return (
    <section className="mx-6 mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm px-8 pt-10 pb-8 relative overflow-hidden">
      {/* アバター */}
      <div className="w-28 md:w-32 h-28 md:h-32 rounded-full border-2 border-slate-100 bg-sky-50/60 mx-auto mb-6 overflow-hidden flex items-center justify-center shadow-[0_6px_18px_rgba(14,165,233,0.06)]">
        {avatar ? (
          <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <IconUser size={56} color="#60A5FA" />
          </div>
        )}
      </div>
      {/* 名前 + バッジ */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <h2 className="m-0 text-2xl md:text-[26px] font-extrabold tracking-tight text-slate-800">{displayName}</h2>
        {gameBadge && (
          <span className="text-[12px] font-semibold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200 shadow-sm">{gameBadge}</span>
        )}
      </div>
      {/* ID */}
      {idLabel && (
        <div className="flex items-center justify-center gap-2 text-[13px] text-slate-500 mb-4">
          <span role="img" aria-label="ID">🧾</span>
          <span className="opacity-90">ID: {idLabel}</span>
        </div>
      )}
      {/* Bio */}
      <p className="text-[14px] leading-relaxed text-slate-600 max-w-[520px] mx-auto text-center mb-6">
        {bio || 'デフォルトのプロフィール紹介です。お好みで変更してください～'}
      </p>
      {/* Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-3 gap-6 mb-6">
          {stats.map((s, idx) => (
            <div key={s.label} className="text-center">
              <div className={`text-[24px] md:text-2xl font-extrabold mb-1 ${idx === 2 ? 'text-rose-500' : 'text-sky-500'}`}>{s.value}</div>
              <div className="text-[12px] text-slate-400 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      )}
      {/* 編集ボタン */}
      {onEdit && (
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={onEdit}
          aria-label="プロフィールを編集"
        >
          <span style={{ marginRight: designTokens.spacing.sm }}>✏️</span>
          <span>編集</span>
        </Button>
      )}
    </section>
  );
};

export default ProfileCard;
