import React from 'react';
import { designTokens } from '../../styles/designTokens';

interface UsageHistoryListProps {
  onOrders?: () => void;
  onHiddenOrders?: () => void;
}

const UsageHistoryList: React.FC<UsageHistoryListProps> = ({ onOrders, onHiddenOrders }) => {
  return (
    <section style={{ marginTop: designTokens.spacing.xxl, padding: `0 ${designTokens.spacing.lg}` }}>
      <h2 style={{ fontSize: designTokens.typography.body.fontSize, fontWeight: 600, color: designTokens.colors.text.tertiary, marginBottom: designTokens.spacing.sm, letterSpacing: '0.5px' }}>利用履歴</h2>
      <ul style={{ borderRadius: designTokens.radius.xl, overflow: 'hidden', border: `1px solid ${designTokens.colors.border.medium}`, background: designTokens.colors.background.primary, listStyle: 'none', margin: 0, padding: 0 }}>
        <li>
          <button
            type="button"
            onClick={onOrders}
            className="w-full flex items-center gap-4 px-5 py-4 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-400 transition text-left"
            aria-label="注文履歴"
          >
            <span className="text-[15px] font-medium text-slate-800 flex-1">注文履歴</span>
            <span className="text-slate-300 text-xl" aria-hidden>›</span>
          </button>
        </li>
        <li className="border-t border-slate-200">
          <button
            type="button"
            onClick={onHiddenOrders}
            className="w-full flex items-center gap-4 px-5 py-4 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-400 transition text-left"
            aria-label="非表示にした注文履歴"
          >
            <span className="text-[15px] font-medium text-slate-800 flex-1">非表示にした注文履歴</span>
            <span className="text-slate-300 text-xl" aria-hidden>›</span>
          </button>
        </li>
      </ul>
    </section>
  );
};

export default UsageHistoryList;
