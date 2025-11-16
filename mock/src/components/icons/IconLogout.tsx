import React from 'react';
import IconBase, { IconProps } from './IconBase';
const IconLogout: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </IconBase>
);
export default IconLogout;
