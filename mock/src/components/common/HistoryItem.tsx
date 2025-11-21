import React from 'react';

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
      className="w-full flex items-center gap-4 py-3 px-5 bg-white text-left border-b border-slate-200 last:border-b-0 focus:outline-none focus:ring-2 focus:ring-sky-400 hover:bg-slate-50 transition"
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
