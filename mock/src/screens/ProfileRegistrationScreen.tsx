import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setMe, addUser } from '../store/userSlice';
import { setRegistered, navigate, setAuthenticated } from '../store/uiSlice';
import { IconX, IconUser, IconCalendar, IconMapPin, IconClock, IconFileText } from '../components/icons';

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

  // モーダル表示状態
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'name' | 'age' | 'region' | 'activeTime' | 'bio' | 'avatar' | 'gallery' | null>(null);

  const profileItems = [
    { label: 'ユーザーアイコン', value: avatar ? '設定済み' : '', key: 'avatar', icon: IconUser },
    { label: 'ユーザー名', value: name, key: 'name', icon: IconUser },
    { label: '年代', value: age, key: 'age', icon: IconCalendar },
    { label: '居住地', value: region, key: 'region', icon: IconMapPin },
    { label: 'よく使う時間帯', value: activeTime, key: 'activeTime', icon: IconClock },
    { label: '自己紹介', value: bio, key: 'bio', icon: IconFileText },
    { label: 'ギャラリー', value: gallery.length > 0 ? `${gallery.length}枚` : '', key: 'gallery', icon: IconFileText },
  ];

  const handleItemClick = (key: string) => {
    setModalType(key as any);
    setShowModal(true);
  };

  const handleSave = () => {
    setShowModal(false);
    setModalType(null);
  };

  const handleAvatarUpload = () => {
    const url = prompt('画像URLを入力してください（デモ用）:');
    if (url) {
      setAvatar(url);
    }
  };

  const handleGalleryUpload = () => {
    const url = prompt('画像URLを入力してください（デモ用）:');
    if (url) {
      setGallery([...gallery, url]);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
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

      {/* 入力モーダル */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-end',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setShowModal(false)}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}</style>
          <div
            style={{
              width: '100%',
              maxHeight: '80vh',
              background: '#fff',
              borderRadius: '24px 24px 0 0',
              padding: '24px',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#333' }}>
                {modalType === 'name' && 'ユーザー名'}
                {modalType === 'age' && '年代'}
                {modalType === 'region' && '居住地'}
                {modalType === 'activeTime' && 'よく使う時間帯'}
                {modalType === 'bio' && '自己紹介'}
                {modalType === 'avatar' && 'ユーザーアイコン'}
                {modalType === 'gallery' && 'ギャラリー'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 8,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <IconX size={24} color="#666" />
              </button>
            </div>

            {/* ユーザー名入力 */}
            {modalType === 'name' && (
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="ユーザー名を入力"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: 12,
                    fontSize: 16,
                    outline: 'none',
                    boxSizing: 'border-box',
                    marginBottom: 16
                  }}
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  保存
                </button>
              </div>
            )}

            {/* 年代選択 */}
            {modalType === 'age' && (
              <div>
                {['10代前半', '10代後半', '20代', '30代', '40代', '50代以上'].map(option => (
                  <div
                    key={option}
                    onClick={() => {
                      setAge(option);
                      handleSave();
                    }}
                    style={{
                      padding: '16px',
                      borderBottom: '1px solid #f0f0f0',
                      cursor: 'pointer',
                      background: age === option ? '#f0f9ff' : '#fff',
                      transition: 'background .2s ease'
                    }}
                  >
                    <span style={{ fontSize: 16, color: age === option ? '#0EA5E9' : '#333', fontWeight: age === option ? 600 : 400 }}>
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 居住地選択 */}
            {modalType === 'region' && (
              <div>
                {['北海道', '東北', '関東', '中部', '関西', '中国', '四国', '九州・沖縄'].map(option => (
                  <div
                    key={option}
                    onClick={() => {
                      setRegion(option);
                      handleSave();
                    }}
                    style={{
                      padding: '16px',
                      borderBottom: '1px solid #f0f0f0',
                      cursor: 'pointer',
                      background: region === option ? '#f0f9ff' : '#fff',
                      transition: 'background .2s ease'
                    }}
                  >
                    <span style={{ fontSize: 16, color: region === option ? '#0EA5E9' : '#333', fontWeight: region === option ? 600 : 400 }}>
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* よく使う時間帯選択 */}
            {modalType === 'activeTime' && (
              <div>
                {['早朝（6:00-9:00）', '午前（9:00-12:00）', '昼（12:00-15:00）', '午後（15:00-18:00）', '夕方（18:00-21:00）', '夜（21:00-24:00）', '深夜（24:00-6:00）'].map(option => (
                  <div
                    key={option}
                    onClick={() => {
                      setActiveTime(option);
                      handleSave();
                    }}
                    style={{
                      padding: '16px',
                      borderBottom: '1px solid #f0f0f0',
                      cursor: 'pointer',
                      background: activeTime === option ? '#f0f9ff' : '#fff',
                      transition: 'background .2s ease'
                    }}
                  >
                    <span style={{ fontSize: 16, color: activeTime === option ? '#0EA5E9' : '#333', fontWeight: activeTime === option ? 600 : 400 }}>
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 自己紹介入力 */}
            {modalType === 'bio' && (
              <div>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="自己紹介を入力"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: 12,
                    fontSize: 16,
                    outline: 'none',
                    boxSizing: 'border-box',
                    marginBottom: 16,
                    minHeight: 120,
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  保存
                </button>
              </div>
            )}

            {/* アバター設定 */}
            {modalType === 'avatar' && (
              <div>
                {avatar && (
                  <div style={{ marginBottom: 16, textAlign: 'center' }}>
                    <div style={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      margin: '0 auto',
                      background: `url(${avatar}) center/cover`,
                      border: '3px solid #0EA5E9'
                    }} />
                  </div>
                )}
                <button
                  onClick={() => {
                    handleAvatarUpload();
                    handleSave();
                  }}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginBottom: 12
                  }}
                >
                  {avatar ? '画像を変更' : '画像をアップロード'}
                </button>
                {avatar && (
                  <button
                    onClick={() => {
                      setAvatar('');
                      handleSave();
                    }}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: '#f3f4f6',
                      color: '#666',
                      border: 'none',
                      borderRadius: 12,
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    削除
                  </button>
                )}
              </div>
            )}

            {/* ギャラリー */}
            {modalType === 'gallery' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                  {gallery.map((img, index) => (
                    <div key={index} style={{ position: 'relative', aspectRatio: '1', borderRadius: 12, overflow: 'hidden' }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        onClick={() => removeGalleryImage(index)}
                        style={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          background: 'rgba(0,0,0,0.7)',
                          border: 'none',
                          borderRadius: '50%',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        <IconX size={16} color="#fff" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleGalleryUpload}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginBottom: 12
                  }}
                >
                  画像を追加
                </button>
                <button
                  onClick={handleSave}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#f3f4f6',
                    color: '#333',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  完了
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileRegistrationScreen;
