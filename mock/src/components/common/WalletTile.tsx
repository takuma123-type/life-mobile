import React from 'react';
import { designTokens } from '../../styles/designTokens';

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
      style={{
        position: 'relative',
        textAlign: 'left',
        background: designTokens.colors.background.primary,
        borderRadius: designTokens.radius.xl,
        border: `1px solid ${designTokens.colors.border.medium}`,
        boxShadow: designTokens.shadow.xs,
        transition: designTokens.transition.base,
        cursor: 'pointer',
        ...(columns === 2 ? {
          gridColumn: 'span 2',
          padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
          display: 'flex',
          alignItems: 'center'
        } : {
          padding: designTokens.spacing.md,
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'space-between',
          minHeight: '112px'
        })
      }}
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
