import React from 'react';
import CommunityChatScreen from '../src/screens/CommunityChatScreen';
import { useLocalSearchParams } from 'expo-router';

export default function CommunityChatRoute() {
  const params = useLocalSearchParams<{ name?: string; members?: string; dateLabel?: string }>();
  const members = params.members ? parseInt(params.members as string, 10) : undefined;
  return <CommunityChatScreen name={params.name} members={members} dateLabel={params.dateLabel} />;
}
