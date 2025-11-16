import React from 'react';
import IconBase, { IconProps } from './IconBase';
const IconBack: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M15 18l-6-6 6-6" />
  </IconBase>
);
export default IconBack;
