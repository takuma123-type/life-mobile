import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { pushMessage } from '../store/chatSlice';
import { navigate } from '../store/uiSlice';
import { IconBack, IconGlobe } from '../components/icons';
import Button from '../components/common/Button';
import { mockTranslate } from '../data/mockData';

const ChatDetailScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector((s:any)=> s.chats.activeChatId);
  const users = useAppSelector((s:any)=> s.user.users);
  const messages = useAppSelector((s:any)=> s.chats.messages[activeChatId] || []);
  const user = users.find((u:any)=> u.id === activeChatId);
  const [input, setInput] = useState('');
  const [translated, setTranslated] = useState<Record<string,string>>({});

  const send = () => {
    if(!input.trim()) return;
    dispatch(pushMessage({ chatId: activeChatId, message: { id: 'm_'+Date.now(), sender:'me', message: input.trim(), time: new Date().toLocaleTimeString().slice(0,5) }}));
    setInput('');
  };

  const toggleTranslate = async (id:string, message:string) => {
    if(translated[id]) { const c={...translated}; delete c[id]; setTranslated(c); return; }
    const t = await mockTranslate(message); setTranslated(prev=> ({...prev, [id]: t }));
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 60px)' }}>
      <div style={{ display:'flex', alignItems:'center', padding:'12px 16px', borderBottom:'1px solid var(--color-border)' }}>
        <button onClick={()=>dispatch(navigate('chat'))} aria-label='戻る' style={{ background:'none', border:'none', color:'var(--color-text)', cursor:'pointer', marginRight:8, display:'flex' }}>
          <IconBack size={22} />
        </button>
        <h2 style={{ margin:0, fontSize:16 }}>{user? user.name : 'チャット'}</h2>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'16px' }}>
        {messages.map((m:any)=>(
          <div key={m.id} style={{ display:'flex', flexDirection:'column', alignItems: m.sender==='me'? 'flex-end':'flex-start', marginBottom:14 }}>
            <div style={{ background: m.sender==='me'? 'var(--color-accent)':'var(--color-surface)', color: m.sender==='me'? '#fff':'var(--color-text)', padding:'10px 14px', borderRadius:20, maxWidth:'70%' }}>
              <p style={{ margin:0, fontSize:14, lineHeight:1.5 }}>{translated[m.id] || m.message}</p>
              <span style={{ fontSize:10, opacity:.6 }}>{m.time}</span>
            </div>
            {user?.country && user.country !== '日本' && m.sender !== 'me' && (
              <button onClick={()=>toggleTranslate(m.id, m.message)} style={{ background:'none', border:'1px solid var(--color-border)', padding:'4px 8px', borderRadius:12, fontSize:11, marginTop:6, cursor:'pointer', color:'var(--color-muted)', display:'inline-flex', alignItems:'center', gap:4 }}>
                <span>{translated[m.id] ? '原文' : '翻訳'}</span>
                <IconGlobe size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
      <div style={{ borderTop:'1px solid var(--color-border)', padding:'12px 16px', background:'var(--color-surface)', display:'flex', gap:10 }}>
        <input className='input' placeholder='メッセージ...' value={input} onChange={e=>setInput(e.target.value)} />
        <Button onClick={send} size='md'>送信</Button>
      </div>
    </div>
  );
};
export default ChatDetailScreen;
