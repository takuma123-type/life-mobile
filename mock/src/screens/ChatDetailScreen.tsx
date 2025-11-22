import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { pushMessage } from '../store/chatSlice';
import { navigate } from '../store/uiSlice';
import { IconBack, IconGlobe, IconSend, IconPlus, IconStamp, IconFileText } from '../components/icons';
import { mockTranslate } from '../data/mockData';
import { designTokens } from '../styles/designTokens';

const ChatDetailScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector((s:any)=> s.chats.activeChatId);
  const users = useAppSelector((s:any)=> s.user.users);
  const messages = useAppSelector((s:any)=> s.chats.messages[activeChatId] || []);
  const user = users.find((u:any)=> u.id === activeChatId);
  const [input, setInput] = useState('');
  const [translated, setTranslated] = useState<Record<string,string>>({});
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const toggleTranslate = async (id:string, message:string) => {
    if(translated[id]) {
      const copy = { ...translated };
      delete copy[id];
      setTranslated(copy);
      return;
    }
    const t = await mockTranslate(message);
    setTranslated(prev => ({ ...prev, [id]: t }));
  };

  const send = () => {
    if (!input.trim()) return;
    dispatch(
      pushMessage({
        chatId: activeChatId,
        message: {
          id: 'm_' + Date.now(),
          sender: 'me',
          message: input.trim(),
          time: new Date().toLocaleTimeString().slice(0, 5)
        }
      })
    );
    setInput('');
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    // Enter は改行、Cmd+Enter / Ctrl+Enter で送信
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      send();
    }
  };

  // オンラインステータスの判定
  const isOnline = user?.online || false;

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
          background: `${designTokens.colors.background.primary}cc`,
          padding: `${designTokens.spacing.md} ${designTokens.spacing.md} ${designTokens.spacing.sm}`,
          display: 'flex',
          alignItems: 'center',
          gap: designTokens.spacing.md,
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: `1px solid ${designTokens.colors.border.light}`,
          position: 'sticky',
          top: 0,
          zIndex: 30,
          boxShadow: designTokens.shadow.sm
        }}
      >
        <button 
          onClick={() => dispatch(navigate('chat'))} 
          aria-label='戻る' 
          style={{ 
            background: designTokens.colors.primary.pale, 
            border: 'none', 
            cursor: 'pointer',
            width: 32,
            height: 32,
            borderRadius: designTokens.radius.circle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: designTokens.colors.text.primary,
            transition: designTokens.transition.fast,
            boxShadow: designTokens.shadow.md
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.background = designTokens.colors.primary.light;
            e.currentTarget.style.boxShadow = designTokens.shadow.lg;
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = designTokens.colors.primary.pale;
            e.currentTarget.style.boxShadow = designTokens.shadow.md;
          }}
        >
          <IconBack size={24} />
        </button>

        {/* ユーザーアバターとステータス */}
        <div style={{ position: 'relative', marginRight: 8 }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 700,
            color: '#0284c7',
            boxShadow: '0 2px 10px rgba(56, 189, 248, 0.5)'
          }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          {isOnline && (
            <div style={{
              position: 'absolute',
              bottom: 2,
              right: 2,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#10b981',
              border: '2px solid #fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }} />
          )}
        </div>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: 16, 
            fontWeight: 700, 
            color: '#0f172a',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}>
            {user?.name || 'チャット'}
          </h2>
          {isOnline && (
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#10b981', fontWeight: 500 }}>
              オンライン
            </p>
          )}
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

        {messages.map((m: any) => {
          const isMe = m.sender === 'me';
          const needsTranslation = user?.country && user.country !== '日本';

          return (
            <div 
              key={m.id}
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
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}

              <div style={{ 
                maxWidth: '76%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMe ? 'flex-end' : 'flex-start'
              }}>
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
                  {translated[m.id] || m.message}
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
                    {m.time}
                  </span>
                  
                  {/* 翻訳ボタン（外国のユーザーのメッセージのみ） */}
                  {needsTranslation && !isMe && (
                    <button
                      onClick={() => toggleTranslate(m.id, m.message)}
                      style={{
                        background: translated[m.id]
                          ? 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)'
                          : 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
                        border: '1.5px solid #BAE6FD',
                        borderRadius: 14,
                        padding: '6px 12px',
                        fontSize: 12,
                        cursor: 'pointer',
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
                      {translated[m.id] ? '原文' : '翻訳'}
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
                  Me
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
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
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
            maxHeight: 96 // 約3〜4行で打ち止め
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
          onClick={send}
          aria-label='送信'
          disabled={!input.trim()}
          style={{
            background: input.trim() 
              ? 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)' 
              : '#e5e7eb',
            color: input.trim() ? '#fff' : '#94a3b8',
            border: 'none',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            width: 44,
            height: 44,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all .18s ease-out',
            flexShrink: 0,
            boxShadow: input.trim() 
              ? '0 4px 14px rgba(14, 165, 233, 0.45)' 
              : '0 1px 4px rgba(148, 163, 184, 0.3)'
          }}
          onMouseOver={e => {
            if (input.trim()) {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.4)';
            }
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = input.trim() 
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
export default ChatDetailScreen;
