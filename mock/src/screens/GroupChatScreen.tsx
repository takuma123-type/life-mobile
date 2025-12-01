import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { navigate } from '../store/uiSlice';
import { IconBack, IconSend, IconPlus, IconAvatar, IconGlobe, IconStamp, IconFileText } from '../components/icons';
import { leaveCommunity } from '../store/communitySlice';
import { mockTranslate } from '../data/mockData';
import { designTokens } from '../styles/designTokens';

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
  const [showMoreMenu, setShowMoreMenu] = useState(false);

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

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: designTokens.typography.h4.fontSize, 
            fontWeight: designTokens.typography.h4.fontWeight as number, 
            color: designTokens.colors.text.primary,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}>
            {community?.name || 'カフェ好き集まれ'}
          </h2>
          <p style={{ margin: `${designTokens.spacing.xs} 0 0`, fontSize: designTokens.typography.caption.fontSize, color: designTokens.colors.text.tertiary, fontWeight: 500 }}>
            {community?.members || '231'}人のメンバー
          </p>
        </div>

        {/* 三点リーダー（その他メニュー） */}
        <div style={{ position:'relative' }}>
          <button
            aria-label='その他'
            onClick={()=> setShowMoreMenu(prev=> !prev)}
            style={{
              background: '#eef2ff',
              border: 'none',
              cursor: 'pointer',
              width: 32,
              height: 32,
              borderRadius: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#334155',
              boxShadow: designTokens.shadow.md,
              transition: 'all .18s ease-out'
            }}
            onMouseOver={e=>{
              e.currentTarget.style.transform='translateY(-2px)';
              e.currentTarget.style.background='#e0e7ff';
            }}
            onMouseOut={e=>{
              e.currentTarget.style.transform='translateY(0)';
              e.currentTarget.style.background='#eef2ff';
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>⋯</span>
          </button>

          {showMoreMenu && (
            <div
              style={{
                position:'absolute',
                right:0,
                top:40,
                background:'#fff',
                border:'1px solid rgba(226,232,240,0.9)',
                borderRadius:12,
                boxShadow:'0 8px 24px rgba(15,23,42,0.12)',
                minWidth:180,
                overflow:'hidden',
                zIndex: 50
              }}
            >
              <button
                style={{
                  width:'100%',
                  padding:'12px 14px',
                  background:'none',
                  border:'none',
                  textAlign:'left',
                  cursor:'pointer',
                  fontSize:14,
                  color:'#b91c1c',
                  fontWeight:600
                }}
                onClick={()=>{
                  if (!id) return;
                  const ok = window.confirm('このコミュニティを退出しますか？');
                  if (!ok) return;
                  dispatch(leaveCommunity(id));
                  setShowMoreMenu(false);
                  dispatch(setActiveCommunity(null));
                  dispatch(navigate('chat'));
                }}
                onMouseOver={e=> e.currentTarget.style.background = '#fff1f2'}
                onMouseOut={e=> e.currentTarget.style.background = 'none'}
              >
                コミュニティを退出
              </button>

              <button
                style={{
                  width:'100%',
                  padding:'12px 14px',
                  background:'none',
                  border:'none',
                  textAlign:'left',
                  cursor:'pointer',
                  fontSize:14,
                  color:'#0f172a'
                }}
                onClick={()=> setShowMoreMenu(false)}
                onMouseOver={e=> e.currentTarget.style.background = '#f8fafc'}
                onMouseOut={e=> e.currentTarget.style.background = 'none'}
              >
                キャンセル
              </button>
            </div>
          )}
        </div>
      </div>

      {/* メッセージリスト */}
      <div 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: `${designTokens.spacing.md} ${designTokens.spacing.lg} ${designTokens.spacing.lg}`,
          background: `linear-gradient(to bottom, ${designTokens.colors.neutral[50]} 0%, ${designTokens.colors.primary.pale} 40%, ${designTokens.colors.neutral[50]} 100%)`
        }}
      >
        {/* 日付セパレーター */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: `${designTokens.spacing.sm} 0 ${designTokens.spacing.xl}`,
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <span style={{ 
            background: designTokens.colors.neutral[100], 
            color: designTokens.colors.text.tertiary,
            padding: `6px ${designTokens.spacing.lg}`, 
            borderRadius: designTokens.radius.pill,
            fontSize: designTokens.typography.caption.fontSize,
            fontWeight: 600,
            letterSpacing: '0.08em',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${designTokens.colors.border.light}`
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
                  borderRadius: designTokens.radius.circle,
                  background: `linear-gradient(135deg, ${designTokens.colors.primary.pale} 0%, ${designTokens.colors.secondary.light} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: designTokens.typography.body.fontSize,
                  fontWeight: 700,
                  color: designTokens.colors.secondary.dark,
                  flexShrink: 0,
                  boxShadow: designTokens.shadow.sm
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
                    fontSize: designTokens.typography.small.fontSize, 
                    color: designTokens.colors.text.tertiary,
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
                    ? `linear-gradient(135deg, ${designTokens.colors.primary.main} 0%, ${designTokens.colors.secondary.main} 100%)` 
                    : designTokens.colors.background.primary,
                  color: isMe ? designTokens.colors.text.inverse : designTokens.colors.text.primary,
                  padding: `10px ${designTokens.spacing.md}`,
                  borderRadius: isMe ? `${designTokens.radius.lg} ${designTokens.radius.lg} 4px ${designTokens.radius.lg}` : `${designTokens.radius.lg} ${designTokens.radius.lg} ${designTokens.radius.lg} 4px`,
                  fontSize: designTokens.typography.h4.fontSize,
                  lineHeight: 1.6,
                  wordBreak: 'break-word',
                  boxShadow: isMe 
                    ? designTokens.shadow.primary 
                    : designTokens.shadow.sm,
                  border: isMe ? 'none' : `1px solid ${designTokens.colors.border.light}`,
                  transition: `${designTokens.transition.fast} cubic-bezier(0.4,0,0.2,1)`
                }}>
                  {translations[msg.id] || msg.message}
                </div>

                {/* 時間と翻訳ボタン */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: designTokens.spacing.sm,
                  marginTop: 6,
                  paddingLeft: isMe ? 0 : 4,
                  paddingRight: isMe ? 4 : 0
                }}>
                  <span style={{ 
                    fontSize: designTokens.typography.caption.fontSize, 
                    color: designTokens.colors.neutral[400],
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
                        background: `linear-gradient(135deg, ${designTokens.colors.primary.pale} 0%, ${designTokens.colors.secondary.light} 100%)`,
                        border: `1.5px solid ${designTokens.colors.secondary.light}`,
                        borderRadius: designTokens.radius.md,
                        padding: `6px ${designTokens.spacing.md}`,
                        fontSize: designTokens.typography.caption.fontSize,
                        cursor: translating === msg.id ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        fontWeight: 600,
                        color: designTokens.colors.secondary.dark,
                        transition: designTokens.transition.base,
                        boxShadow: designTokens.shadow.sm
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = designTokens.shadow.md;
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = designTokens.shadow.sm;
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
                  borderRadius: designTokens.radius.circle,
                  background: `linear-gradient(135deg, ${designTokens.colors.neutral[800]} 0%, ${designTokens.colors.neutral[600]} 100%)`,
                  color: designTokens.colors.text.inverse,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: designTokens.typography.body.fontSize,
                  fontWeight: 700,
                  flexShrink: 0,
                  boxShadow: designTokens.shadow.sm
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
              left: designTokens.spacing.lg,
              background: designTokens.colors.background.primary,
              borderRadius: designTokens.radius.xl,
              padding: designTokens.spacing.md,
              boxShadow: designTokens.shadow.xl,
              animation: 'slideUp 0.3s ease-out',
              minWidth: 200
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: designTokens.spacing.md,
                width: '100%',
                padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
                background: 'none',
                border: 'none',
                borderRadius: designTokens.radius.lg,
                cursor: 'pointer',
                fontSize: designTokens.typography.h4.fontSize,
                fontWeight: 500,
                color: designTokens.colors.text.primary,
                transition: designTokens.transition.base
              }}
              onClick={() => {
                alert('画像選択機能は開発中です');
                setShowAttachMenu(false);
              }}
              onMouseOver={e => e.currentTarget.style.background = designTokens.colors.neutral[50]}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: designTokens.radius.lg,
                background: `linear-gradient(135deg, ${designTokens.colors.primary.main} 0%, ${designTokens.colors.primary.light} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: designTokens.colors.text.inverse,
                boxShadow: designTokens.shadow.primary
              }}>
                <IconFileText size={22} />
              </div>
              <span>画像</span>
            </button>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: designTokens.spacing.md,
                width: '100%',
                padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
                background: 'none',
                border: 'none',
                borderRadius: designTokens.radius.lg,
                cursor: 'pointer',
                fontSize: designTokens.typography.h4.fontSize,
                fontWeight: 500,
                color: designTokens.colors.text.primary,
                transition: designTokens.transition.base
              }}
              onClick={() => {
                alert('スタンプ選択機能は開発中です');
                setShowAttachMenu(false);
              }}
              onMouseOver={e => e.currentTarget.style.background = designTokens.colors.neutral[50]}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: designTokens.radius.lg,
                background: `linear-gradient(135deg, ${designTokens.colors.secondary.main} 0%, ${designTokens.colors.secondary.light} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: designTokens.colors.text.inverse,
                boxShadow: designTokens.shadow.md
              }}>
                <IconStamp size={22} />
              </div>
              <span>スタンプ</span>
            </button>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: designTokens.spacing.md,
                width: '100%',
                padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
                background: 'none',
                border: 'none',
                borderRadius: designTokens.radius.lg,
                cursor: 'pointer',
                fontSize: designTokens.typography.h4.fontSize,
                fontWeight: 500,
                color: designTokens.colors.text.primary,
                transition: designTokens.transition.base
              }}
              onClick={() => {
                alert('ファイル選択機能は開発中です');
                setShowAttachMenu(false);
              }}
              onMouseOver={e => e.currentTarget.style.background = designTokens.colors.neutral[50]}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: designTokens.radius.lg,
                background: `linear-gradient(135deg, ${designTokens.colors.neutral[600]} 0%, ${designTokens.colors.neutral[500]} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: designTokens.colors.text.inverse,
                boxShadow: designTokens.shadow.md
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
          background: `${designTokens.colors.background.primary}cc`,
          borderTop: `1px solid ${designTokens.colors.border.light}`,
          padding: `10px ${designTokens.spacing.md} ${designTokens.spacing.lg}`,
          display: 'flex',
          gap: 10,
          alignItems: 'flex-end',
          boxShadow: designTokens.shadow.lg,
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)'
        }}
      >
        <button
          aria-label='添付'
          style={{
            background: showAttachMenu 
              ? `linear-gradient(135deg, ${designTokens.colors.secondary.main} 0%, ${designTokens.colors.secondary.light} 100%)`
              : designTokens.colors.primary.pale,
            border: 'none',
            cursor: 'pointer',
            width: 40,
            height: 40,
            borderRadius: designTokens.radius.circle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: showAttachMenu ? designTokens.colors.text.inverse : designTokens.colors.text.primary,
            transition: designTokens.transition.fast,
            flexShrink: 0,
            boxShadow: showAttachMenu 
              ? designTokens.shadow.md
              : designTokens.shadow.sm
          }}
          onClick={() => setShowAttachMenu(!showAttachMenu)}
          onMouseOver={e => {
            if (!showAttachMenu) {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.background = designTokens.colors.secondary.light;
            }
          }}
          onMouseOut={e => {
            if (!showAttachMenu) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = designTokens.colors.primary.pale;
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
            padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
            border: `1.5px solid ${designTokens.colors.border.medium}`,
            borderRadius: designTokens.radius.lg,
            fontSize: designTokens.typography.h4.fontSize,
            outline: 'none',
            background: designTokens.colors.neutral[50],
            transition: designTokens.transition.fast,
            color: designTokens.colors.text.primary,
            boxShadow: designTokens.shadow.sm,
            resize: 'none',
            lineHeight: 1.5,
            maxHeight: 96
          }}
          onFocus={e => {
            e.target.style.borderColor = designTokens.colors.secondary.main;
            e.target.style.background = designTokens.colors.background.primary;
            e.target.style.boxShadow = `0 0 0 4px ${designTokens.colors.primary.pale}`;
          }}
          onBlur={e => {
            e.target.style.borderColor = designTokens.colors.border.medium;
            e.target.style.background = designTokens.colors.neutral[50];
            e.target.style.boxShadow = 'none';
          }}
        />

        <button
          onClick={handleSend}
          aria-label='送信'
          disabled={!message.trim()}
          style={{
            background: message.trim() 
              ? `linear-gradient(135deg, ${designTokens.colors.secondary.main} 0%, ${designTokens.colors.secondary.light} 100%)` 
              : designTokens.colors.border.medium,
            color: message.trim() ? designTokens.colors.text.inverse : designTokens.colors.neutral[400],
            border: 'none',
            cursor: message.trim() ? 'pointer' : 'not-allowed',
            width: 44,
            height: 44,
            borderRadius: designTokens.radius.circle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: designTokens.transition.fast,
            flexShrink: 0,
            boxShadow: message.trim() 
              ? designTokens.shadow.md 
              : designTokens.shadow.sm
          }}
          onMouseOver={e => {
            if (message.trim()) {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = designTokens.shadow.lg;
            }
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = message.trim() 
              ? designTokens.shadow.md 
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
