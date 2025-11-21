import React from 'react';

interface WalletTileProps {
  title: string;
  subText?: string; // 下段テキスト or 説明
  rightText?: string; // 右側値 or 状態
  badge?: string; // 失効間近など
  lengthText?: string; // 枚数など（例: 11 枚）
  columns?: number; // 占有列数 (1 or 2)
  onClick?: () => void;
}

// スクリーンショットのウォレットカードに近いフラットスタイル
const WalletTile: React.FC<WalletTileProps> = ({ title, subText, rightText, badge, lengthText, columns = 1, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      className={[
        'group relative text-left bg-white rounded-xl',
        'border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
        'focus:outline-none focus:ring-2 focus:ring-sky-400 transition',
        columns === 2 ? 'col-span-2 px-5 py-4 flex items-center' : 'p-4 flex flex-col justify-between min-h-[112px]'
      ].join(' ')}
    >
      {/* Top row */}
      <div className={columns === 2 ? 'flex items-center justify-between w-full gap-3' : 'mb-2'}>
        <p className="text-[15px] font-medium text-slate-700 tracking-wide leading-tight">{title}</p>
        {rightText && columns === 2 && (
          <span className="text-[13px] text-slate-500 font-medium">{rightText}</span>
        )}
      </div>
      {/* Content for single column tiles */}
      {columns === 1 && (
        <div className="mt-auto flex flex-col gap-1">
          {subText && (
            <p className="text-xs text-slate-500 leading-tight">{subText}</p>
          )}
          <div className="flex items-end justify-between w-full">
            {badge && (
              <span className="inline-flex items-center text-[11px] font-semibold px-2 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200">{badge}</span>
            )}
            {lengthText && (
              <span className="text-sm font-semibold text-slate-700 ml-auto">{lengthText}</span>
            )}
            {rightText && !lengthText && (
              <span className="text-sm font-semibold text-slate-700 ml-auto">{rightText}</span>
            )}
          </div>
        </div>
      )}
      {columns === 2 && (
        <div className="flex flex-col items-end ml-auto">
          {lengthText && <span className="text-sm font-semibold text-slate-700">{lengthText}</span>}
          {subText && <span className="text-xs text-slate-500 mt-1">{subText}</span>}
        </div>
      )}
    </button>
  );
};

export default WalletTile;
