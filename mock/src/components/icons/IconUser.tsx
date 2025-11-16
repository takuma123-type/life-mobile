import React from 'react';
import IconBase, { IconProps } from './IconBase';
const IconUser: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <circle cx={12} cy={8} r={4} />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </IconBase>
);
export default IconUser;
