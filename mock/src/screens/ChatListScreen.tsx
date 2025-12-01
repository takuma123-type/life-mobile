import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setActiveChat } from '../store/chatSlice';
import { navigate, openSmsModal, openGuestProfileModal } from '../store/uiSlice';
import { toggleFollow, setActiveUserId } from '../store/userSlice';
import { setActiveCommunity, setCommunities } from '../store/communitySlice';
import BottomNav from '../components/common/BottomNav';
import { IconSearch, IconAvatar, IconCalendar, IconMapPin, IconClock } from '../components/icons';
import Button from '../components/common/Button';
import { mockTranslate } from '../data/mockData';
import { designTokens } from '../styles/designTokens';

const ChatListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((s:any)=> s.user.users);
  const following = useAppSelector((s:any)=> s.user.following);
  const communities = useAppSelector((s:any)=> s.communities.list);
  const isAuthenticated = useAppSelector((s:any)=> s.ui.isAuthenticated);
  const me = useAppSelector((s:any)=> s.user.me);
  const [tab, setTab] = useState<'following'|'open'>('open');
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [searchAge, setSearchAge] = useState('');
  const [searchRegion, setSearchRegion] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // 無限スクロール用の状態
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  
  // コミュニティ検索用の状態
  const [communitySearchOpen, setCommunitySearchOpen] = useState(false);
  const [communityKeyword, setCommunityKeyword] = useState('');
  const [communityCategory, setCommunityCategory] = useState('');
  const [communityShowResults, setCommunityShowResults] = useState(false);
  const [communitySearchResults, setCommunitySearchResults] = useState<any[]>([]);
  
  // ユーザー表示モード
  const [userMode, setUserMode] = useState<'friends' | 'all'>('all');
  
  // コミュニティ表示モード
  const [communityMode, setCommunityMode] = useState<'all' | 'joined' | 'popular'>('all');
  
  // コミュニティ作成モーダル
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityCategory, setNewCommunityCategory] = useState('');
  const [newCommunityImage, setNewCommunityImage] = useState('');
  const [newCommunityDesc, setNewCommunityDesc] = useState('');

  // フレンド・参加中のダイジェスト
  const friendsList = isAuthenticated && me ? users.slice(0, 5) : [];
  const joinedCommunities = isAuthenticated && me ? communities.slice(0, 2) : [];

  // コミュニティ詳細モーダル
  const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
  const [showCommunityDetail, setShowCommunityDetail] = useState(false);

  // 都道府県選択
  const [showPrefectureModal, setShowPrefectureModal] = useState(false);

  // ユーザー検索
  const handleSearch = () => {
    const results = users.filter((u:any) => {
      if (keyword && !u.name.toLowerCase().includes(keyword.toLowerCase()) && !(u.message||'').toLowerCase().includes(keyword.toLowerCase())) return false;
      if (searchAge && u.age !== searchAge) return false;
      if (searchRegion && u.region !== searchRegion) return false;
      if (searchTime && u.activeTime !== searchTime) return false;
      return true;
    });
    setSearchResults(results);
    setShowResults(true);
  };

  const resetSearch = () => {
    setKeyword('');
    setSearchAge('');
    setSearchRegion('');
    setSearchTime('');
    setShowResults(false);
    setSearchResults([]);
  };

  // コミュニティ検索
  const handleCommunitySearch = () => {
    const results = communities.filter((c:any) => {
      if (communityKeyword && !c.name.toLowerCase().includes(communityKeyword.toLowerCase())) return false;
      if (communityCategory && c.category !== communityCategory) return false;
      return true;
    });
    setCommunitySearchResults(results);
    setCommunityShowResults(true);
  };

  const resetCommunitySearch = () => {
    setCommunityKeyword('');
    setCommunityCategory('');
    setCommunityShowResults(false);
    setCommunitySearchResults([]);
  };
  

  // ユーザーのフィルタリング
  const blocked = useAppSelector((s:any)=> s.user.blocked || {});
  const getFilteredUsers = () => {
    let filtered = users
      .filter((u:any)=> !keyword || u.name.toLowerCase().includes(keyword.toLowerCase()) || (u.message||'').toLowerCase().includes(keyword.toLowerCase()))
      .filter((u:any)=> !blocked[u.id]);
    
    // モードによる絞り込み
    if (userMode === 'friends') {
      // フレンドモード: フォロー中のユーザーのみ（デモ用に最初の5人）
      filtered = filtered.slice(0, 5);
    }
    // 'all' の場合は全てのユーザーを表示
    
    return filtered;
  };
  
  // コミュニティのフィルタリング
  const getFilteredCommunities = () => {
    let filtered = communities.filter((c:any)=> !keyword || c.name.toLowerCase().includes(keyword.toLowerCase()));
    
    // モードによる絞り込みと並び替え
    if (communityMode === 'joined') {
      // 参加中のコミュニティのみ（デモ用に最初の2つ）
      filtered = filtered.slice(0, 2);
    } else if (communityMode === 'popular') {
      // 人気順（メンバー数が多い順）
      filtered = [...filtered].sort((a, b) => b.members - a.members);
    }
    // 'all' の場合は全てのコミュニティをデフォルト順で表示
    
    return filtered;
  };
  
  const filteredUsers = getFilteredUsers();
  const filteredCommunities = getFilteredCommunities();
  
  // ユーザー表示（無限スクロール対応）
  const displayUsers = filteredUsers.slice(0, displayCount);

  // スクロール検知
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollPercentage = (target.scrollTop + target.clientHeight) / target.scrollHeight;
    
    // 80%スクロールしたら次の10件を読み込み
    if (scrollPercentage > 0.8 && !isLoading && displayCount < users.length) {
      setIsLoading(true);
      setTimeout(() => {
        setDisplayCount(prev => prev + 10);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div 
      style={{ paddingBottom:80, background: designTokens.colors.background.primary, minHeight:'100vh', height:'100vh' }}
      onScroll={handleScroll}
    >
      {/* ヘッダー */}
      <div style={{ 
        position:'sticky', 
        top:0, 
        zIndex:10,
        background: designTokens.colors.background.primary, 
        borderBottom: `1px solid ${designTokens.colors.border.light}`
      }}>
        {/* アプリ名と検索 */}
        <div style={{ 
          display:'flex', 
          alignItems:'center',
          justifyContent:'space-between',
          padding:'12px 20px 4px 20px',
          position:'relative'
        }}>
          {/* 左側スペース */}
          <div style={{ width:40 }} />
          
          {/* 中央: アプリ名 */}
          <div style={{
            fontSize:22,
            fontWeight:700,
            letterSpacing:'0.1em',
            color:'#000',
            position:'absolute',
            left:'50%',
            transform:'translateX(-50%)'
          }}>
            LIFE
          </div>
          
          {/* 右側: 検索ボタン */}
          <button
            onClick={() => {
              if (tab === 'following') {
                setSearchOpen(!searchOpen);
              } else {
                setCommunitySearchOpen(!communitySearchOpen);
              }
            }}
            style={{
              background:'none',
              border:'none',
              padding:8,
              cursor:'pointer',
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <IconSearch size={24} color="#000" />
          </button>
        </div>
        
        {/* タブ (UI改善.md Q6対応) */}
        <div style={{ 
          display:'flex', 
          alignItems:'center',
          justifyContent:'center',
          padding:'0 20px',
          gap:40
        }}>
          <button 
            onClick={()=>setTab('following')}
            style={{ 
              background:'none',
              border:'none',
              padding:'14px 0',
              fontSize: tab === 'following' ? designTokens.typography.h4.fontSize : designTokens.typography.body.fontSize,
              fontWeight: tab === 'following' ? 700 : 400,
              color: tab === 'following' ? designTokens.colors.text.primary : designTokens.colors.text.tertiary,
              cursor:'pointer',
              position:'relative',
              transition: designTokens.transition.base
            }}
          >
            さがす
            {tab === 'following' && (
              <div style={{
                position:'absolute',
                bottom:0,
                left:0,
                right:0,
                height:3,
                background: `linear-gradient(90deg, ${designTokens.colors.primary.dark} 0%, ${designTokens.colors.primary.main} 100%)`,
                borderRadius: `${designTokens.radius.xs} ${designTokens.radius.xs} 0 0`,
                /* boxShadow removed */
              }} />
            )}
          </button>
          <button 
            onClick={()=>setTab('open')}
            style={{ 
              background:'none',
              border:'none',
              padding:'14px 0',
              fontSize: tab === 'open' ? designTokens.typography.h4.fontSize : designTokens.typography.body.fontSize,
              fontWeight: tab === 'open' ? 700 : 400,
              color: tab === 'open' ? designTokens.colors.text.primary : designTokens.colors.text.tertiary,
              cursor:'pointer',
              position:'relative',
              transition: designTokens.transition.base
            }}
          >
            コミュニティ
            {tab === 'open' && (
              <div style={{
                position:'absolute',
                bottom:0,
                left:0,
                right:0,
                height:3,
                background: `linear-gradient(90deg, ${designTokens.colors.primary.dark} 0%, ${designTokens.colors.primary.main} 100%)`,
                borderRadius: `${designTokens.radius.xs} ${designTokens.radius.xs} 0 0`,
                /* boxShadow removed */
              }} />
            )}
          </button>
        </div>
      </div>

      {tab==='following' && (
        <div>
          {/* サブタブ: すべて / フレンド (UI改善.md Q6対応) */}
          <div style={{ 
            padding: `${designTokens.spacing.md} ${designTokens.spacing.md} ${designTokens.spacing.xl} ${designTokens.spacing.md}`, 
            background: designTokens.colors.background.primary
          }}>
            <div style={{ display:'flex', gap:designTokens.spacing.lg, alignItems:'center' }}>
              <button
                onClick={() => setUserMode('all')}
                style={{
                  background:'none',
                  border:'none',
                  padding: `${designTokens.spacing.sm} 0`,
                  fontSize: designTokens.typography.h4.fontSize,
                  fontWeight: userMode === 'all' ? 700 : 400,
                  color: userMode === 'all' ? designTokens.colors.text.primary : designTokens.colors.text.tertiary,
                  cursor:'pointer',
                  position:'relative',
                  transition: designTokens.transition.base,
                  whiteSpace:'nowrap'
                }}
              >
                すべて
                {userMode === 'all' && (
                  <div style={{
                    position:'absolute',
                    bottom: `-${designTokens.spacing.md}`,
                    left:0,
                    right:0,
                    height:3,
                    background: designTokens.colors.text.primary,
                    borderRadius: designTokens.radius.xs
                  }} />
                )}
              </button>
              <button
                onClick={() => {
                  if (!isAuthenticated || !me) {
                    dispatch(openSmsModal());
                    return;
                  }
                  setUserMode('friends');
                }}
                style={{
                  background:'none',
                  border:'none',
                  padding: `${designTokens.spacing.sm} 0`,
                  fontSize: designTokens.typography.h4.fontSize,
                  fontWeight: userMode === 'friends' ? 700 : 400,
                  color: userMode === 'friends' ? designTokens.colors.text.primary : designTokens.colors.text.tertiary,
                  cursor:'pointer',
                  position:'relative',
                  transition: designTokens.transition.base,
                  whiteSpace:'nowrap'
                }}
              >
                フレンド
                {userMode === 'friends' && (
                  <div style={{
                    position:'absolute',
                    bottom: `-${designTokens.spacing.md}`,
                    left:0,
                    right:0,
                    height:3,
                    background: designTokens.colors.text.primary,
                    borderRadius: designTokens.radius.xs
                  }} />
                )}
              </button>
              {/* 作成ボタン削除（ユーザー側） */}
            </div>
          </div>

          {/* フレンドモード: ログイン後のみ表示 */}
          {isAuthenticated && me && userMode === 'friends' && (
            <div style={{ padding: designTokens.spacing.lg, background: designTokens.colors.background.primary }}>
              <div style={{ 
                padding: `0 4px ${designTokens.spacing.md}`, 
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between'
              }}>
                <h3 style={{ margin:0, fontSize: designTokens.typography.h4.fontSize, fontWeight: designTokens.typography.h4.fontWeight as number, color: designTokens.colors.text.primary }}>フレンド</h3>
                <span style={{ fontSize: designTokens.typography.small.fontSize, color: designTokens.colors.text.secondary, fontWeight:600 }}>{friendsList.length}人</span>
              </div>
              
              {/* カードUIリスト */}
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {friendsList.map((u:any, index:number) => (
                  <div
                    key={u.id}
                    onClick={() => {
                      dispatch(setActiveChat(u.id));
                      dispatch(navigate('chatDetail'));
                    }}
                    style={{
                      display:'flex',
                      alignItems:'center',
                      gap: designTokens.spacing.md,
                      padding: designTokens.spacing.md,
                      cursor:'pointer',
                      transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                      background: designTokens.colors.background.primary,
                      borderRadius: 3,
                      border: `1px solid ${designTokens.colors.border.light}`
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = designTokens.shadow.cardHover;
                      e.currentTarget.style.borderColor = designTokens.colors.primary.main;
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = designTokens.shadow.card;
                      e.currentTarget.style.borderColor = designTokens.colors.border.light;
                    }}
                  >
                    {/* アバター */}
                    <div style={{ position:'relative', flexShrink:0 }}>
                      <div style={{
                        width:60,
                        height:60,
                        borderRadius: designTokens.radius.circle,
                        overflow:'hidden',
                        background: `linear-gradient(135deg, ${designTokens.colors.primary.pale} 0%, ${designTokens.colors.secondary.light} 100%)`,
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        border: `2px solid ${designTokens.colors.background.primary}`,
                        /* boxShadow removed */
                      }}>
                        <img 
                          src={u.avatar || 'https://image.p-c2-x.abema-tv.com/image/series/19-15/thumb.png?height=720&quality=75&version=1741061716&width=1280'} 
                          alt={u.name} 
                          style={{ width:'100%', height:'100%', objectFit:'cover' }} 
                        />
                      </div>
                      {u.online && (
                        <span style={{
                          position:'absolute',
                          bottom:0,
                          right:0,
                          width:18,
                          height:18,
                          background: designTokens.colors.success.main,
                          border: `3px solid ${designTokens.colors.background.primary}`,
                          borderRadius: designTokens.radius.circle,
                          /* boxShadow removed */
                        }} />
                      )}
                    </div>
                    
                    {/* メッセージ情報 */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                        <span style={{ fontWeight:700, fontSize: designTokens.typography.h4.fontSize, color: designTokens.colors.text.primary }}>{u.name}</span>
                        <span style={{ fontSize: designTokens.typography.caption.fontSize, color: designTokens.colors.text.disabled, fontWeight:500 }}>10:30</span>
                      </div>
                      <p style={{
                        margin:0,
                        fontSize: designTokens.typography.small.fontSize,
                        color: designTokens.colors.text.secondary,
                        overflow:'hidden',
                        textOverflow:'ellipsis',
                        whiteSpace:'nowrap',
                        lineHeight:1.4
                      }}>
                        {u.message || 'よろしくお願いします'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 全てのユーザーモード: ライブ風グリッド表示 */}
          {userMode === 'all' && (
            <div style={{ padding: `${designTokens.spacing.sm} ${designTokens.spacing.sm} ${designTokens.spacing.lg} ${designTokens.spacing.sm}`, background: designTokens.colors.background.primary }}>
              <div style={{ 
                display:'grid', 
                gridTemplateColumns:'repeat(3, 1fr)', 
                gap:10 
              }}>
                {displayUsers.map((u:any, index:number)=>(
              <div 
                key={u.id} 
                style={{ 
                  cursor:'pointer',
                  borderRadius: 10,
                  overflow:'hidden',
                  background: designTokens.colors.background.primary,
                  /* boxShadow removed */
                  transition: designTokens.transition.base,
                  border: `1px solid ${designTokens.colors.border.light}`
                }} 
                onClick={()=> {
                  if (!isAuthenticated || !me) {
                    dispatch(openSmsModal());
                    return;
                  }
                  dispatch(setActiveUserId(u.id));
                  dispatch(openGuestProfileModal());
                }}
                onMouseOver={e=>{
                  e.currentTarget.style.boxShadow = designTokens.shadow.cardHover;
                  e.currentTarget.style.transform='translateY(-3px)';
                  e.currentTarget.style.borderColor = designTokens.colors.primary.light;
                }}
                onMouseOut={e=>{
                  e.currentTarget.style.boxShadow = designTokens.shadow.md;
                  e.currentTarget.style.transform='translateY(0)';
                  e.currentTarget.style.borderColor = designTokens.colors.border.light;
                }}
              >
                {/* サムネイル画像エリア */}
                <div style={{ 
                  position:'relative',
                  width:'100%',
                  paddingTop:'100%',
                  background:'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #FEE2E2 100%)',
                  overflow:'hidden'
                }}>
                  <img 
                    src={u.avatar || 'https://image.p-c2-x.abema-tv.com/image/series/19-15/thumb.png?height=720&quality=75&version=1741061716&width=1280'} 
                    alt={u.name} 
                    style={{ 
                      position:'absolute',
                      top:0,
                      left:0,
                      width:'100%', 
                      height:'100%', 
                      objectFit:'cover' 
                    }} 
                  />
                  
                  {/* タイトルテキスト（下部） */}
                  <div style={{
                    position:'absolute',
                    left:0,
                    right:0,
                    bottom:0,
                    padding:'12px 8px 8px',
                    background:'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 40%, transparent 100%)',
                    color:'#fff'
                  }}>
                    <div style={{
                      fontSize:12,
                      fontWeight:700,
                      lineHeight:1.4,
                      overflow:'hidden',
                      display:'-webkit-box',
                      WebkitLineClamp:2,
                      WebkitBoxOrient:'vertical',
                      textShadow:'0 1px 3px rgba(0,0,0,0.7)'
                    }}>
                      {u.message || 'よろしくお願いします'}
                    </div>
                  </div>
                </div>
                
                {/* ユーザー情報（カード下部） */}
                <div style={{ 
                  padding:'8px 8px 10px'
                }}>
                  <div style={{
                    fontSize:12,
                    fontWeight:600,
                    color:'#0f172a',
                    overflow:'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap'
                  }}>
                    {u.name}
                    {u.age && (
                      <span style={{ 
                        marginLeft:4,
                        fontSize:11,
                        color:'#94a3b8',
                        fontWeight:500
                      }}>
                        {u.age}
                      </span>
                    )}
                  </div>
                </div>
              </div>
                ))}
              </div>

              {/* ローディングインジケーター */}
              {isLoading && (
                <div style={{ 
                  padding:'20px', 
                  textAlign:'center'
                }}>
                  <div style={{ 
                    display:'inline-block',
                    width:40,
                    height:40,
                    border:'3px solid #f3f3f3',
                    borderTop:'3px solid #000',
                    borderRadius:'50%',
                    animation:'spin 1s linear infinite'
                  }} />
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              )}

              {/* すべて読み込み完了メッセージ */}
              {!isLoading && displayCount >= users.length && (!isAuthenticated || !me || following.length === 0) && (
                <div style={{ 
                  padding:'20px', 
                  textAlign:'center',
                  color:'#999',
                  fontSize:14
                }}>
                  すべてのユーザーを表示しました
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab==='open' && (
        <div>
          {/* 参加中モード: ログイン後のみ表示 */}
          {communityMode === 'joined' && !isAuthenticated && (
            <div style={{ padding:'40px 20px', textAlign:'center' }}>
              <p style={{ color:'var(--color-text-soft)', marginBottom:20 }}>
                参加中のコミュニティを表示するには<br/>ログインしてください
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => dispatch(openSmsModal())}
              >
                ログイン
              </Button>
            </div>
          )}
          
          {/* コミュニティモード切り替えボタン (UI改善.md Q6対応) */}
          <div style={{ 
            padding: `${designTokens.spacing.md} ${designTokens.spacing.md} ${designTokens.spacing.xl} ${designTokens.spacing.md}`, 
            background: designTokens.colors.background.primary
          }}>
            <div style={{ 
              display:'flex', 
              gap: designTokens.spacing.lg,
              alignItems:'center'
            }}>
              <button
                onClick={() => setCommunityMode('all')}
                style={{
                  background:'none',
                  border:'none',
                  padding: `${designTokens.spacing.sm} 0`,
                  fontSize: designTokens.typography.h4.fontSize,
                  fontWeight: communityMode === 'all' ? 700 : 400,
                  color: communityMode === 'all' ? designTokens.colors.text.primary : designTokens.colors.text.tertiary,
                  cursor:'pointer',
                  position:'relative',
                  transition: designTokens.transition.base,
                  whiteSpace:'nowrap'
                }}
              >
                すべて
                {communityMode === 'all' && (
                  <div style={{
                    position:'absolute',
                    bottom: `-${designTokens.spacing.md}`,
                    left:0,
                    right:0,
                    height:3,
                    background: designTokens.colors.text.primary,
                    borderRadius: designTokens.radius.xs
                  }} />
                )}
              </button>
              <button
                onClick={() => {
                  if (!isAuthenticated || !me) {
                    dispatch(openSmsModal());
                    return;
                  }
                  setCommunityMode('joined');
                }}
                style={{
                  background:'none',
                  border:'none',
                  padding: `${designTokens.spacing.sm} 0`,
                  fontSize: designTokens.typography.h4.fontSize,
                  fontWeight: communityMode === 'joined' ? 700 : 400,
                  color: communityMode === 'joined' ? designTokens.colors.text.primary : designTokens.colors.text.tertiary,
                  cursor:'pointer',
                  position:'relative',
                  transition: designTokens.transition.base,
                  whiteSpace:'nowrap'
                }}
              >
                参加中
                {communityMode === 'joined' && (
                  <div style={{
                    position:'absolute',
                    bottom: `-${designTokens.spacing.md}`,
                    left:0,
                    right:0,
                    height:3,
                    background: designTokens.colors.text.primary,
                    borderRadius: designTokens.radius.xs
                  }} />
                )}
              </button>
              {/* 作成ボタン（モダンスタイル） */}
              <button
                onClick={() => {
                  if (!isAuthenticated || !me) {
                    dispatch(openSmsModal());
                    return;
                  }
                  setShowCreateModal(true);
                }}
                style={{
                  marginLeft:'auto',
                  padding:'10px 16px',
                  background:`linear-gradient(135deg, ${designTokens.colors.primary.main} 0%, ${designTokens.colors.secondary.main} 100%)`,
                  color:'#fff',
                  border:'none',
                  borderRadius:999,
                  cursor:'pointer',
                  fontWeight:700,
                  boxShadow:'0 4px 12px rgba(14,165,233,0.25)',
                  transition:'transform .15s ease, opacity .15s ease'
                }}
                onMouseOver={e=>{ e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.opacity='0.95'; }}
                onMouseOut={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.opacity='1'; }}
              >
                作成
              </button>
            </div>
          </div>
          
          {/* 参加中セクション - ログイン後のみ表示、LINE風リスト */}
                    {/* 参加中モード: ログイン後のみ表示 */}
          {communityMode === 'joined' && isAuthenticated && me && (
            <div style={{ padding: designTokens.spacing.lg, background: designTokens.colors.background.primary }}>
              <div style={{ 
                padding: `0 4px ${designTokens.spacing.md}`, 
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between'
              }}>
                <h3 style={{ margin:0, fontSize: designTokens.typography.h4.fontSize, fontWeight: designTokens.typography.h4.fontWeight as number, color: designTokens.colors.text.primary }}>参加中のコミュニティ</h3>
                <span style={{ fontSize: designTokens.typography.small.fontSize, color: designTokens.colors.text.secondary, fontWeight:600 }}>{joinedCommunities.length}件</span>
              </div>
              
              {/* カードUIリスト */}
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {joinedCommunities.map((c:any, index:number) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      dispatch(setActiveCommunity(c.id));
                      dispatch(navigate('groupChat'));
                    }}
                    style={{
                      display:'flex',
                      alignItems:'center',
                      gap: designTokens.spacing.md,
                      padding: designTokens.spacing.md,
                      cursor:'pointer',
                      transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                      background: designTokens.colors.background.primary,
                      borderRadius: 10,

                      border: `1px solid ${designTokens.colors.border.light}`
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = designTokens.shadow.cardHover;
                      e.currentTarget.style.borderColor = designTokens.colors.primary.main;
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = designTokens.shadow.card;
                      e.currentTarget.style.borderColor = designTokens.colors.border.light;
                    }}
                  >
                    {/* コミュニティアイコン */}
                    <div style={{ flexShrink:0 }}>
                      <div style={{
                        width:60,
                        height:60,
                        borderRadius: designTokens.radius.md,
                        background: `linear-gradient(135deg, ${designTokens.colors.primary.pale} 0%, ${designTokens.colors.secondary.light} 100%)`,
                        border: `2px solid ${designTokens.colors.background.primary}`,
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        fontSize: designTokens.typography.caption.fontSize,
                        fontWeight:700,
                        color: designTokens.colors.secondary.main,
                        /* boxShadow removed */
                      }}>
                        IMG
                      </div>
                    </div>
                    
                    {/* コミュニティ情報 */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:6, flex:1, minWidth:0 }}>
                          <span style={{ 
                            fontWeight:700, 
                            fontSize: designTokens.typography.h4.fontSize, 
                            color: designTokens.colors.text.primary,
                            overflow:'hidden',
                            textOverflow:'ellipsis',
                            whiteSpace:'nowrap'
                          }}>
                            {c.name}
                          </span>
                          {c.category && (
                            <span style={{ 
                              fontSize: designTokens.typography.caption.fontSize, 
                              background: `linear-gradient(135deg, ${designTokens.colors.secondary.main} 0%, ${designTokens.colors.secondary.light} 100%)`,
                              color: designTokens.colors.text.inverse,
                              padding: `3px ${designTokens.spacing.sm}`, 
                              borderRadius: designTokens.radius.md,
                              fontWeight:700,
                              flexShrink:0,
                              /* boxShadow removed */
                            }}>
                              {c.category}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: designTokens.typography.caption.fontSize, color: designTokens.colors.text.disabled, fontWeight:500, marginLeft: designTokens.spacing.sm, flexShrink:0 }}>2時間前</span>
                      </div>
                      <p style={{
                        margin: `0 0 6px`,
                        fontSize: designTokens.typography.small.fontSize,
                        color: designTokens.colors.text.secondary,
                        overflow:'hidden',
                        textOverflow:'ellipsis',
                        whiteSpace:'nowrap',
                        lineHeight:1.4
                      }}>
                        最新のメッセージがここに表示されます
                      </p>
                      <div style={{ 
                        fontSize: designTokens.typography.small.fontSize,
                        color: designTokens.colors.text.disabled,
                        fontWeight:600
                      }}>
                        👥 {c.members}人
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 全て/人気モード用のライブ風グリッド表示 */}
          {(communityMode === 'all' || communityMode === 'popular') && (
            <div style={{ padding: `${designTokens.spacing.sm} ${designTokens.spacing.sm} ${designTokens.spacing.lg} ${designTokens.spacing.sm}`, background: designTokens.colors.background.primary }}>
              <div style={{ 
                display:'grid', 
                gridTemplateColumns:'repeat(3, 1fr)', 
                gap:10 
              }}>
            {filteredCommunities.map((c:any, index:number)=>(
              <div 
                key={c.id} 
                style={{ 
                  cursor:'pointer',
                  borderRadius: 10,
                  overflow:'hidden',
                  background: designTokens.colors.background.primary,
                  /* boxShadow removed */
                  transition: designTokens.transition.base,
                  border: `1px solid ${designTokens.colors.border.light}`
                }} 
                onClick={()=> {
                  if (!isAuthenticated || !me) {
                    dispatch(openSmsModal());
                    return;
                  }
                  setSelectedCommunity(c);
                  setShowCommunityDetail(true);
                }}
                onMouseOver={e=>{
                  e.currentTarget.style.boxShadow = designTokens.shadow.cardHover;
                  e.currentTarget.style.transform='translateY(-3px)';
                  e.currentTarget.style.borderColor = designTokens.colors.secondary.main;
                }}
                onMouseOut={e=>{
                  e.currentTarget.style.boxShadow = designTokens.shadow.md;
                  e.currentTarget.style.transform='translateY(0)';
                  e.currentTarget.style.borderColor = designTokens.colors.border.light;
                }}
              >
                {/* サムネイル画像エリア */}
                <div style={{ 
                  position:'relative',
                  width:'100%',
                  paddingTop:'100%',
                  background:`linear-gradient(${135 + index * 30}deg, 
                    ${['#FFE5E5', '#E5F2FF', '#FFF5E5', '#F0E5FF', '#E5FFF0'][index % 5]} 0%, 
                    ${['#FFC5C5', '#C5E2FF', '#FFE5C5', '#E0C5FF', '#C5FFE0'][index % 5]} 100%)`,
                  overflow:'hidden'
                }}>
                  <img 
                    src={c.image} 
                    alt={c.name}
                    style={{
                      position:'absolute',
                      top:0,
                      left:0,
                      width:'100%',
                      height:'100%',
                      objectFit:'cover'
                    }}
                  />
                  
                  {/* タイトルテキスト（下部） */}
                  <div style={{
                    position:'absolute',
                    left:0,
                    right:0,
                    bottom:0,
                    padding:'12px 8px 8px',
                    background:'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 40%, transparent 100%)',
                    color:'#fff'
                  }}>
                    <div style={{
                      fontSize:12,
                      fontWeight:700,
                      lineHeight:1.4,
                      overflow:'hidden',
                      display:'-webkit-box',
                      WebkitLineClamp:2,
                      WebkitBoxOrient:'vertical',
                      textShadow:'0 1px 3px rgba(0,0,0,0.7)'
                    }}>
                      {c.name}
                    </div>
                    {c.category && (
                      <div style={{ 
                        display:'inline-flex',
                        alignItems:'center',
                        fontSize:9, 
                        background:'rgba(15,118,110,0.9)',
                        color:'#ecfdf5',
                        padding:'2px 8px', 
                        borderRadius:999,
                        fontWeight:600,
                        marginTop:4,
                        textShadow:'0 1px 2px rgba(0,0,0,0.4)'
                      }}>
                        {c.category}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* コミュニティ情報（カード下部） */}
                <div style={{ 
                  padding:'8px 8px 10px',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-between'
                }}>
                  <div style={{
                    fontSize:11,
                    color:'#4b5563',
                    fontWeight:600
                  }}>
                    {c.members}人
                  </div>
                  <div style={{
                    fontSize:9,
                    color:'#9ca3af',
                    fontWeight:500
                  }}>
                    {c.posts}投稿
                  </div>
                </div>
              </div>
            ))}
              </div>
            </div>
          )}
        </div>
      )}

      {searchOpen && !showResults && (
        <div 
          style={{ 
            position:'fixed', 
            inset:0, 
            background: designTokens.colors.background.primary,
            zIndex:100,
            display:'flex',
            flexDirection:'column',
            height:'100vh',
            overflow:'hidden',
            animation:'slideInFromBottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }} 
        >
          <style>{`
            @keyframes slideInFromBottom {
              from {
                transform: translateY(100%);
              }
              to {
                transform: translateY(0);
              }
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
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
          `}</style>

          {/* ヘッダー */}
          <div style={{
            padding: `${designTokens.spacing.lg} ${designTokens.spacing.xl}`,
            borderBottom: `1px solid ${designTokens.colors.border.medium}`,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            background: designTokens.colors.background.primary,
            flexShrink:0,
            position:'relative',
            animation:'fadeIn 0.3s ease 0.1s backwards'
          }}>
            <button
              onClick={()=>{setSearchOpen(false); resetSearch();}}
              style={{
                background:'none',
                border:'none',
                fontSize:24,
                fontWeight:400,
                color:'#000',
                cursor:'pointer',
                padding:'8px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                width:40,
                height:40,
                position:'absolute',
                left:12,
                top:'50%',
                transform:'translateY(-50%)'
              }}
            >
              ×
            </button>
            <h2 style={{ 
              margin:0, 
              fontSize:18, 
              fontWeight:700,
              color:'#000'
            }}>
              詳細検索
            </h2>
            <button
              onClick={()=>{resetSearch();}}
              style={{
                background:'none',
                border:'none',
                fontSize:15,
                fontWeight:600,
                color:'#0EA5E9',
                cursor:'pointer',
                padding:'8px',
                whiteSpace:'nowrap',
                position:'absolute',
                right:12,
                top:'50%',
                transform:'translateY(-50%)'
              }}
            >
              条件をクリア
            </button>
          </div>

          {/* スクロール可能なコンテンツエリア */}
          <div style={{
            flex:1,
            overflowY:'auto',
            padding:'20px'
          }}>
            {/* キーワード */}
            <div style={{ 
              marginBottom:32,
              animation:'scaleIn 0.3s ease 0.15s backwards'
            }}>
              <label style={{ 
                display:'flex',
                alignItems:'center',
                gap:8,
                marginBottom:12, 
                fontSize:15, 
                fontWeight:600,
                color:'#6b7280'
              }}>
                <IconSearch size={18} color='#6b7280' />
                キーワード
              </label>
              <input 
                placeholder='ユーザー名で検索...' 
                value={keyword} 
                onChange={e=>setKeyword(e.target.value)} 
                style={{ 
                  width:'100%',
                  padding:'14px 16px',
                  border: `1px solid ${designTokens.colors.border.medium}`,
                  borderRadius: designTokens.radius.md,
                  fontSize: designTokens.typography.h4.fontSize,
                  background: designTokens.colors.background.primary,
                  outline:'none',
                  boxSizing:'border-box',
                  transition:'border-color 0.2s ease'
                }}
                onFocus={e=>(e.currentTarget.style.borderColor='#0EA5E9')}
                onBlur={e=>(e.currentTarget.style.borderColor='#e5e7eb')}
              />
            </div>

            {/* 年代 */}
            <div style={{ 
              marginBottom:32,
              animation:'scaleIn 0.3s ease 0.2s backwards'
            }}>
              <label style={{ 
                display:'flex',
                alignItems:'center',
                gap:8,
                marginBottom:12, 
                fontSize:15, 
                fontWeight:600,
                color:'#6b7280'
              }}>
                <IconCalendar size={18} color='#6b7280' />
                年代
              </label>
              <div style={{ 
                display:'flex', 
                flexWrap:'wrap', 
                gap:10 
              }}>
                {['10代前半', '10代後半', '20代', '30代', '40代', '50代以上'].map((age) => (
                  <button
                    key={age}
                    onClick={() => setSearchAge(searchAge === age ? '' : age)}
                    style={{
                      padding: `${designTokens.spacing.md} 22px`,
                      borderRadius: designTokens.radius.pill,
                      border: `2px solid ${searchAge === age ? designTokens.colors.secondary.main : designTokens.colors.border.medium}`,
                      background: searchAge === age ? designTokens.colors.primary.pale : designTokens.colors.background.primary,
                      color: searchAge === age ? designTokens.colors.secondary.dark : designTokens.colors.text.secondary,
                      fontSize:15,
                      fontWeight: searchAge === age ? 600 : 400,
                      cursor:'pointer',
                      transition:'all 0.2s ease'
                    }}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* 都道府県 */}
            <div style={{ 
              marginBottom:32,
              animation:'scaleIn 0.3s ease 0.25s backwards'
            }}>
              <label style={{ 
                display:'flex',
                alignItems:'center',
                gap:8,
                marginBottom:12, 
                fontSize:15, 
                fontWeight:600,
                color:'#6b7280'
              }}>
                <IconMapPin size={18} color='#6b7280' />
                居住地
              </label>
              <button
                onClick={() => setShowPrefectureModal(true)}
                style={{
                  width:'100%',
                  padding:'14px 16px',
                  borderRadius: designTokens.radius.md,
                  border: `1px solid ${designTokens.colors.border.medium}`,
                  background: designTokens.colors.background.primary,
                  fontSize: designTokens.typography.h4.fontSize,
                  cursor:'pointer',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-between',
                  color: searchRegion ? '#000' : '#9ca3af',
                  transition:'border-color 0.2s ease'
                }}
                onMouseOver={e=>(e.currentTarget.style.borderColor='#cbd5e0')}
                onMouseOut={e=>(e.currentTarget.style.borderColor='#e5e7eb')}
              >
                <span>{searchRegion || 'こだわらない'}</span>
                <span style={{ fontSize:16, color:'#9ca3af' }}>›</span>
              </button>
            </div>

            {/* よく使う時間帯 */}
            <div style={{ 
              marginBottom:32,
              animation:'scaleIn 0.3s ease 0.3s backwards'
            }}>
              <label style={{ 
                display:'flex',
                alignItems:'center',
                gap:8,
                marginBottom:12, 
                fontSize:15, 
                fontWeight:600,
                color:'#6b7280'
              }}>
                <IconClock size={18} color='#6b7280' />
                よく使う時間帯
              </label>
              <div style={{ 
                display:'flex', 
                flexWrap:'wrap', 
                gap:10 
              }}>
                {['朝', '昼', '夜', '深夜'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setSearchTime(searchTime === time ? '' : time)}
                    style={{
                      padding: `${designTokens.spacing.md} 22px`,
                      borderRadius: designTokens.radius.pill,
                      border: `2px solid ${searchTime === time ? designTokens.colors.secondary.main : designTokens.colors.border.medium}`,
                      background: searchTime === time ? designTokens.colors.primary.pale : designTokens.colors.background.primary,
                      color: searchTime === time ? designTokens.colors.secondary.dark : designTokens.colors.text.secondary,
                      fontSize:15,
                      fontWeight: searchTime === time ? 600 : 400,
                      cursor:'pointer',
                      transition:'all 0.2s ease'
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 下部ボタンエリア */}
          <div style={{
            padding: `${designTokens.spacing.md} ${designTokens.spacing.lg} ${designTokens.spacing.xl}`,
            background: designTokens.colors.background.primary,
            borderTop: `1px solid ${designTokens.colors.border.medium}`,
            flexShrink:0,
            animation:'fadeIn 0.3s ease 0.35s backwards'
          }}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleSearch}
            >
              検索
            </Button>
          </div>
        </div>
      )}

      {/* 都道府県選択モーダル */}
      {showPrefectureModal && (
        <div 
          style={{ 
            position:'fixed', 
            inset:0, 
            background: designTokens.colors.background.primary,
            zIndex:200,
            display:'flex',
            flexDirection:'column',
            height:'100vh',
            overflow:'hidden',
            animation:'slideInFromBottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }} 
        >
          {/* ヘッダー */}
          <div style={{
            padding: `${designTokens.spacing.lg} ${designTokens.spacing.xl}`,
            borderBottom: `1px solid ${designTokens.colors.border.medium}`,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            background: designTokens.colors.background.primary,
            flexShrink:0,
            position:'relative'
          }}>
            <button
              onClick={()=>setShowPrefectureModal(false)}
              style={{
                background:'none',
                border:'none',
                fontSize:24,
                color:'#000',
                cursor:'pointer',
                padding:'8px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                position:'absolute',
                left:12,
                top:'50%',
                transform:'translateY(-50%)'
              }}
            >
              ‹
            </button>
            <h2 style={{ 
              margin:0, 
              fontSize:18, 
              fontWeight:700,
              color:'#000'
            }}>
              居住地
            </h2>
          </div>

          {/* タブ */}
          <div style={{
            display:'flex',
            borderBottom: `1px solid ${designTokens.colors.border.medium}`,
            background: designTokens.colors.background.primary,
            flexShrink:0
          }}>
            <button style={{
              flex:1,
              padding:'16px',
              background:'none',
              border:'none',
              borderBottom:'3px solid #0EA5E9',
              color:'#0EA5E9',
              fontSize:16,
              fontWeight:600,
              cursor:'pointer'
            }}>
              日本
            </button>
            <button style={{
              flex:1,
              padding:'16px',
              background:'none',
              border:'none',
              borderBottom:'3px solid transparent',
              color:'#9ca3af',
              fontSize:16,
              fontWeight:400,
              cursor:'pointer'
            }}>
              海外(実装予定)
            </button>
          </div>

          {/* 都道府県リスト */}
          <div style={{
            flex:1,
            overflowY:'auto',
            padding:'20px'
          }}>
            <div style={{ 
              display:'flex', 
              flexWrap:'wrap', 
              gap:10 
            }}>
              {[
                '北海道', '青森', '岩手', '宮城', '秋田', '山形', '福島', '茨城', '栃木',
                '群馬', '埼玉', '千葉', '東京', '神奈川', '新潟', '富山', '石川',
                '福井', '山梨', '長野', '岐阜', '静岡', '愛知', '三重', '滋賀',
                '京都', '大阪', '兵庫', '奈良', '和歌山', '鳥取', '島根', '岡山',
                '広島', '山口', '徳島', '香川', '愛媛', '高知', '福岡', '佐賀',
                '長崎', '熊本', '大分', '宮崎', '鹿児島', '沖縄'
              ].map((prefecture) => (
                <button
                  key={prefecture}
                  onClick={() => {
                    setSearchRegion(prefecture);
                    setShowPrefectureModal(false);
                  }}
                  style={{
                    padding: `${designTokens.spacing.md} ${designTokens.spacing.xl}`,
                    borderRadius: designTokens.radius.pill,
                    border: `2px solid ${searchRegion === prefecture ? designTokens.colors.secondary.main : designTokens.colors.border.medium}`,
                    background: searchRegion === prefecture ? designTokens.colors.primary.pale : designTokens.colors.background.primary,
                    color: searchRegion === prefecture ? designTokens.colors.secondary.dark : designTokens.colors.text.primary,
                    fontSize:15,
                    fontWeight: searchRegion === prefecture ? 600 : 400,
                    cursor:'pointer',
                    transition:'all 0.2s ease',
                    whiteSpace:'nowrap'
                  }}
                >
                  {prefecture}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 検索結果 */}
      {showResults && (
        <div 
          style={{ 
            position:'fixed', 
            inset:0, 
            background:'rgba(0,0,0,.5)', 
            backdropFilter:'blur(6px)',
            display:'flex', 
            alignItems:'center',
            justifyContent:'center',
            padding:20,
            zIndex:100
          }} 
          onClick={()=>{setShowResults(false); resetSearch();}}
        >
          <div 
            style={{ 
              width:'100%',
              maxWidth:500,
              background:'#fff',
              borderRadius:20, 
              padding:'24px 20px',
              maxHeight:'80vh', 
              overflowY:'auto',
              /* boxShadow removed */
            }} 
            onClick={e=>e.stopPropagation()}
          >
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <h2 style={{ margin:0, fontSize:18, fontWeight:700 }}>検索結果</h2>
              <button 
                onClick={()=>{setShowResults(false); resetSearch();}}
                style={{
                  background:'rgba(0,0,0,.05)',
                  border:'none',
                  width:32,
                  height:32,
                  borderRadius:'50%',
                  cursor:'pointer',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  fontSize:18,
                  transition:'background .2s ease'
                }}
                onMouseOver={e=>(e.currentTarget.style.background='rgba(0,0,0,.1)')}
                onMouseOut={e=>(e.currentTarget.style.background='rgba(0,0,0,.05)')}
              >
                ×
              </button>
            </div>
            <p style={{ margin:'0 0 20px', fontSize:14, color:'#666' }}>
              {searchResults.length}人のユーザーが見つかりました
            </p>
            <div>
              {searchResults.map((u:any)=>(
                <div 
                  key={u.id} 
                  style={{ 
                    display:'flex', 
                    gap:14, 
                    alignItems:'center',
                    padding:'18px',
                    border:'1px solid #e5e5e5',
                    borderRadius:16,
                    marginBottom:12,
                    cursor:'pointer',
                    transition:'all .2s ease',
                    background:'#fff'
                  }}
                  onClick={()=> {
                    if (!isAuthenticated || !me) {
                      dispatch(openSmsModal());
                      return;
                    }
                    dispatch(setActiveChat(u.id)); 
                    dispatch(navigate('chatDetail'));
                    setShowResults(false);
                    setSearchOpen(false);
                    resetSearch();
                  }}
                  onMouseOver={e=>(e.currentTarget.style.background='#fafafa')}
                  onMouseOut={e=>(e.currentTarget.style.background='#fff')}
                >
                  <div style={{ position:'relative', flexShrink:0 }}>
                    <div style={{ 
                      width:60, 
                      height:60, 
                      borderRadius: designTokens.radius.circle, 
                      background: designTokens.colors.background.secondary, 
                      border: `2px solid ${designTokens.colors.border.light}`,
                      display:'flex', 
                      alignItems:'center', 
                      justifyContent:'center',
                      overflow:'hidden'
                    }}>
                      {u.avatar ? <img src={u.avatar} alt={u.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <IconAvatar size={32} color='#999' />}
                    </div>
                    {u.online && (
                      <span style={{ 
                        position:'absolute', 
                        bottom:2, 
                        right:2, 
                        width:14, 
                        height:14, 
                        background:'#10b981', 
                        border:'2px solid #fff', 
                        borderRadius:'50%' 
                      }} />
                    )}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                      <span style={{ fontWeight:600, fontSize:15 }}>{u.name}</span>
                      {u.age && (
                        <span style={{ 
                          fontSize:11, 
                          background:'#000', 
                          color:'#fff',
                          padding:'3px 8px', 
                          borderRadius:12,
                          fontWeight:600
                        }}>
                          {u.age}
                        </span>
                      )}
                    </div>
                    <p style={{ 
                      margin:0, 
                      fontSize:13, 
                      color:'#666',
                      overflow:'hidden',
                      textOverflow:'ellipsis',
                      whiteSpace:'nowrap'
                    }}>
                      {u.message||'よろしくお願いします'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* コミュニティ検索モーダル */}
      {communitySearchOpen && !communityShowResults && (
        <div 
          style={{ 
            position:'fixed', 
            inset:0, 
            background:'#fff',
            zIndex:100,
            display:'flex',
            flexDirection:'column',
            height:'100vh',
            overflow:'hidden',
            animation:'slideInFromBottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }} 
        >
          <style>{`
            @keyframes slideInFromBottom {
              from {
                transform: translateY(100%);
              }
              to {
                transform: translateY(0);
              }
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
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
          `}</style>
          
          {/* ヘッダー */}
          <div style={{
            padding:'16px 20px',
            borderBottom:'1px solid #e5e7eb',
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            background: designTokens.colors.background.primary,
            flexShrink:0,
            animation:'fadeIn 0.3s ease 0.1s backwards'
          }}>
            <div style={{ width:40 }} />
            <h2 style={{ 
              margin:0, 
              fontSize:18, 
              fontWeight:700,
              color:'#000'
            }}>
              コミュニティ検索
            </h2>
            <button
              onClick={()=>{setCommunitySearchOpen(false); resetCommunitySearch();}}
              style={{
                background:'none',
                border:'none',
                fontSize:24,
                fontWeight:400,
                color:'#000',
                cursor:'pointer',
                padding:'8px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                width:40,
                height:40
              }}
            >
              ×
            </button>
          </div>

          {/* スクロール可能なコンテンツエリア */}
          <div style={{
            flex:1,
            overflowY:'auto',
            padding:'16px 20px'
          }}>
            {/* 検索バー */}
            <div style={{ 
              marginBottom:24,
              position:'relative',
              animation:'scaleIn 0.3s ease 0.15s backwards'
            }}>
              <div style={{
                position:'absolute',
                left:16,
                top:'50%',
                transform:'translateY(-50%)',
                fontSize:20,
                color:'#9ca3af',
                pointerEvents:'none'
              }}>
                #
              </div>
              <input 
                type="text" 
                placeholder="カテゴリ名で検索..." 
                value={communityKeyword} 
                onChange={e=>setCommunityKeyword(e.target.value)}
                style={{ 
                  width:'100%', 
                  padding:'14px 16px 14px 40px', 
                  border:'none', 
                  borderRadius: designTokens.radius.md, 
                  fontSize: designTokens.typography.h4.fontSize,
                  outline:'none',
                  background: designTokens.colors.background.secondary,
                  boxSizing:'border-box'
                }}
              />
            </div>

            {/* カテゴリ */}
            <div style={{ marginBottom:16 }}>
              <h3 style={{ 
                fontSize:20, 
                fontWeight:700, 
                color:'#000',
                margin:'0 0 20px 0',
                animation:'fadeIn 0.3s ease 0.2s backwards'
              }}>
                カテゴリ
              </h3>
              
              {/* カテゴリグリッド（画像なし・シンプル） */}
              <div style={{
                display:'grid',
                gridTemplateColumns:'repeat(2, 1fr)',
                gap:12
              }}>
                {[
                  '音楽',
                  '映画',
                  '芸能人・テレビ',
                  'ゲーム',
                  '本・マンガ',
                  'アート',
                  'スポーツ',
                  '車・バイク',
                  '旅行',
                  'ホーム・DIY',
                ].map((name, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCommunityCategory(name);
                      handleCommunitySearch();
                    }}
                    style={{
                      height:48,
                      borderRadius: designTokens.radius.sm,
                      border:'none',
                      cursor:'pointer',
                      background: designTokens.colors.background.secondary,
                      color: designTokens.colors.text.primary,
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      fontSize: 16,
                      fontWeight: 700,
                      transition:'background 0.15s ease',
                      animation:`fadeIn 0.25s ease ${0.2 + index * 0.04}s backwards`
                    }}
                    onMouseOver={e=>{
                      e.currentTarget.style.background = '#f0f2f5';
                    }}
                    onMouseOut={e=>{
                      e.currentTarget.style.background = designTokens.colors.background.secondary;
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* コミュニティ検索結果モーダル */}
      {communityShowResults && (
        <div 
          style={{ 
            position:'fixed', 
            inset:0, 
            background:'rgba(0,0,0,.5)', 
            backdropFilter:'blur(6px)',
            display:'flex', 
            alignItems:'center',
            justifyContent:'center',
            padding:20,
            zIndex:100
          }} 
          onClick={()=>{setCommunityShowResults(false); resetCommunitySearch();}}
        >
          <div 
            style={{ 
              width:'100%',
              maxWidth:500,
              background: designTokens.colors.background.primary,
              borderRadius: designTokens.radius.xl,
              padding: `${designTokens.spacing.xl} ${designTokens.spacing.xl}`,
              maxHeight:'80vh',
              overflowY:'auto'
            }}
            onClick={e=>e.stopPropagation()}
          >
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <h2 style={{ margin:0, fontSize:20, fontWeight:700 }}>検索結果</h2>
              <button 
                onClick={()=>{setCommunityShowResults(false); resetCommunitySearch();}}
                style={{ 
                  width:36,
                  height:36,
                  borderRadius:'50%',
                  background:'rgba(0,0,0,.05)',
                  border:'none',
                  cursor:'pointer',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  fontSize:18,
                  transition:'background .2s ease'
                }}
                onMouseOver={e=>(e.currentTarget.style.background='rgba(0,0,0,.1)')}
                onMouseOut={e=>(e.currentTarget.style.background='rgba(0,0,0,.05)')}
              >
                ×
              </button>
            </div>
            <p style={{ margin:'0 0 20px', fontSize:14, color:'#666' }}>
              {communitySearchResults.length}件のコミュニティが見つかりました
            </p>
            <div>
              {communitySearchResults.map((c:any)=>(
                <div 
                  key={c.id} 
                  style={{ 
                    display:'flex', 
                    gap:14, 
                    alignItems:'center',
                    padding:'18px',
                    border:'1px solid #e5e5e5',
                    borderRadius:16,
                    marginBottom:12,
                    cursor:'pointer',
                    transition:'all .2s ease',
                    background:'#fff'
                  }}
                  onClick={()=> {
                    if (!isAuthenticated || !me) {
                      dispatch(openSmsModal());
                    }
                    setCommunityShowResults(false);
                    setCommunitySearchOpen(false);
                    resetCommunitySearch();
                  }}
                  onMouseOver={e=>(e.currentTarget.style.background='#fafafa')}
                  onMouseOut={e=>(e.currentTarget.style.background='#fff')}
                >
                  <div style={{ 
                    width:70, 
                    height:70, 
                    borderRadius: 10, 
                    background: designTokens.colors.background.secondary,
                    border: `1px solid ${designTokens.colors.border.medium}`,
                    display:'flex', 
                    alignItems:'center', 
                    justifyContent:'center', 
                    fontSize:12,
                    fontWeight:600,
                    color:'#999',
                    flexShrink:0
                  }}>
                    IMG
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                      <span style={{ fontWeight:700, fontSize:15, color:'#000' }}>{c.name}</span>
                      {c.category && (
                        <span style={{ 
                          fontSize:11, 
                          background:'#000',
                          color:'#fff',
                          padding:'3px 9px', 
                          borderRadius:12,
                          fontWeight:600
                        }}>
                          {c.category}
                        </span>
                      )}
                    </div>
                    <p style={{ 
                      margin:0, 
                      fontSize:13, 
                      color:'#666'
                    }}>
                      {c.members}人 · {c.posts}投稿
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* コミュニティ作成モーダル */}
      {showCreateModal && (
        <div 
          style={{ 
            position:'fixed', 
            inset:0, 
            background: 'rgba(0,0,0,0.45)',
            backdropFilter:'blur(6px)',
            zIndex: 1000,
            display:'flex',
            alignItems:'flex-end',
            justifyContent:'center'
          }}
          onClick={()=> setShowCreateModal(false)}
        >
          <style>{`
            @keyframes slideUpCreate {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}</style>
          <div 
            style={{
              background:'#fff',
              width:'100%',
              maxWidth:560,
              borderRadius:'24px 24px 0 0',
              border:`1px solid ${designTokens.colors.border.medium}`,
              animation:'slideUpCreate .3s cubic-bezier(0.16, 1, 0.3, 1)',
              overflow:'hidden'
            }}
            onClick={e=> e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              padding:`${designTokens.spacing.lg} ${designTokens.spacing.xl}`,
              borderBottom:`1px solid ${designTokens.colors.border.light}`,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
              <h3 style={{ margin:0, fontSize:18, fontWeight:700 }}>コミュニティを作成</h3>
              <button
                onClick={()=> setShowCreateModal(false)}
                style={{
                  background:'rgba(15,23,42,0.05)',
                  border:'none',
                  width:36,
                  height:36,
                  borderRadius:'50%',
                  cursor:'pointer'
                }}
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div style={{ padding:`${designTokens.spacing.xl}` }}>
              <div style={{ marginBottom:designTokens.spacing.lg }}>
                <label style={{ display:'block', fontSize:13, color:'#64748b', marginBottom:6 }}>名前</label>
                <input
                  value={newCommunityName}
                  onChange={e=> setNewCommunityName(e.target.value)}
                  placeholder='コミュニティ名'
                  style={{
                    width:'100%',
                    padding:'12px 14px',
                    border:`1px solid ${designTokens.colors.border.medium}`,
                    borderRadius:3,
                    outline:'none'
                  }}
                />
              </div>
              <div style={{ marginBottom:designTokens.spacing.lg }}>
                <label style={{ display:'block', fontSize:13, color:'#64748b', marginBottom:6 }}>カテゴリ</label>
                <input
                  value={newCommunityCategory}
                  onChange={e=> setNewCommunityCategory(e.target.value)}
                  placeholder='例: 音楽・旅行'
                  style={{
                    width:'100%',
                    padding:'12px 14px',
                    border:`1px solid ${designTokens.colors.border.medium}`,
                    borderRadius:3,
                    outline:'none'
                  }}
                />
              </div>
              <div style={{ marginBottom:designTokens.spacing.lg }}>
                <label style={{ display:'block', fontSize:13, color:'#64748b', marginBottom:6 }}>アイコン</label>
                {/* アップロード＆プレビュー */}
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{
                    width:64,
                    height:64,
                    borderRadius:3,
                    border:`1px solid ${designTokens.colors.border.medium}`,
                    background:designTokens.colors.background.secondary,
                    overflow:'hidden',
                    display:'flex', alignItems:'center', justifyContent:'center'
                  }}>
                    {newCommunityImage ? (
                      <img src={newCommunityImage} alt="icon" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    ) : (
                      <span style={{ fontSize:12, color:'#9ca3af' }}>IMG</span>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e)=>{
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => {
                          setNewCommunityImage(String(reader.result || ''));
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    <div style={{ fontSize:12, color:'#94a3b8', marginTop:6 }}>JPG/PNG/SVG、1MB 以内推奨</div>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom:designTokens.spacing.xl }}>
                <label style={{ display:'block', fontSize:13, color:'#64748b', marginBottom:6 }}>説明</label>
                <textarea
                  value={newCommunityDesc}
                  onChange={e=> setNewCommunityDesc(e.target.value)}
                  placeholder='コミュニティの説明'
                  rows={3}
                  style={{
                    width:'100%',
                    padding:'12px 14px',
                    border:`1px solid ${designTokens.colors.border.medium}`,
                    borderRadius:3,
                    outline:'none',
                    resize:'vertical'
                  }}
                />
              </div>

              <div style={{ display:'flex', gap:12 }}>
                <button
                  onClick={()=> setShowCreateModal(false)}
                  style={{
                    flex:1,
                    padding:'12px 16px',
                    background:designTokens.colors.background.secondary,
                    color:designTokens.colors.text.primary,
                    border:`1px solid ${designTokens.colors.border.medium}`,
                    borderRadius:3,
                    cursor:'pointer'
                  }}
                >
                  キャンセル
                </button>
                <button
                  onClick={()=> {
                    if (!newCommunityName.trim()) return;
                    const newItem = {
                      id: `new_${Date.now()}`,
                      name: newCommunityName.trim(),
                      category: newCommunityCategory.trim() || undefined,
                      image: newCommunityImage || '/com/image.png',
                      desc: newCommunityDesc.trim() || undefined,
                      members: 1,
                      posts: 0
                    };
                    const updated = [...communities, newItem];
                    // 一覧へ追加（正規アクション）
                    dispatch(setCommunities(updated));
                    // 追加後に詳細を開く
                    dispatch(setActiveCommunity(newItem.id));
                    setSelectedCommunity(newItem);
                    setShowCommunityDetail(true);
                    setShowCreateModal(false);
                    setNewCommunityName('');
                    setNewCommunityCategory('');
                    setNewCommunityImage('');
                    setNewCommunityDesc('');
                  }}
                  style={{
                    flex:1,
                    padding:'12px 16px',
                    background:designTokens.colors.primary.main,
                    color:'#fff',
                    border:'none',
                    borderRadius:3,
                    cursor:'pointer'
                  }}
                >
                  作成
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* コミュニティ詳細モーダル */}
      {showCommunityDetail && selectedCommunity && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
          <style>{`
            @keyframes fadeInProfile {
              from { opacity:0; }
              to { opacity:1; }
            }
            @keyframes slideUpProfile {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}</style>
          <div 
            style={{ 
              background: '#fff', 
              width: '100%', 
              maxWidth: 560, 
              borderRadius: '32px 32px 0 0', 
              padding: 0, 
              position: 'relative', 
              /* boxShadow removed */
              maxHeight: '92vh', 
              overflowY: 'auto', 
              animation: 'fadeInProfile .25s ease, slideUpProfile .4s cubic-bezier(0.16, 1, 0.3, 1)' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ padding: `${designTokens.spacing.lg} ${designTokens.spacing.xl}`, borderBottom: `1px solid ${designTokens.colors.border.light}`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <button 
                aria-label='閉じる' 
                onClick={() => setShowCommunityDetail(false)} 
                style={{ 
                  background: 'rgba(15, 23, 42, 0.04)', 
                  border: 'none', 
                  cursor: 'pointer', 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  transition: 'background .15s ease', 
                  zIndex: 10,
                  fontSize: 18
                }} 
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(15,23,42,0.08)')} 
                onMouseOut={e => (e.currentTarget.style.background = 'rgba(15,23,42,0.04)')}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: `${designTokens.spacing.xl} ${designTokens.spacing.xl}` }}>
              <div style={{ position: 'relative', marginBottom: designTokens.spacing.lg }}>
                <div style={{ width: 136, height: 136, borderRadius: designTokens.radius.xl, padding: designTokens.spacing.sm, background: 'linear-gradient(180deg,#ffffff,#fbfdff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: 10, border: '2px solid rgba(14,165,233,0.12)', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: 48 }}>
                    {selectedCommunity.icon}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#0b1220' }}>{selectedCommunity.name}</h3>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
                  color: '#0284c7'
                }}>
                  {selectedCommunity.category}
                </span>
              </div>

              {/* 統計情報 */}
              <div style={{
                display: 'flex',
                gap: 12,
                width: '100%',
                maxWidth: 420,
                marginTop: 20,
                padding: 16,
                background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
                borderRadius: 12
              }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#0EA5E9',
                    marginBottom: 4
                  }}>
                    {selectedCommunity.members}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: '#64748b',
                    fontWeight: 600
                  }}>
                    メンバー
                  </div>
                </div>
                <div style={{
                  width: 1,
                  background: '#cbd5e1'
                }}></div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#0EA5E9',
                    marginBottom: 4
                  }}>
                    {selectedCommunity.posts}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: '#64748b',
                    fontWeight: 600
                  }}>
                    投稿
                  </div>
                </div>
              </div>

              <button 
                style={{ 
                  background: 'linear-gradient(135deg,#0EA5E9 0%, #06B6D4 100%)', 
                  color: '#fff', 
                  border: 'none', 
                  width: '100%', 
                  maxWidth: 420, 
                  padding: '15px 20px', 
                  fontSize: 16, 
                  borderRadius: 18, 
                  cursor: 'pointer', 
                  fontWeight: 700, 
                  letterSpacing: '.5px', 
                  transition: 'transform .15s ease, box-shadow .15s ease, filter .15s ease', 
                  /* boxShadow removed */
                  marginTop: 20
                }} 
                onClick={() => {
                  dispatch(setActiveCommunity(selectedCommunity.id));
                  dispatch(navigate('groupChat'));
                  setShowCommunityDetail(false);
                }}
                onMouseOver={e => { 
                  e.currentTarget.style.transform = 'translateY(-2px)'; 
                  e.currentTarget.style.filter = 'brightness(1.08)'; 
                }} 
                onMouseOut={e => { 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.filter = 'brightness(1)'; 
                }}
              >
                チャットに参加
              </button>
            </div>

            {/* Info card */}
            <section style={{ border: '1px solid rgba(15,23,42,0.06)', borderRadius: 10, padding: 24, margin: '0 20px 40px', background: '#fff' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 800, color: '#0b1220' }}>コミュニティについて</h4>
              <p style={{
                fontSize: 14,
                lineHeight: 1.8,
                color: '#64748b',
                margin: 0
              }}>
                {selectedCommunity.description || 'このコミュニティでは、メンバー同士が交流し、情報を共有しています。'}
              </p>
            </section>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};
export default ChatListScreen;
