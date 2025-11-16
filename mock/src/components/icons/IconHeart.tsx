import React from 'react';
import IconBase, { IconProps } from './IconBase';
const IconHeart: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M12 20s-6-4.35-8-8.5C2 8 3 5 6 4s4 1 6 3c2-2 3-4 6-3s4 4 2 7.5C18 15.65 12 20 12 20z" />
  </IconBase>
);
export default IconHeart;
