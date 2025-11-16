import React from 'react';
import IconBase, { IconProps } from './IconBase';
const IconShield: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />
  </IconBase>
);
export default IconShield;
