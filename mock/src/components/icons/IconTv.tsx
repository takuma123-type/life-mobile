import React from 'react';
import IconBase, { IconProps } from './IconBase';

export const IconTv: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    <polyline points="17 2 12 7 7 2" />
  </IconBase>
);
