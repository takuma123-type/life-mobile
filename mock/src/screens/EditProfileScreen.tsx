import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setMe } from '../store/userSlice';
import { navigate } from '../store/uiSlice';
import Button from '../components/common/Button';

const EditProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((s:any)=> s.user.me);
  const [name, setName] = useState(me?.name || '');
  const [bio, setBio] = useState(me?.bio || '');

  const save = () => {
    if(!me) return;
    dispatch(setMe({ ...me, name, bio }));
    dispatch(navigate('mypage'));
  };

  return (
    <div style={{ maxWidth:520, margin:'0 auto', padding:'24px 20px' }}>
      <h2 style={{ margin:'0 0 20px', fontSize:22 }}>プロフィール編集</h2>
      <input className='input' placeholder='名前' value={name} onChange={e=>setName(e.target.value)} style={{ marginBottom:12 }} />
      <textarea className='input' rows={5} placeholder='自己紹介' value={bio} onChange={e=>setBio(e.target.value)} style={{ marginBottom:20, resize:'vertical' }} />
      <div style={{ display:'flex', gap:12 }}>
        <Button variant='outline' style={{ flex:1 }} onClick={()=>dispatch(navigate('mypage'))}>キャンセル</Button>
        <Button style={{ flex:1 }} onClick={save}>保存</Button>
      </div>
    </div>
  );
};
export default EditProfileScreen;
