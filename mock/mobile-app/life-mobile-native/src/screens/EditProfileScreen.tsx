import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

type ItemKey =
  | 'icon'
  | 'username'
  | 'ageRange'
  | 'location'
  | 'activeTime'
  | 'bio'
  | 'gallery';

const items: { key: ItemKey; label: string }[] = [
  { key: 'icon', label: 'ユーザーアイコン' },
  { key: 'username', label: 'ユーザー名' },
  { key: 'ageRange', label: '年代' },
  { key: 'location', label: '居住地' },
  { key: 'activeTime', label: 'よく使う時間帯' },
  { key: 'bio', label: '自己紹介' },
  { key: 'gallery', label: 'ギャラリー' },
];

export default function EditProfileScreen() {
  const [values] = useState<Record<ItemKey, string>>({
    icon: '未設定',
    username: '未設定',
    ageRange: '未設定',
    location: '未設定',
    activeTime: '未設定',
    bio: '未設定',
    gallery: '未設定',
  });

  const onSave = () => {
    // TODO: persist to store/backend; for now just go back
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F7FAFC' }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#0F172A' }}>プロフィールを編集</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ backgroundColor: '#FFFFFF' }}>
          {items.map((item, idx) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => {}}
              activeOpacity={0.7}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 18,
                borderTopWidth: idx === 0 ? 0 : 1,
                borderColor: '#E5E7EB',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 16, color: '#0F172A' }}>{item.label}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15, color: '#94A3B8', marginRight: 8 }}>{values[item.key]}</Text>
                <Text style={{ fontSize: 18, color: '#CBD5E1' }}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          <Text style={{ fontSize: 12, color: '#94A3B8' }}>※内容はあとから変更可能です</Text>
        </View>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F7FAFC',
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 }}
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: 16, color: '#334155' }}>戻る</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSave}
          style={{
            paddingVertical: 14,
            paddingHorizontal: 28,
            borderRadius: 14,
            backgroundColor: '#1D4ED8',
            shadowColor: '#1D4ED8',
            shadowOpacity: 0.3,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 6 },
          }}
          activeOpacity={0.9}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>保存</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
