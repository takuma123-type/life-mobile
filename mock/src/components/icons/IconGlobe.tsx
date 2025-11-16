import React from 'react';
import IconBase, { IconProps } from './IconBase';
const IconGlobe: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <circle cx={12} cy={12} r={10} />
    <path d="M2 12h20" />
    <path d="M12 2c3 4 3 16 0 20" />
    <path d="M12 2c-3 4-3 16 0 20" />
  </IconBase>
);
export default IconGlobe;
