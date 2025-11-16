export interface UserProfile {
  id: string;
  name: string;
  age?: string;
  region?: string;
  city?: string;
  message?: string;
  bio?: string;
  avatar?: string;
  verified?: boolean;
  online?: boolean;
  country?: string;
  activeTime?: string;
}

export interface Community {
  id: string;
  name: string;
  category?: string;
  members?: number;
  posts?: number;
  desc?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | string; // user id
  message: string;
  time: string;
}

export type ScreenKey = 'login' | 'chat' | 'chatDetail' | 'groupChat' | 'communityDetail' | 'mypage' | 'followRequests' | 'editProfile' | 'stampShop' | 'profileRegistration';
