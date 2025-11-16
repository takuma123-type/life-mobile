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
      background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)', 
      minHeight: '100vh', 
      paddingBottom: 100 
    }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .slide-in {
          animation: slideIn 0.4s ease-out forwards;
        }
      `}</style>
      {/* ヘッダー */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
        padding: '32px 20px',
        borderBottom: 'none',
        boxShadow: '0 4px 20px rgba(14, 165, 233, 0.15)'
      }} className="fade-in-up">
        <h1 style={{ 
          margin: '0 0 12px', 
          fontSize: 28, 
          fontWeight: 800,
          textAlign: 'center',
          color: '#fff',
          letterSpacing: '1px'
        }}>
          LIFE
        </h1>
        <p style={{ 
          margin: 0, 
          fontSize: 15, 
          color: 'rgba(255, 255, 255, 0.95)',
          textAlign: 'center',
          lineHeight: 1.7,
          fontWeight: 500
        }}>
          LIFEへようこそ!<br />
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
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: currentStep >= step ? '#fff' : 'rgba(255, 255, 255, 0.3)',
                color: currentStep >= step ? '#0EA5E9' : 'rgba(255, 255, 255, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 700,
                transition: 'all .4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: currentStep === step ? 'scale(1.1)' : 'scale(1)',
                boxShadow: currentStep >= step ? '0 4px 12px rgba(255, 255, 255, 0.3)' : 'none'
              }}>
                {step}
              </div>
              {step < 3 && (
                <div style={{
                  width: 40,
                  height: 3,
                  background: currentStep > step ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
                  transition: 'all .4s ease',
                  borderRadius: 2
                }} />
              )}
            </div>
          ))}
        </div>
        
        {/* ステップタイトル */}
        <p style={{
          margin: '16px 0 0',
          fontSize: 14,
          color: 'rgba(255, 255, 255, 0.95)',
          textAlign: 'center',
          fontWeight: 600,
          letterSpacing: '0.5px'
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
        <div 
          className="scale-in"
          style={{ 
            background: '#fff',
            borderRadius: 20,
            padding: '28px',
            marginBottom: 20,
            border: 'none',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            animationDelay: '0.1s',
            opacity: 0
          }}
        >
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
          className="scale-in"
          style={{
            width: '100%',
            padding: '18px',
            background: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 16,
            fontSize: 17,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all .3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 8px 24px rgba(14, 165, 233, 0.3)',
            letterSpacing: '0.5px',
            animationDelay: '0.2s',
            opacity: 0
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(14, 165, 233, 0.4)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(14, 165, 233, 0.3)';
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
        <div 
          className="scale-in"
          style={{ 
            background: '#fff',
            borderRadius: 20,
            padding: '28px',
            marginBottom: 20,
            border: 'none',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            animationDelay: '0.1s',
            opacity: 0
          }}
        >
          <h3 style={{ 
            margin: '0 0 20px', 
            fontSize: 17, 
            fontWeight: 700,
            color: '#0EA5E9',
            textAlign: 'center'
          }}>
            プロフィール画像
          </h3>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: avatarPreview ? 'transparent' : 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all .4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              border: avatarPreview ? 'none' : '4px dashed rgba(14, 165, 233, 0.3)',
              overflow: 'hidden',
              boxShadow: avatarPreview ? '0 8px 24px rgba(0, 0, 0, 0.12)' : '0 4px 12px rgba(14, 165, 233, 0.15)'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = avatarPreview ? '0 12px 32px rgba(0, 0, 0, 0.15)' : '0 8px 24px rgba(14, 165, 233, 0.25)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = avatarPreview ? '0 8px 24px rgba(0, 0, 0, 0.12)' : '0 4px 12px rgba(14, 165, 233, 0.15)';
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
                fontSize: 48, 
                color: '#0EA5E9',
                fontWeight: 300
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
        <div 
          className="scale-in"
          style={{ 
            background: '#fff',
            borderRadius: 20,
            padding: '28px',
            marginBottom: 24,
            border: 'none',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            animationDelay: '0.2s',
            opacity: 0
          }}
        >
          <h3 style={{ 
            margin: '0 0 20px', 
            fontSize: 17, 
            fontWeight: 700,
            color: '#0EA5E9',
            textAlign: 'center'
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
                className="slide-in"
                style={{
                  aspectRatio: '1',
                  border: '3px dashed rgba(14, 165, 233, 0.25)',
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  color: '#0EA5E9',
                  cursor: 'pointer',
                  transition: 'all .3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  animationDelay: `${0.1 + index * 0.05}s`,
                  opacity: 0,
                  fontWeight: 300
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)';
                  e.currentTarget.style.borderColor = '#0EA5E9';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(14, 165, 233, 0.2)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)';
                  e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.25)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                +
              </div>
            ))}
          </div>
        </div>

        {/* ボタン */}
        <div className="scale-in" style={{ display: 'flex', gap: 12, animationDelay: '0.3s', opacity: 0 }}>
          <button
            onClick={() => setCurrentStep(1)}
            style={{
              flex: 1,
              padding: '18px',
              background: '#fff',
              color: '#0EA5E9',
              border: '2px solid #0EA5E9',
              borderRadius: 16,
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              letterSpacing: '0.5px'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#0EA5E9';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(14, 165, 233, 0.3)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#0EA5E9';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            戻る
          </button>
          <button
            onClick={handleStep2Next}
            style={{
              flex: 1,
              padding: '18px',
              background: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 16,
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 8px 24px rgba(14, 165, 233, 0.3)',
              letterSpacing: '0.5px'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(14, 165, 233, 0.4)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(14, 165, 233, 0.3)';
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
        <div 
          className="scale-in"
          style={{ 
            background: '#fff',
            borderRadius: 20,
            padding: '28px',
            marginBottom: 20,
            border: 'none',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            animationDelay: '0.1s',
            opacity: 0
          }}
        >
          <h3 style={{ 
            margin: '0 0 20px', 
            fontSize: 17, 
            fontWeight: 700,
            color: '#0EA5E9',
            textAlign: 'center'
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
        <div className="scale-in" style={{ display: 'flex', gap: 12, animationDelay: '0.2s', opacity: 0 }}>
          <button
            onClick={() => setCurrentStep(2)}
            style={{
              flex: 1,
              padding: '18px',
              background: '#fff',
              color: '#0EA5E9',
              border: '2px solid #0EA5E9',
              borderRadius: 16,
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              letterSpacing: '0.5px'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#0EA5E9';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(14, 165, 233, 0.3)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#0EA5E9';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            戻る
          </button>
          <button
            onClick={complete}
            style={{
              flex: 1,
              padding: '18px',
              background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 16,
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
              letterSpacing: '0.5px'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(16, 185, 129, 0.45)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.35)';
            }}
          >
            🎉 登録完了
          </button>
        </div>
      </>
    )}
      </div>
    </div>
  );
};

export default ProfileRegistrationScreen;
