import React from 'react';
import { designTokens } from '../../styles/designTokens';

interface HistoryItemProps {
  title: string;
  icon: React.ReactNode;
  badge?: string | number;
  onClick?: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ title, icon, badge, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: designTokens.spacing.md,
        padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
        background: designTokens.colors.background.primary,
        textAlign: 'left',
        borderBottom: `1px solid ${designTokens.colors.border.medium}`,
        transition: designTokens.transition.base,
        cursor: 'pointer',
        border: 'none'
      }}
      onMouseOver={e => e.currentTarget.style.background = designTokens.colors.background.secondary}
      onMouseOut={e => e.currentTarget.style.background = designTokens.colors.background.primary}
      aria-label={title}
    >
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 border border-slate-200">
        {icon}
      </div>
      <span className="text-[15px] font-medium text-slate-700 flex-1">{title}</span>
      {badge !== undefined && badge !== null && (
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 mr-2">
          {badge}
        </span>
      )}
      <span aria-hidden className="text-slate-300 text-lg">›</span>
    </button>
  );
};

export default HistoryItem;
