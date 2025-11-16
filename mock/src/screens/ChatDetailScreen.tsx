import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { pushMessage } from '../store/chatSlice';
import { navigate } from '../store/uiSlice';
import { IconBack, IconGlobe, IconSend, IconPlus } from '../components/icons';
import { mockTranslate } from '../data/mockData';

const ChatDetailScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector((s:any)=> s.chats.activeChatId);
  const users = useAppSelector((s:any)=> s.user.users);
  const messages = useAppSelector((s:any)=> s.chats.messages[activeChatId] || []);
  const user = users.find((u:any)=> u.id === activeChatId);
  const [input, setInput] = useState('');
  const [translated, setTranslated] = useState<Record<string,string>>({});
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const send = () => {
    if(!input.trim()) return;
    dispatch(pushMessage({ chatId: activeChatId, message: { id: 'm_'+Date.now(), sender:'me', message: input.trim(), time: new Date().toLocaleTimeString().slice(0,5) }}));
    setInput('');
  };

  const toggleTranslate = async (id:string, message:string) => {
    if(translated[id]) { const c={...translated}; delete c[id]; setTranslated(c); return; }
    const t = await mockTranslate(message); setTranslated(prev=> ({...prev, [id]: t }));
  };

  // オンラインステータスの判定
  const isOnline = user?.online || false;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      background: '#f8f9fa' 
    }}>
      {/* ヘッダー */}
      <div style={{ 
        background: '#fff',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <button 
          onClick={() => dispatch(navigate('chat'))} 
          aria-label='戻る' 
          style={{ 
            background: '#f1f5f9', 
            border: 'none', 
            cursor: 'pointer',
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1f2937',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = '#e2e8f0'}
          onMouseOut={e => e.currentTarget.style.background = '#f1f5f9'}
        >
          <IconBack size={24} />
        </button>

        {/* ユーザーアバターとステータス */}
        <div style={{ position: 'relative', marginRight: 8 }}>
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
            boxShadow: '0 2px 8px rgba(14, 165, 233, 0.15)'
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

        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#1f2937' }}>
            {user?.name || 'チャット'}
          </h2>
          {isOnline && (
            <p style={{ margin: '2px 0 0', fontSize: 13, color: '#10b981', fontWeight: 500 }}>
              オンライン
            </p>
          )}
        </div>
      </div>

      {/* 今日のセパレーター */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <span style={{ 
          background: 'rgba(148, 163, 184, 0.15)', 
          color: '#64748b',
          padding: '8px 20px', 
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 600,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(148, 163, 184, 0.1)'
        }}>
          今日
        </span>
      </div>

      {/* メッセージリスト */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
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
                maxWidth: '70%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMe ? 'flex-end' : 'flex-start'
              }}>
                {/* メッセージバブル */}
                <div style={{ 
                  background: isMe 
                    ? 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)' 
                    : '#fff',
                  color: isMe ? '#fff' : '#1f2937',
                  padding: '14px 18px',
                  borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  fontSize: 15,
                  lineHeight: 1.6,
                  wordBreak: 'break-word',
                  boxShadow: isMe 
                    ? '0 4px 12px rgba(14, 165, 233, 0.3)' 
                    : '0 2px 8px rgba(0,0,0,.08)'
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
                borderRadius: 12,
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 500,
                color: '#1f2937',
                transition: 'all 0.2s'
              }}
              onClick={() => {
                alert('画像選択機能は開発中です');
                setShowAttachMenu(false);
              }}
              onMouseOver={e => e.currentTarget.style.background = '#f8f9fa'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20
              }}>
                🖼️
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
                borderRadius: 12,
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 500,
                color: '#1f2937',
                transition: 'all 0.2s'
              }}
              onClick={() => {
                alert('スタンプ選択機能は開発中です');
                setShowAttachMenu(false);
              }}
              onMouseOver={e => e.currentTarget.style.background = '#f8f9fa'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20
              }}>
                😊
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
                borderRadius: 12,
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 500,
                color: '#1f2937',
                transition: 'all 0.2s'
              }}
              onClick={() => {
                alert('ファイル選択機能は開発中です');
                setShowAttachMenu(false);
              }}
              onMouseOver={e => e.currentTarget.style.background = '#f8f9fa'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20
              }}>
                📎
              </div>
              <span>ファイル</span>
            </button>
          </div>
        </div>
      )}

      {/* 入力エリア */}
      <div style={{ 
        background: '#fff',
        borderTop: '1px solid #e5e7eb',
        padding: '16px',
        display: 'flex',
        gap: 12,
        alignItems: 'flex-end',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        <button
          aria-label='添付'
          style={{
            background: showAttachMenu 
              ? 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)'
              : '#f1f5f9',
            border: 'none',
            cursor: 'pointer',
            width: 44,
            height: 44,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: showAttachMenu ? '#fff' : '#64748b',
            transition: 'all 0.2s',
            flexShrink: 0,
            boxShadow: showAttachMenu 
              ? '0 4px 12px rgba(14, 165, 233, 0.3)'
              : 'none'
          }}
          onClick={() => setShowAttachMenu(!showAttachMenu)}
          onMouseOver={e => {
            if (!showAttachMenu) {
              e.currentTarget.style.background = '#e2e8f0';
            }
          }}
          onMouseOut={e => {
            if (!showAttachMenu) {
              e.currentTarget.style.background = '#f1f5f9';
            }
          }}
        >
          <IconPlus size={24} />
        </button>

        <input
          type="text"
          placeholder="メッセージを入力..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && send()}
          style={{
            flex: 1,
            padding: '14px 20px',
            border: '2px solid #e5e7eb',
            borderRadius: 24,
            fontSize: 15,
            outline: 'none',
            background: '#f8f9fa',
            transition: 'all 0.2s',
            color: '#1f2937'
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
            width: 48,
            height: 48,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all .2s ease',
            flexShrink: 0,
            boxShadow: input.trim() 
              ? '0 4px 12px rgba(14, 165, 233, 0.3)' 
              : 'none'
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
