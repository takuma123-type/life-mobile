import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface SearchIconProps {
  size?: number;
  color?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({ size = 24, color = '#000' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={11} cy={11} r={8} />
      <Path d="M21 21l-4.35-4.35" />
    </Svg>
  );
};

export default SearchIcon;
