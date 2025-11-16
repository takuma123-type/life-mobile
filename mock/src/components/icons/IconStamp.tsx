import React from 'react';
import IconBase, { IconProps } from './IconBase';
const IconStamp: React.FC<IconProps & { filled?: boolean }> = ({ filled=false, ...props }) => (
  <IconBase {...props}>
    <rect x={5} y={5} width={14} height={14} rx={3} fill={filled? 'currentColor':'none'} />
    <path d="M9 9h6v6H9z" />
  </IconBase>
);
export default IconStamp;
