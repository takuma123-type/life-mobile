import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { navigate } from '../store/uiSlice';
import { IconBack, IconSend, IconPlus, IconAvatar, IconGlobe } from '../components/icons';
import { mockTranslate } from '../data/mockData';

// モックメッセージデータ
const mockGroupMessages = [
  { id: 'gm1', userId: 'u1', userName: 'ユーザー1', avatar: '真', message: 'こんにちは！', time: '10:30', lang: 'ja' },
  { id: 'gm2', userId: 'u101', userName: 'Emma', avatar: 'E', message: 'Hello everyone! Nice to meet you all!', time: '10:32', lang: 'en' },
  { id: 'gm3', userId: 'u102', userName: 'Li Wei', avatar: 'L', message: '大家好！我也喜欢动漫', time: '10:36', lang: 'zh' },
  { id: 'gm4', userId: 'u2', userName: 'たろ', avatar: 'た', message: 'いろんな国の人がいて楽しいね！', time: '10:38', lang: 'ja' },
  { id: 'gm5', userId: 'u103', userName: 'Min-jun', avatar: 'M', message: '저도 일본 애니메이션 정말 좋아해요!', time: '10:40', lang: 'ko' }
];

const GroupChatScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((s:any)=> s.communities.activeCommunityId);
  const community = useAppSelector((s:any)=> s.communities.list.find((c:any)=> c.id === id));
  const me = useAppSelector((s:any)=> s.user.me);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockGroupMessages);
  const [translating, setTranslating] = useState<string | null>(null);
  const [translations, setTranslations] = useState<{[key:string]: string}>({});

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: `gm${Date.now()}`,
      userId: 'me',
      userName: me?.name || 'ゲストユーザー',
      avatar: 'GU',
      message: message.trim(),
      time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      lang: 'ja'
    };
    setMessages([...messages, newMsg]);
    setMessage('');
  };

  const handleTranslate = async (msgId: string, text: string) => {
    setTranslating(msgId);
    try {
      const translated = await mockTranslate(text);
      setTranslations({ ...translations, [msgId]: translated });
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setTranslating(null);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      background: '#f5f5f5' 
    }}>
      {/* Header */}
      <div style={{ 
        background: '#fff', 
        borderBottom: '1px solid #e5e5e5',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <button 
          onClick={() => dispatch(navigate('communityDetail'))} 
          aria-label='戻る' 
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            padding: 8,
            margin: -8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconBack size={24} />
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
            {community?.name || 'グループチャット'}
          </h2>
        </div>
      </div>

      {/* 今日のセパレーター */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <span style={{ 
          background: '#d1d5db', 
          color: '#4b5563',
          padding: '6px 16px', 
          borderRadius: 16,
          fontSize: 13,
          fontWeight: 600
        }}>
          今日
        </span>
      </div>

      {/* メッセージリスト */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '0 16px 16px'
      }}>
        {messages.map((msg) => {
          const isMe = msg.userId === 'me';
          const needsTranslation = msg.lang !== 'ja';
          
          return (
            <div 
              key={msg.id}
              style={{ 
                marginBottom: 20,
                display: 'flex',
                flexDirection: isMe ? 'row-reverse' : 'row',
                gap: 12,
                alignItems: 'flex-start'
              }}
            >
              {/* アバター */}
              {!isMe && (
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%',
                  background: '#f5f5f5',
                  border: '2px solid #e5e5e5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#666',
                  flexShrink: 0
                }}>
                  {msg.avatar}
                </div>
              )}

              <div style={{ 
                maxWidth: '70%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMe ? 'flex-end' : 'flex-start'
              }}>
                {/* ユーザー名 */}
                {!isMe && (
                  <span style={{ 
                    fontSize: 12, 
                    color: '#666',
                    marginBottom: 4,
                    paddingLeft: 8
                  }}>
                    {msg.userName}
                  </span>
                )}

                {/* メッセージバブル */}
                <div style={{ 
                  background: isMe ? '#000' : '#fff',
                  color: isMe ? '#fff' : '#000',
                  padding: '12px 16px',
                  borderRadius: 16,
                  fontSize: 15,
                  lineHeight: 1.5,
                  wordBreak: 'break-word',
                  boxShadow: isMe ? 'none' : '0 1px 3px rgba(0,0,0,.08)'
                }}>
                  {msg.message}
                </div>

                {/* 時間と翻訳ボタン */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 8,
                  marginTop: 4,
                  paddingLeft: isMe ? 0 : 8,
                  paddingRight: isMe ? 8 : 0
                }}>
                  <span style={{ 
                    fontSize: 11, 
                    color: '#999'
                  }}>
                    {msg.time}
                  </span>
                  
                  {/* 翻訳ボタン（他言語メッセージのみ） */}
                  {needsTranslation && !isMe && (
                    <button
                      onClick={() => handleTranslate(msg.id, msg.message)}
                      disabled={translating === msg.id}
                      style={{
                        background: '#fff',
                        border: '1px solid #e5e5e5',
                        borderRadius: 12,
                        padding: '4px 10px',
                        fontSize: 11,
                        cursor: translating === msg.id ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontWeight: 600,
                        color: '#666',
                        transition: 'all .2s ease'
                      }}
                      onMouseOver={e => (e.currentTarget.style.background = '#f9f9f9')}
                      onMouseOut={e => (e.currentTarget.style.background = '#fff')}
                    >
                      <IconGlobe size={12} />
                      {translating === msg.id ? '翻訳中...' : '翻訳'}
                    </button>
                  )}
                </div>

                {/* 翻訳結果 */}
                {translations[msg.id] && (
                  <div style={{ 
                    background: '#f0f9ff',
                    border: '1px solid #bae6fd',
                    padding: '10px 14px',
                    borderRadius: 12,
                    fontSize: 14,
                    lineHeight: 1.5,
                    marginTop: 8,
                    maxWidth: '100%',
                    color: '#0c4a6e'
                  }}>
                    {translations[msg.id]}
                  </div>
                )}
              </div>

              {/* 自分のアバター */}
              {isMe && (
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%',
                  background: '#000',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                  {msg.avatar}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 入力エリア */}
      <div style={{ 
        background: '#fff',
        borderTop: '1px solid #e5e5e5',
        padding: '12px 16px',
        display: 'flex',
        gap: 12,
        alignItems: 'center'
      }}>
        <button
          aria-label='添付'
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666'
          }}
          onClick={() => alert('添付機能は後で実装予定です')}
        >
          <IconPlus size={24} />
        </button>

        <input
          type="text"
          placeholder="メッセージを入力..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '1px solid #e5e5e5',
            borderRadius: 24,
            fontSize: 15,
            outline: 'none',
            background: '#f9f9f9'
          }}
        />

        <button
          onClick={handleSend}
          aria-label='送信'
          disabled={!message.trim()}
          style={{
            background: message.trim() ? '#000' : '#e5e5e5',
            color: message.trim() ? '#fff' : '#999',
            border: 'none',
            cursor: message.trim() ? 'pointer' : 'not-allowed',
            width: 44,
            height: 44,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all .2s ease',
            flexShrink: 0
          }}
        >
          <IconSend size={20} />
        </button>
      </div>
    </div>
  );
};
export default GroupChatScreen;
