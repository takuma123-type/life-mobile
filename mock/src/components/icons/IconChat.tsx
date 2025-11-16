import React from 'react';
import IconBase, { IconProps } from './IconBase';
const IconChat: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M5 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
  </IconBase>
);
export default IconChat;
