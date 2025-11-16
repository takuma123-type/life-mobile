import React from 'react';

export interface IconProps { size?: number; color?: string; className?: string; strokeWidth?: number; }

const IconBase: React.FC<React.PropsWithChildren<IconProps>> = ({ size=24, color='currentColor', strokeWidth=1.8, className, children }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
};
export default IconBase;
