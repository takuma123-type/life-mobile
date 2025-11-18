import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setMe, addUser } from '../store/userSlice';
import { setRegistered, navigate, setAuthenticated } from '../store/uiSlice';

const ProfileRegistrationScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const smsPhone = useAppSelector((s:any) => s.ui.smsPhone);
  
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [region, setRegion] = useState('');
  const [activeTime, setActiveTime] = useState('');
  const [bio, setBio] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);

  const profileItems = [
    { label: 'ユーザーアイコン', value: avatar ? '設定済み' : '', key: 'avatar', type: 'image' },
    { label: 'ユーザー名', value: name, key: 'name', type: 'text' },
    { label: '年代', value: age, key: 'age', type: 'select' },
    { label: '居住地', value: region, key: 'region', type: 'select' },
    { label: 'よく使う時間帯', value: activeTime, key: 'activeTime', type: 'select' },
    { label: '自己紹介', value: bio, key: 'bio', type: 'textarea' },
    { label: 'ギャラリー', value: gallery.length > 0 ? `${gallery.length}枚` : '', key: 'gallery', type: 'gallery' },
  ];

  const handleItemClick = (key: string) => {
    alert(`${key}の設定画面を開きます`);
  };

  const complete = () => {
    const me = { 
      id: 'me', 
      name: name || '未設定', 
      bio: bio || '', 
      avatar: avatar || '', 
      region: region || '未設定', 
      age: age || '未設定', 
      activeTime: activeTime || '未設定',
      gallery: gallery,
      phone: smsPhone,
      password: 'demo'
    };
    
    dispatch(setMe(me));
    dispatch(addUser(me));
    dispatch(setRegistered(true));
    dispatch(setAuthenticated(true));
    dispatch(navigate('chat'));
  };

  return (
    <div style={{ background: '#f8f8f8', minHeight: '100vh', paddingBottom: 100 }}>
      <div style={{ background: '#fff', padding: '60px 20px 20px', borderBottom: '1px solid #f0f0f0' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, textAlign: 'center', color: '#333' }}>
          あなたのプロフィールを教えて下さい
        </h1>
      </div>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0' }}>
        <div style={{ background: '#fff' }}>
          {profileItems.map((item, index) => (
            <div
              key={item.key}
              onClick={() => handleItemClick(item.key)}
              style={{
                padding: '20px',
                borderBottom: index < profileItems.length - 1 ? '1px solid #f0f0f0' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'background .2s ease'
              }}
              onMouseOver={e => (e.currentTarget.style.background = '#f8f8f8')}
              onMouseOut={e => (e.currentTarget.style.background = '#fff')}
            >
              <span style={{ fontSize: 16, color: '#333', fontWeight: 500 }}>{item.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16, color: '#999' }}>{item.value || '未設定'}</span>
                <span style={{ fontSize: 20, color: '#ccc' }}>›</span>
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: '20px', fontSize: 13, color: '#999', textAlign: 'center', lineHeight: 1.6 }}>
          ※内容はあとから変更可能です
        </p>
        <div style={{ padding: '0 20px' }}>
          <button
            onClick={complete}
            style={{
              width: '100%',
              padding: '18px',
              background: '#ddd',
              color: '#999',
              border: 'none',
              borderRadius: 12,
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .2s ease'
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#ccc'; }}
            onMouseOut={e => { e.currentTarget.style.background = '#ddd'; }}
          >
            保存して次へ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileRegistrationScreen;
