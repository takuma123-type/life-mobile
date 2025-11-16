import React from 'react';
import IconBase, { IconProps } from './IconBase';
const IconAvatar: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <circle cx={12} cy={9} r={4} />
    <path d="M4 21c0-4.5 4-6.5 8-6.5s8 2 8 6.5" />
  </IconBase>
);
export default IconAvatar;
