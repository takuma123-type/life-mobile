import React from 'react';
import ChatRoomScreen from '../src/screens/ChatRoomScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ChatRoomRoute() {
  const params = useLocalSearchParams<{ name?: string; status?: string; dateLabel?: string }>();
  return <ChatRoomScreen name={params.name} status={params.status} dateLabel={params.dateLabel} />;
}
