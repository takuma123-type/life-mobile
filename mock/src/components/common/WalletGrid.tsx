import React from 'react';
import WalletTile from './WalletTile';

interface WalletGridProps {
  onStamp?: () => void;
}

// ウォレットセクション (表示データは固定)
const WalletGrid: React.FC<WalletGridProps> = ({ onStamp }) => {
  return (
    <section className="mt-6 px-5">
      <h2 className="text-[13px] font-semibold text-slate-500 mb-3 tracking-wide">マイウォレット</h2>
      <div className="grid grid-cols-2 gap-3">
        <WalletTile columns={2} title="PayPay （残高)" rightText="未設定" subText="明細を確認する" />
        <WalletTile title="PayPayカード" subText="新規申し込みをする" />
        <WalletTile title="クーポン" badge="失効間近" lengthText="11 枚" />
        <WalletTile title="商品券" rightText="1,510円分" />
        <WalletTile title="VIPスタンプ" rightText="0 / 0ストア" onClick={onStamp} />
        <WalletTile title="LYPマイレージ" subText="達成状況を確認する" />
      </div>
    </section>
  );
};

export default WalletGrid;
