import React from 'react';
import IconBase, { IconProps } from './IconBase';
const IconX: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M6 6l12 12M6 18L18 6" />
  </IconBase>
);
export default IconX;
