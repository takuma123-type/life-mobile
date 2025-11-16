import React from 'react';
import IconBase, { IconProps } from './IconBase';
const IconUsers: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <circle cx={9} cy={8} r={3} />
    <circle cx={15} cy={8} r={3} />
    <path d="M4 19c0-3 3-5 5-5h2c2 0 5 2 5 5" />
    <path d="M14 14c2 0 5 2 5 5" />
  </IconBase>
);
export default IconUsers;
