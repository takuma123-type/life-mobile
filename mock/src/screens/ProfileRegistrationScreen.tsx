import React, { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setMe, addUser } from '../store/userSlice';
import { setRegistered, navigate, setAuthenticated } from '../store/uiSlice';
import { IconUser, IconCalendar, IconMapPin, IconClock, IconFileText, IconLock } from '../components/icons';

const ProfileRegistrationScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const smsVerified = useAppSelector((s:any) => s.ui.smsVerified);
  const smsPhone = useAppSelector((s:any) => s.ui.smsPhone);
  
  // ステップ管理
  const [currentStep, setCurrentStep] = useState(1);
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [region, setRegion] = useState('');
  const [activeTime, setActiveTime] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setAvatarPreview(result);
        setAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (index: number) => {
    // 実際には画像アップロード処理
    alert('画像アップロード機能は後で実装予定です');
  };

  // ステップ1の検証と次へ
  const handleStep1Next = () => {
    if (!name.trim()) {
      alert('名前を入力してください');
      return;
    }
    if (!age) {
      alert('年代を選択してください');
      return;
    }
    if (!region) {
      alert('都道府県を選択してください');
      return;
    }
    setCurrentStep(2);
  };

  // ステップ2の次へ
  const handleStep2Next = () => {
    setCurrentStep(3);
  };

  // ステップ3（最終）の完了処理
  const complete = () => {
    if (!password || password.length < 6) {
      alert('パスワードは6文字以上で入力してください');
      return;
    }
    if (password !== passwordConfirm) {
      alert('パスワードが一致しません');
      return;
    }

    const me = { 
      id: 'me', 
      name: name.trim(), 
      bio: bio.trim(), 
      avatar, 
      region, 
      age, 
      activeTime: activeTime || '未設定',
      phone: smsPhone,
      password // 実際にはハッシュ化が必要
    };
    
    dispatch(setMe(me));
    dispatch(addUser(me));
    dispatch(setRegistered(true));
    dispatch(setAuthenticated(true));
    dispatch(navigate('chat'));
  };

  return (
    <div style={{ 
      background: 'var(--color-bg)', 
      minHeight: '100vh', 
      paddingBottom: 100 
    }}>
      {/* ヘッダー */}
      <div style={{ 
        background: '#fff',
        padding: '24px 20px',
        borderBottom: '1px solid #e5e5e5'
      }}>
        <h1 style={{ 
          margin: '0 0 8px', 
          fontSize: 24, 
          fontWeight: 700,
          textAlign: 'center'
        }}>
          LIFE
        </h1>
        <p style={{ 
          margin: 0, 
          fontSize: 14, 
          color: '#666',
          textAlign: 'center',
          lineHeight: 1.6
        }}>
          LIFEへようこそ！<br />
          プロフィールを登録して、フレンドやコミュニティとつながりましょう。
        </p>
        
        {/* ステップインジケーター */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          marginTop: 24
        }}>
          {[1, 2, 3].map(step => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: currentStep >= step ? '#000' : '#e5e5e5',
                color: currentStep >= step ? '#fff' : '#999',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 600,
                transition: 'all .3s ease'
              }}>
                {step}
              </div>
              {step < 3 && (
                <div style={{
                  width: 40,
                  height: 2,
                  background: currentStep > step ? '#000' : '#e5e5e5',
                  transition: 'all .3s ease'
                }} />
              )}
            </div>
          ))}
        </div>
        
        {/* ステップタイトル */}
        <p style={{
          margin: '12px 0 0',
          fontSize: 13,
          color: '#666',
          textAlign: 'center',
          fontWeight: 600
        }}>
          {currentStep === 1 && '基本情報の入力'}
          {currentStep === 2 && 'プロフィール画像の設定'}
          {currentStep === 3 && 'パスワードの設定'}
        </p>
      </div>

      <div style={{ 
        maxWidth: 480, 
        margin: '0 auto', 
        padding: '24px 20px'
      }}>
        {/* ステップ1: 基本情報 + 詳細情報 */}
        {currentStep === 1 && (
          <>

        {/* 基本情報カード */}
        <div style={{ 
          background: '#fff',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 20,
          border: '1px solid #e5e5e5'
        }}>
          {/* 名前 */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'flex',
              marginBottom: 8, 
              fontSize: 14, 
              fontWeight: 600,
              color: 'var(--color-text)',
              alignItems: 'center',
              gap: 6
            }}>
              <IconUser size={16} color="var(--color-primary)" />
              名前 <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="名前を入力"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: 10,
                  fontSize: 15,
                  outline: 'none',
                  background: '#fff',
                  transition: 'var(--transition)'
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <div style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <IconUser size={18} color="var(--color-text-soft)" />
              </div>
            </div>
          </div>

          {/* 年代 */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'flex',
              marginBottom: 8, 
              fontSize: 14, 
              fontWeight: 600,
              color: 'var(--color-text)',
              alignItems: 'center',
              gap: 6
            }}>
              <IconCalendar size={16} color="var(--color-primary)" />
              年代 <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={age}
                onChange={e => setAge(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: 10,
                  fontSize: 15,
                  outline: 'none',
                  background: '#fff',
                  cursor: 'pointer',
                  appearance: 'none',
                  transition: 'var(--transition)'
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">選択してください</option>
                <option value="10代前半">10代前半</option>
                <option value="10代後半">10代後半</option>
                <option value="20代">20代</option>
                <option value="30代">30代</option>
                <option value="40代">40代</option>
                <option value="50代以上">50代以上</option>
              </select>
              <div style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <IconCalendar size={18} color="var(--color-text-soft)" />
              </div>
            </div>
          </div>

          {/* 都道府県 */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'flex',
              marginBottom: 8, 
              fontSize: 14, 
              fontWeight: 600,
              color: 'var(--color-text)',
              alignItems: 'center',
              gap: 6
            }}>
              <IconMapPin size={16} color="var(--color-primary)" />
              都道府県 <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={region}
                onChange={e => setRegion(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: 10,
                  fontSize: 15,
                  outline: 'none',
                  background: '#fff',
                  cursor: 'pointer',
                  appearance: 'none',
                  transition: 'var(--transition)'
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">選択してください</option>
                <option value="東京">東京</option>
                <option value="大阪">大阪</option>
                <option value="神奈川">神奈川</option>
                <option value="愛知">愛知</option>
                <option value="福岡">福岡</option>
                <option value="北海道">北海道</option>
                <option value="その他">その他</option>
              </select>
              <div style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <IconMapPin size={18} color="var(--color-text-soft)" />
              </div>
            </div>
          </div>

          {/* よく使う時間帯 */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'flex',
              marginBottom: 8, 
              fontSize: 14, 
              fontWeight: 600,
              color: 'var(--color-text)',
              alignItems: 'center',
              gap: 6
            }}>
              <IconClock size={16} color="var(--color-primary)" />
              よく使う時間帯
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={activeTime}
                onChange={e => setActiveTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: 10,
                  fontSize: 15,
                  outline: 'none',
                  background: '#fff',
                  cursor: 'pointer',
                  appearance: 'none',
                  transition: 'var(--transition)'
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">選択してください</option>
                <option value="朝">朝</option>
                <option value="昼">昼</option>
                <option value="夜">夜</option>
                <option value="深夜">深夜</option>
              </select>
              <div style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <IconClock size={18} color="var(--color-text-soft)" />
              </div>
            </div>
          </div>

          {/* 自己紹介 */}
          <div style={{ marginBottom: 0 }}>
            <label style={{ 
              display: 'flex',
              marginBottom: 8, 
              fontSize: 14, 
              fontWeight: 600,
              color: 'var(--color-text)',
              alignItems: 'center',
              gap: 6
            }}>
              <IconFileText size={16} color="var(--color-primary)" />
              自己紹介
            </label>
            <textarea
              placeholder="自己紹介を入力"
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1.5px solid #E2E8F0',
                borderRadius: 10,
                fontSize: 15,
                outline: 'none',
                transition: 'var(--transition)',
                resize: 'vertical',
                fontFamily: 'inherit',
                background: '#fff'
              }}
              onFocus={e => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#E2E8F0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* 次へボタン */}
        <button
          onClick={handleStep1Next}
          style={{
            width: '100%',
            padding: '16px',
            background: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all .2s ease'
          }}
          onMouseOver={e => {
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseOut={e => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          次へ
        </button>
      </>
    )}

    {/* ステップ2: プロフィール画像・ギャラリー */}
    {currentStep === 2 && (
      <>
        {/* プロフィール画像 */}
        <div style={{ 
          background: '#fff',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 20,
          border: '1px solid #e5e5e5'
        }}>
          <h3 style={{ 
            margin: '0 0 16px', 
            fontSize: 16, 
            fontWeight: 700
          }}>
            プロフィール画像
          </h3>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: avatarPreview ? 'transparent' : 'var(--color-surface-alt)',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all .2s ease',
              border: '3px dashed var(--color-border)',
              overflow: 'hidden'
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.background = avatarPreview ? 'transparent' : '#E0F2FE';
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.background = avatarPreview ? 'transparent' : 'var(--color-surface-alt)';
            }}
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ 
                fontSize: 40, 
                color: 'var(--color-primary)' 
              }}>
                +
              </span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            style={{ display: 'none' }}
          />
        </div>

        {/* ギャラリー */}
        <div style={{ 
          background: '#fff',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 24,
          border: '1px solid #e5e5e5'
        }}>
          <h3 style={{ 
            margin: '0 0 16px', 
            fontSize: 16, 
            fontWeight: 700
          }}>
            ギャラリー
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 12 
          }}>
            {[0, 1, 2, 3, 4, 5].map(index => (
              <div
                key={index}
                onClick={() => handleGalleryUpload(index)}
                style={{
                  aspectRatio: '1',
                  border: '2px dashed var(--color-border)',
                  borderRadius: 12,
                  background: 'var(--color-surface-alt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  color: 'var(--color-primary)',
                  cursor: 'pointer',
                  transition: 'all .2s ease'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = '#E0F2FE';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'var(--color-surface-alt)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                +
              </div>
            ))}
          </div>
        </div>

        {/* ボタン */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setCurrentStep(1)}
            style={{
              flex: 1,
              padding: '16px',
              background: '#fff',
              color: '#000',
              border: '1px solid #e5e5e5',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all .2s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#f5f5f5';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#fff';
            }}
          >
            戻る
          </button>
          <button
            onClick={handleStep2Next}
            style={{
              flex: 1,
              padding: '16px',
              background: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all .2s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseOut={e => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            次へ
          </button>
        </div>
      </>
    )}

    {/* ステップ3: パスワード設定 */}
    {currentStep === 3 && (
      <>
        {/* パスワード設定 */}
        <div style={{ 
          background: '#fff',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 20,
          border: '1px solid #e5e5e5'
        }}>
          <h3 style={{ 
            margin: '0 0 16px', 
            fontSize: 16, 
            fontWeight: 700
          }}>
            パスワード設定
          </h3>
          <div style={{ marginBottom: 12 }}>
            <label style={{ 
              display: 'flex',
              marginBottom: 8, 
              fontSize: 14, 
              fontWeight: 600,
              color: 'var(--color-text)',
              alignItems: 'center',
              gap: 6
            }}>
              <IconLock size={16} color="var(--color-primary)" />
              パスワード <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="パスワード（6文字以上）"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: 10,
                  fontSize: 15,
                  outline: 'none',
                  background: '#fff',
                  transition: 'var(--transition)'
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <div style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <IconLock size={18} color="var(--color-text-soft)" />
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ 
              display: 'flex',
              marginBottom: 8, 
              fontSize: 14, 
              fontWeight: 600,
              color: 'var(--color-text)',
              alignItems: 'center',
              gap: 6
            }}>
              <IconLock size={16} color="var(--color-primary)" />
              パスワード（確認） <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="パスワード（確認）"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: 10,
                  fontSize: 15,
                  outline: 'none',
                  background: '#fff',
                  transition: 'var(--transition)'
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <div style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <IconLock size={18} color="var(--color-text-soft)" />
              </div>
            </div>
          </div>
          <p style={{ 
            margin: '0', 
            fontSize: 12, 
            color: '#666',
            lineHeight: 1.6
          }}>
            ※パスワードは電話番号とともにログイン時に使用します
          </p>
        </div>

        {/* ボタン */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setCurrentStep(2)}
            style={{
              flex: 1,
              padding: '16px',
              background: '#fff',
              color: '#000',
              border: '1px solid #e5e5e5',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all .2s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#f5f5f5';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#fff';
            }}
          >
            戻る
          </button>
          <button
            onClick={complete}
            style={{
              flex: 1,
              padding: '16px',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all .2s ease',
              boxShadow: 'var(--shadow-primary)'
            }}
            onMouseOver={e => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-primary-lg)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-primary)';
            }}
          >
            登録完了
          </button>
        </div>
      </>
    )}
      </div>
    </div>
  );
};

export default ProfileRegistrationScreen;
