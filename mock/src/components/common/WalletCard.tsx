import React from 'react';
import { designTokens } from '../../styles/designTokens';

interface WalletCardProps {
  title: string;
  subText?: string;
  rightText?: string;
  icon?: React.ReactNode;
  badge?: string;
  onClick?: () => void;
  full?: boolean; // 最初の横長カードかどうか
}

const WalletCard: React.FC<WalletCardProps> = ({ title, subText, rightText, icon, badge, onClick, full }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: 'relative',
        textAlign: 'left',
        background: designTokens.colors.background.primary,
        borderRadius: designTokens.radius.xl,
        border: `1px solid ${designTokens.colors.border.medium}`,
        boxShadow: designTokens.shadow.sm,
        transition: designTokens.transition.base,
        cursor: 'pointer',
        ...(full ? {
          gridColumn: 'span 2',
          padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
          display: 'flex',
          alignItems: 'center'
        } : {
          padding: designTokens.spacing.md,
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'space-between',
          minHeight: '104px'
        })
      }}
      aria-label={title}
    >
      <div className={full ? 'flex items-center gap-4 flex-1' : 'flex items-center gap-3 mb-2'}>
        {icon && (
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 border border-slate-200">
            {icon}
          </div>
        )}
        <div className={full ? 'flex-1 flex items-center justify-between' : 'flex-1'}>
          <div>
            <p className="text-[15px] font-medium text-slate-700 leading-tight">{title}</p>
            {subText && !full && (
              <p className="text-xs text-slate-500 mt-1 leading-tight">{subText}</p>
            )}
          </div>
          {full && (
            <div className="flex flex-col items-end">
              {rightText && <span className="text-sm text-slate-500">{rightText}</span>}
              <span className="text-xs text-sky-600 mt-1">明細を確認する</span>
            </div>
          )}
        </div>
      </div>
      {!full && (
        <div className="flex items-end justify-between w-full mt-auto">
          {badge && (
            <span className="inline-flex items-center text-[11px] font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {badge}
            </span>
          )}
          {rightText && (
            <span className="text-sm font-medium text-slate-700 ml-auto">{rightText}</span>
          )}
        </div>
      )}
      {!full && (
        <span aria-hidden className="absolute right-3 top-3 text-slate-300 text-lg">›</span>
      )}
    </button>
  );
};

export default WalletCard;
