import React from 'react';
import IconBase, { IconProps } from './IconBase';
const IconStore: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M3 10h18l-2 10H5L3 10z" />
    <path d="M4 6h16l1 4H3l1-4z" />
    <path d="M10 14h4" />
  </IconBase>
);
export default IconStore;
