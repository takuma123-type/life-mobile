import React from 'react';

interface UsageHistoryListProps {
  onOrders?: () => void;
  onHiddenOrders?: () => void;
}

const UsageHistoryList: React.FC<UsageHistoryListProps> = ({ onOrders, onHiddenOrders }) => {
  return (
    <section className="mt-8 px-5">
      <h2 className="text-[13px] font-semibold text-slate-500 mb-2 tracking-wide">利用履歴</h2>
      <ul className="rounded-xl overflow-hidden border border-slate-200 bg-white">
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
