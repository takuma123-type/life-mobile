import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setMe } from '../store/userSlice';
import { navigate, openProfileModal } from '../store/uiSlice';
import Button from '../components/common/Button';

const EditProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((s:any)=> s.user.me);
  const [name, setName] = useState(me?.name || '');
  const [bio, setBio] = useState(me?.bio || '');
  const [age, setAge] = useState(me?.age || '');
  const [region, setRegion] = useState(me?.region || '');
  const [activeTime, setActiveTime] = useState((me as any)?.activeTime || '');

  const ageOptions = ['10代前半','10代後半','20代','30代','40代','50代','60代+'];
  const regionOptions = ['北海道','東北','関東','中部','近畿','中国','四国','九州','沖縄','海外'];
  const timeOptions = ['朝','昼','夕方','夜','深夜'];

  const save = () => {
    if (!me) return;
    if (!name.trim()) {
      alert('名前を入力してください');
      return;
    }
    if (bio.length > 160) {
      alert('自己紹介は160文字以内にしてください');
      return;
    }
    dispatch(setMe({ ...me, name: name.trim(), bio: bio.trim(), age, region, activeTime }));
    dispatch(navigate('mypage'));
    // 編集後すぐプロフィールを再度表示したい場合
    dispatch(openProfileModal());
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 24px 120px' }}>
      <h2 style={{ margin: '0 0 28px', fontSize: 28, fontWeight: 800, letterSpacing: '.5px', color: '#0f172a' }}>プロフィール編集</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>名前</label>
          <input
            className='input'
            placeholder='表示名'
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ padding: '16px 18px', fontSize: 16, border: '2px solid #e2e8f0', borderRadius: 14, outline: 'none', fontWeight: 600 }}
            onFocus={e => { e.currentTarget.style.borderColor = '#0EA5E9'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(14,165,233,0.15)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>年代</label>
          <select
            value={age}
            onChange={e => setAge(e.target.value)}
            style={{ padding: '14px 16px', fontSize: 15, border: '2px solid #e2e8f0', borderRadius: 14, background: '#fff', fontWeight: 600, cursor: 'pointer' }}
            onFocus={e => { e.currentTarget.style.borderColor = '#0EA5E9'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(14,165,233,0.15)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <option value=''>未設定</option>
            {ageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>地域</label>
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            style={{ padding: '14px 16px', fontSize: 15, border: '2px solid #e2e8f0', borderRadius: 14, background: '#fff', fontWeight: 600, cursor: 'pointer' }}
            onFocus={e => { e.currentTarget.style.borderColor = '#0EA5E9'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(14,165,233,0.15)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <option value=''>未設定</option>
            {regionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>よく使う時間帯</label>
            <select
              value={activeTime}
              onChange={e => setActiveTime(e.target.value)}
              style={{ padding: '14px 16px', fontSize: 15, border: '2px solid #e2e8f0', borderRadius: 14, background: '#fff', fontWeight: 600, cursor: 'pointer' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#0EA5E9'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(14,165,233,0.15)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <option value=''>未設定</option>
              {timeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>自己紹介 <span style={{ fontWeight: 400, color: '#94a3b8' }}>({bio.length}/160)</span></label>
          <textarea
            className='input'
            rows={6}
            placeholder='自己紹介'
            value={bio}
            onChange={e => setBio(e.target.value)}
            style={{ padding: '16px 18px', fontSize: 15, border: '2px solid #e2e8f0', borderRadius: 14, outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
            onFocus={e => { e.currentTarget.style.borderColor = '#0EA5E9'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(14,165,233,0.15)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      <div style={{ marginTop: 40, display: 'flex', gap: 18 }}>
        <Button
          variant='outline'
          style={{ flex: 1, padding: '16px 18px', fontWeight: 700, borderRadius: 14 }}
          onClick={() => dispatch(navigate('mypage'))}
        >キャンセル</Button>
        <Button
          style={{ flex: 1, padding: '16px 18px', fontWeight: 700, borderRadius: 14, background: 'linear-gradient(135deg,#0EA5E9 0%, #06B6D4 100%)', border: 'none', color: '#fff' }}
          onClick={save}
        >保存</Button>
      </div>
    </div>
  );
};
export default EditProfileScreen;
