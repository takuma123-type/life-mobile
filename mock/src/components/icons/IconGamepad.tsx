import React from 'react';
import IconBase, { IconProps } from './IconBase';

export const IconGamepad: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" />
    <line x1="18" y1="11" x2="18.01" y2="11" />
    <rect x="2" y="7" width="20" height="10" rx="3" />
  </IconBase>
);
