import React from 'react';
import WalletCard from './WalletCard';
import { IconShield, IconHeart, IconStamp, IconStore, IconUsers } from '../../components/icons';

interface WalletSectionProps {
  onOpenSecurity?: () => void;
  onOpenStamp?: () => void;
}

const WalletSection: React.FC<WalletSectionProps> = ({ onOpenSecurity, onOpenStamp }) => {
  return (
    <section className="px-5 mt-6">
      <h2 className="text-sm font-semibold text-slate-600 mb-3 tracking-wide">マイウォレット</h2>
      <div className="grid grid-cols-2 gap-3">
        <WalletCard
          full
          title="PayPay （残高)"
          rightText="未設定"
          icon={<IconShield size={20} color="#0EA5E9" />}
          onClick={onOpenSecurity}
        />
        <WalletCard
          title="PayPayカード"
          subText="新規申し込みをする"
          icon={<IconShield size={18} color="#334155" />}
        />
        <WalletCard
          title="クーポン"
          rightText="11枚"
          icon={<IconStore size={18} color="#334155" />}
          badge="失効間近"
        />
        <WalletCard
          title="商品券"
          rightText="1,510円分"
          icon={<IconHeart size={18} color="#334155" />}
        />
        <WalletCard
          title="VIPスタンプ"
          rightText="0 / 0ストア"
          icon={<IconStamp size={18} color="#334155" />}
          onClick={onOpenStamp}
        />
        <WalletCard
          title="LYPマイレージ"
          subText="達成状況を確認する"
          icon={<IconUsers size={18} color="#334155" />}
        />
      </div>
    </section>
  );
};

export default WalletSection;
