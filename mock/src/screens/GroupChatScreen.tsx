import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { navigate } from '../store/uiSlice';
import { IconBack, IconSend, IconPlus, IconAvatar, IconGlobe, IconStamp, IconFileText } from '../components/icons';
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
  const [showAttachMenu, setShowAttachMenu] = useState(false);

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
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        background: '#f8fafc',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* ヘッダー */}
      <div
        style={{ 
          background: '#ffffffcc',
          padding: '12px 16px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
          position: 'sticky',
          top: 0,
          zIndex: 30
        }}
      >
        <button 
          onClick={() => dispatch(navigate('chat'))} 
          aria-label='戻る' 
          style={{ 
            background: '#e5f2ff', 
            border: 'none', 
            cursor: 'pointer',
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f172a',
            transition: 'all 0.18s ease-out',
            boxShadow: '0 2px 8px rgba(148, 163, 184, 0.35)'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.background = '#dbeafe';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#e5f2ff';
          }}
        >
          <IconBack size={24} />
        </button>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: 16, 
            fontWeight: 700, 
            color: '#0f172a',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}>
            {community?.name || 'カフェ好き集まれ'}
          </h2>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748b', fontWeight: 500 }}>
            {community?.members || '231'}人のメンバー
          </p>
        </div>
      </div>

      {/* メッセージリスト */}
      <div 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '12px 16px 16px',
          background: 'linear-gradient(to bottom, #f9fafb 0%, #ecfeff 40%, #f9fafb 100%)'
        }}
      >
        {/* 日付セパレーター */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '8px 0 20px',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <span style={{ 
            background: 'rgba(148, 163, 184, 0.16)', 
            color: '#64748b',
            padding: '6px 18px', 
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(148, 163, 184, 0.18)'
          }}>
            2025.11.13. 木曜日
          </span>
        </div>
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
                alignItems: 'flex-start',
                animation: 'messageSlideIn 0.3s ease-out'
              }}
            >
              {/* アバター */}
              {!isMe && (
                <div style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#0284c7',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(14, 165, 233, 0.15)'
                }}>
                  {msg.avatar}
                </div>
              )}

              <div style={{ 
                maxWidth: '76%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMe ? 'flex-end' : 'flex-start'
              }}>
                {/* ユーザー名 */}
                {!isMe && (
                  <span style={{ 
                    fontSize: 13, 
                    color: '#64748b',
                    marginBottom: 6,
                    paddingLeft: 4,
                    fontWeight: 600
                  }}>
                    {msg.userName}
                  </span>
                )}

                {/* メッセージバブル */}
                <div style={{ 
                  background: isMe 
                    ? 'linear-gradient(135deg, #10b981 0%, #14b8a6 45%, #06b6d4 100%)' 
                    : '#ffffff',
                  color: isMe ? '#f9fafb' : '#0f172a',
                  padding: '10px 14px',
                  borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  fontSize: 15,
                  lineHeight: 1.6,
                  wordBreak: 'break-word',
                  boxShadow: isMe 
                    ? '0 4px 14px rgba(34, 197, 94, 0.35)' 
                    : '0 2px 8px rgba(15, 23, 42, 0.12)',
                  border: isMe ? 'none' : '1px solid rgba(226, 232, 240, 0.9)',
                  transition: 'transform .18s ease-out, box-shadow .18s ease-out'
                }}>
                  {translations[msg.id] || msg.message}
                </div>

                {/* 時間と翻訳ボタン */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 8,
                  marginTop: 6,
                  paddingLeft: isMe ? 0 : 4,
                  paddingRight: isMe ? 4 : 0
                }}>
                  <span style={{ 
                    fontSize: 12, 
                    color: '#94a3b8',
                    fontWeight: 500
                  }}>
                    {msg.time}
                  </span>
                  
                  {/* 翻訳ボタン(他言語メッセージのみ) */}
                  {needsTranslation && !isMe && (
                    <button
                      onClick={() => handleTranslate(msg.id, msg.message)}
                      disabled={translating === msg.id}
                      style={{
                        background: translations[msg.id]
                          ? 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)'
                          : 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
                        border: '1.5px solid #BAE6FD',
                        borderRadius: 14,
                        padding: '6px 12px',
                        fontSize: 12,
                        cursor: translating === msg.id ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        fontWeight: 600,
                        color: '#0284c7',
                        transition: 'all .2s ease',
                        boxShadow: '0 2px 4px rgba(14, 165, 233, 0.1)'
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(14, 165, 233, 0.2)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(14, 165, 233, 0.1)';
                      }}
                    >
                      <IconGlobe size={14} />
                      {translating === msg.id ? '翻訳中...' : translations[msg.id] ? '原文' : '翻訳'}
                    </button>
                  )}
                </div>
              </div>

              {/* 自分のアバター */}
              {isMe && (
                <div style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 700,
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}>
                  {msg.avatar}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 添付メニュー */}
      {showAttachMenu && (
        <div 
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setShowAttachMenu(false)}
        >
          <div 
            style={{
              position: 'absolute',
              bottom: 80,
              left: 16,
              background: '#fff',
              borderRadius: 20,
              padding: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              animation: 'slideUp 0.3s ease-out',
              minWidth: 200
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '14px 16px',
                background: 'none',
                border: 'none',
                borderRadius: 16,
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 500,
                color: '#0f172a',
                transition: 'all 0.2s'
              }}
              onClick={() => {
                alert('画像選択機能は開発中です');
                setShowAttachMenu(false);
              }}
              onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ecfdf5',
                boxShadow: '0 6px 16px rgba(16, 185, 129, 0.5)'
              }}>
                <IconFileText size={22} />
              </div>
              <span>画像</span>
            </button>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '14px 16px',
                background: 'none',
                border: 'none',
                borderRadius: 16,
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 500,
                color: '#0f172a',
                transition: 'all 0.2s'
              }}
              onClick={() => {
                alert('スタンプ選択機能は開発中です');
                setShowAttachMenu(false);
              }}
              onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fefce8',
                boxShadow: '0 6px 16px rgba(245, 158, 11, 0.5)'
              }}>
                <IconStamp size={22} />
              </div>
              <span>スタンプ</span>
            </button>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '14px 16px',
                background: 'none',
                border: 'none',
                borderRadius: 16,
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 500,
                color: '#0f172a',
                transition: 'all 0.2s'
              }}
              onClick={() => {
                alert('ファイル選択機能は開発中です');
                setShowAttachMenu(false);
              }}
              onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#eef2ff',
                boxShadow: '0 6px 16px rgba(79, 70, 229, 0.55)'
              }}>
                <IconFileText size={22} />
              </div>
              <span>ファイル</span>
            </button>
          </div>
        </div>
      )}

      {/* 入力エリア */}
      <div 
        style={{ 
          background: '#ffffffcc',
          borderTop: '1px solid rgba(226, 232, 240, 0.9)',
          padding: '10px 12px 18px',
          display: 'flex',
          gap: 10,
          alignItems: 'flex-end',
          boxShadow: '0 -8px 30px rgba(15, 23, 42, 0.18)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)'
        }}
      >
        <button
          aria-label='添付'
          style={{
            background: showAttachMenu 
              ? 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)'
              : '#e5f2ff',
            border: 'none',
            cursor: 'pointer',
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: showAttachMenu ? '#fff' : '#0f172a',
            transition: 'all 0.18s ease-out',
            flexShrink: 0,
            boxShadow: showAttachMenu 
              ? '0 4px 14px rgba(14, 165, 233, 0.45)'
              : '0 2px 8px rgba(148, 163, 184, 0.35)'
          }}
          onClick={() => setShowAttachMenu(!showAttachMenu)}
          onMouseOver={e => {
            if (!showAttachMenu) {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.background = '#dbeafe';
            }
          }}
          onMouseOut={e => {
            if (!showAttachMenu) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = '#e5f2ff';
            }
          }}
        >
          <IconPlus size={24} />
        </button>

        <textarea
          placeholder="メッセージを入力..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '1.5px solid #e5e7eb',
            borderRadius: 16,
            fontSize: 15,
            outline: 'none',
            background: '#f8fafc',
            transition: 'all 0.18s ease-out',
            color: '#0f172a',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)',
            resize: 'none',
            lineHeight: 1.5,
            maxHeight: 96
          }}
          onFocus={e => {
            e.target.style.borderColor = '#0EA5E9';
            e.target.style.background = '#fff';
            e.target.style.boxShadow = '0 0 0 4px rgba(14, 165, 233, 0.1)';
          }}
          onBlur={e => {
            e.target.style.borderColor = '#e5e7eb';
            e.target.style.background = '#f8f9fa';
            e.target.style.boxShadow = 'none';
          }}
        />

        <button
          onClick={handleSend}
          aria-label='送信'
          disabled={!message.trim()}
          style={{
            background: message.trim() 
              ? 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)' 
              : '#e5e7eb',
            color: message.trim() ? '#fff' : '#94a3b8',
            border: 'none',
            cursor: message.trim() ? 'pointer' : 'not-allowed',
            width: 44,
            height: 44,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all .18s ease-out',
            flexShrink: 0,
            boxShadow: message.trim() 
              ? '0 4px 14px rgba(14, 165, 233, 0.45)' 
              : '0 1px 4px rgba(148, 163, 184, 0.3)'
          }}
          onMouseOver={e => {
            if (message.trim()) {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.4)';
            }
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = message.trim() 
              ? '0 4px 12px rgba(14, 165, 233, 0.3)' 
              : 'none';
          }}
        >
          <IconSend size={22} />
        </button>
      </div>
    </div>
  );
};
export default GroupChatScreen;
