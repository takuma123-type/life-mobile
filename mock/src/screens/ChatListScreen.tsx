import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setActiveChat } from '../store/chatSlice';
import { navigate, openSmsModal, openGuestProfileModal } from '../store/uiSlice';
import { toggleFollow, setActiveUserId } from '../store/userSlice';
import { setActiveCommunity } from '../store/communitySlice';
import BottomNav from '../components/common/BottomNav';
import { IconSearch, IconAvatar } from '../components/icons';
import Button from '../components/common/Button';
import { mockTranslate } from '../data/mockData';

const ChatListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((s:any)=> s.user.users);
  const following = useAppSelector((s:any)=> s.user.following);
  const communities = useAppSelector((s:any)=> s.communities.list);
  const isAuthenticated = useAppSelector((s:any)=> s.ui.isAuthenticated);
  const me = useAppSelector((s:any)=> s.user.me);
  const [tab, setTab] = useState<'following'|'open'>('following');
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
  
  // ユーザー表示モード（フレンドか全てのユーザーか）
  const [userMode, setUserMode] = useState<'friends' | 'all'>('all');
  
  // コミュニティ表示モード
  const [communityMode, setCommunityMode] = useState<'all' | 'joined' | 'popular'>('all');
  
  // コミュニティ詳細モーダル
  const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
  const [showCommunityDetail, setShowCommunityDetail] = useState(false);
  
  // フレンド一覧（ログイン後のみ表示、デモ用に最初の5人）
  const friendsList = isAuthenticated && me ? users.slice(0, 5) : [];
  
  // 参加中のコミュニティ一覧（ログイン後のみ表示、デモ用に最初の2つ）
  const joinedCommunities = isAuthenticated && me ? communities.slice(0, 2) : [];

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
  const getFilteredUsers = () => {
    let filtered = users.filter((u:any)=> !keyword || u.name.toLowerCase().includes(keyword.toLowerCase()) || (u.message||'').toLowerCase().includes(keyword.toLowerCase()));
    
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
      style={{ paddingBottom:80, background:'var(--color-bg)', minHeight:'100vh', height:'100vh' }}
      onScroll={handleScroll}
    >
      {/* ヘッダー */}
      <div style={{ 
        position:'sticky', 
        top:0, 
        zIndex:10,
        background:'#fff', 
        borderBottom:'1px solid var(--color-border)'
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
        
        {/* タブ */}
        <div style={{ 
          display:'flex', 
          alignItems:'center',
          justifyContent:'center',
          padding:'0 20px',
          gap:32
        }}>
          <button 
            onClick={()=>setTab('following')}
            style={{ 
              background:'none',
              border:'none',
              padding:'12px 0',
              fontSize: tab === 'following' ? 16 : 15,
              fontWeight: tab === 'following' ? 600 : 400,
              color: tab === 'following' ? '#000' : '#999',
              cursor:'pointer',
              position:'relative',
              transition:'all .2s ease'
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
                background:'#0EA5E9',
                borderRadius:'3px 3px 0 0'
              }} />
            )}
          </button>
          <button 
            onClick={()=>setTab('open')}
            style={{ 
              background:'none',
              border:'none',
              padding:'12px 0',
              fontSize: tab === 'open' ? 16 : 15,
              fontWeight: tab === 'open' ? 600 : 400,
              color: tab === 'open' ? '#000' : '#999',
              cursor:'pointer',
              position:'relative',
              transition:'all .2s ease'
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
                background:'#0EA5E9',
                borderRadius:'3px 3px 0 0'
              }} />
            )}
          </button>
        </div>
      </div>

      {tab==='following' && (
        <div>
          {/* サブタブ: すべて / フレンド */}
          <div style={{ 
            padding:'12px 16px 16px 16px', 
            background: '#fff'
          }}>
            <div style={{ display:'flex', gap:24 }}>
              <button
                onClick={() => setUserMode('all')}
                style={{
                  background:'none',
                  border:'none',
                  padding:'8px 0',
                  fontSize:16,
                  fontWeight: userMode === 'all' ? 700 : 400,
                  color: userMode === 'all' ? '#000' : '#999',
                  cursor:'pointer',
                  position:'relative',
                  transition:'all .2s ease',
                  whiteSpace:'nowrap'
                }}
              >
                すべて
                {userMode === 'all' && (
                  <div style={{
                    position:'absolute',
                    bottom:-12,
                    left:0,
                    right:0,
                    height:3,
                    background:'#000'
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
                  padding:'8px 0',
                  fontSize:16,
                  fontWeight: userMode === 'friends' ? 700 : 400,
                  color: userMode === 'friends' ? '#000' : '#999',
                  cursor:'pointer',
                  position:'relative',
                  transition:'all .2s ease',
                  whiteSpace:'nowrap'
                }}
              >
                フレンド
                {userMode === 'friends' && (
                  <div style={{
                    position:'absolute',
                    bottom:-12,
                    left:0,
                    right:0,
                    height:3,
                    background:'#000'
                  }} />
                )}
              </button>
            </div>
          </div>

          {/* フレンドモード: ログイン後のみ表示 */}
          {isAuthenticated && me && userMode === 'friends' && (
            <div style={{ padding:'16px', background:'#fff' }}>
              <div style={{ 
                padding:'0 4px 12px', 
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between'
              }}>
                <h3 style={{ margin:0, fontSize:16, fontWeight:700, color:'#000' }}>フレンド</h3>
                <span style={{ fontSize:13, color:'#666', fontWeight:600 }}>{friendsList.length}人</span>
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
                      gap:14,
                      padding:'16px',
                      cursor:'pointer',
                      transition:'all .3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      background:'#fff',
                      borderRadius:16,
                      boxShadow:'0 2px 8px rgba(0,0,0,0.06)',
                      border:'1px solid rgba(0,0,0,0.04)'
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                    }}
                  >
                    {/* アバター */}
                    <div style={{ position:'relative', flexShrink:0 }}>
                      <div style={{
                        width:60,
                        height:60,
                        borderRadius:'50%',
                        overflow:'hidden',
                        background:'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        border:'2px solid #fff',
                        boxShadow:'0 2px 8px rgba(14, 165, 233, 0.15)'
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
                          background:'#10b981',
                          border:'3px solid #fff',
                          borderRadius:'50%',
                          boxShadow:'0 2px 4px rgba(16, 185, 129, 0.3)'
                        }} />
                      )}
                    </div>
                    
                    {/* メッセージ情報 */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                        <span style={{ fontWeight:700, fontSize:16, color:'#000' }}>{u.name}</span>
                        <span style={{ fontSize:12, color:'#999', fontWeight:500 }}>10:30</span>
                      </div>
                      <p style={{
                        margin:0,
                        fontSize:14,
                        color:'#666',
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
            <div style={{ padding:'8px 8px 16px 8px', background:'#fff' }}>
              <div style={{ 
                display:'grid', 
                gridTemplateColumns:'repeat(2, 1fr)', 
                gap:8 
              }}>
                {displayUsers.map((u:any, index:number)=>(
              <div 
                key={u.id} 
                style={{ 
                  cursor:'pointer',
                  borderRadius:12,
                  overflow:'hidden',
                  background:'#fff',
                  boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
                  transition:'all .2s ease'
                }} 
                onClick={()=> {
                  dispatch(setActiveUserId(u.id));
                  dispatch(openGuestProfileModal());
                }}
                onMouseOver={e=>{
                  e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.12)';
                  e.currentTarget.style.transform='translateY(-2px)';
                }}
                onMouseOut={e=>{
                  e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform='translateY(0)';
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
                    bottom:0,
                    left:0,
                    right:0,
                    background:'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    padding:'24px 8px 8px 8px',
                    color:'#fff'
                  }}>
                    <div style={{
                      fontSize:13,
                      fontWeight:700,
                      lineHeight:1.3,
                      overflow:'hidden',
                      textOverflow:'ellipsis',
                      display:'-webkit-box',
                      WebkitLineClamp:2,
                      WebkitBoxOrient:'vertical',
                      textShadow:'0 1px 3px rgba(0,0,0,0.5)'
                    }}>
                      {u.message || 'よろしくお願いします'}
                    </div>
                  </div>
                </div>
                
                {/* ユーザー情報（カード下部） */}
                <div style={{ 
                  padding:'8px 10px'
                }}>
                  <div style={{
                    fontSize:12,
                    fontWeight:600,
                    color:'#000',
                    overflow:'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap'
                  }}>
                    {u.name}
                    {u.age && (
                      <span style={{ 
                        marginLeft:6,
                        fontSize:11,
                        color:'#666',
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
              <button
                onClick={() => dispatch(openSmsModal())}
                className="btn-gradient"
                style={{
                  padding:'12px 32px',
                  fontSize:15
                }}
              >
                ログイン
              </button>
            </div>
          )}
          
          {/* コミュニティモード切り替えボタン */}
          <div style={{ 
            padding:'12px 16px 28px 16px', 
            background:'#fff'
          }}>
            <div style={{ 
              display:'flex', 
              gap:24
            }}>
              <button
                onClick={() => setCommunityMode('all')}
                style={{
                  background:'none',
                  border:'none',
                  padding:'8px 0',
                  fontSize:16,
                  fontWeight: communityMode === 'all' ? 700 : 400,
                  color: communityMode === 'all' ? '#000' : '#999',
                  cursor:'pointer',
                  position:'relative',
                  transition:'all .2s ease',
                  whiteSpace:'nowrap'
                }}
              >
                すべて
                {communityMode === 'all' && (
                  <div style={{
                    position:'absolute',
                    bottom:-12,
                    left:0,
                    right:0,
                    height:3,
                    background:'#000'
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
                  padding:'8px 0',
                  fontSize:16,
                  fontWeight: communityMode === 'joined' ? 700 : 400,
                  color: communityMode === 'joined' ? '#000' : '#999',
                  cursor:'pointer',
                  position:'relative',
                  transition:'all .2s ease',
                  whiteSpace:'nowrap'
                }}
              >
                参加中
                {communityMode === 'joined' && (
                  <div style={{
                    position:'absolute',
                    bottom:-12,
                    left:0,
                    right:0,
                    height:3,
                    background:'#000'
                  }} />
                )}
              </button>
            </div>
          </div>
          
          {/* 参加中セクション - ログイン後のみ表示、LINE風リスト */}
                    {/* 参加中モード: ログイン後のみ表示 */}
          {communityMode === 'joined' && isAuthenticated && me && (
            <div style={{ padding:'16px', background:'#f8f9fa' }}>
              <div style={{ 
                padding:'0 4px 12px', 
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between'
              }}>
                <h3 style={{ margin:0, fontSize:16, fontWeight:700, color:'#000' }}>参加中のコミュニティ</h3>
                <span style={{ fontSize:13, color:'#666', fontWeight:600 }}>{joinedCommunities.length}件</span>
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
                      gap:14,
                      padding:'16px',
                      cursor:'pointer',
                      transition:'all .3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      background:'#fff',
                      borderRadius:16,
                      boxShadow:'0 2px 8px rgba(0,0,0,0.06)',
                      border:'1px solid rgba(0,0,0,0.04)'
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                    }}
                  >
                    {/* コミュニティアイコン */}
                    <div style={{ flexShrink:0 }}>
                      <div style={{
                        width:60,
                        height:60,
                        borderRadius:14,
                        background:'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
                        border:'2px solid #fff',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        fontSize:12,
                        fontWeight:700,
                        color:'#0EA5E9',
                        boxShadow:'0 2px 8px rgba(14, 165, 233, 0.15)'
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
                            fontSize:16, 
                            color:'#000',
                            overflow:'hidden',
                            textOverflow:'ellipsis',
                            whiteSpace:'nowrap'
                          }}>
                            {c.name}
                          </span>
                          {c.category && (
                            <span style={{ 
                              fontSize:11, 
                              background:'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
                              color:'#fff',
                              padding:'3px 8px', 
                              borderRadius:12,
                              fontWeight:700,
                              flexShrink:0,
                              boxShadow:'0 2px 4px rgba(14, 165, 233, 0.3)'
                            }}>
                              {c.category}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize:12, color:'#999', fontWeight:500, marginLeft:8, flexShrink:0 }}>2時間前</span>
                      </div>
                      <p style={{
                        margin:'0 0 6px',
                        fontSize:14,
                        color:'#666',
                        overflow:'hidden',
                        textOverflow:'ellipsis',
                        whiteSpace:'nowrap',
                        lineHeight:1.4
                      }}>
                        最新のメッセージがここに表示されます
                      </p>
                      <div style={{ 
                        fontSize:13,
                        color:'#999',
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
            <div style={{ padding:'8px 8px 16px 8px', background:'#fff' }}>
              <div style={{ 
                display:'grid', 
                gridTemplateColumns:'repeat(2, 1fr)', 
                gap:8 
              }}>
            {filteredCommunities.map((c:any, index:number)=>(
              <div 
                key={c.id} 
                style={{ 
                  cursor:'pointer',
                  borderRadius:12,
                  overflow:'hidden',
                  background:'#fff',
                  boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
                  transition:'all .2s ease'
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
                  e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.12)';
                  e.currentTarget.style.transform='translateY(-2px)';
                }}
                onMouseOut={e=>{
                  e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform='translateY(0)';
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
                    bottom:0,
                    left:0,
                    right:0,
                    background:'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    padding:'24px 8px 8px 8px',
                    color:'#fff'
                  }}>
                    <div style={{
                      fontSize:13,
                      fontWeight:700,
                      lineHeight:1.3,
                      overflow:'hidden',
                      textOverflow:'ellipsis',
                      display:'-webkit-box',
                      WebkitLineClamp:2,
                      WebkitBoxOrient:'vertical',
                      textShadow:'0 1px 3px rgba(0,0,0,0.5)'
                    }}>
                      {c.name}
                    </div>
                    {c.category && (
                      <div style={{ 
                        display:'inline-block',
                        fontSize:10, 
                        background:'rgba(0,0,0,0.6)',
                        color:'#fff',
                        padding:'2px 8px', 
                        borderRadius:10,
                        fontWeight:600,
                        marginTop:4,
                        backdropFilter:'blur(4px)'
                      }}>
                        {c.category}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* コミュニティ情報（カード下部） */}
                <div style={{ 
                  padding:'8px',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-between'
                }}>
                  <div style={{
                    fontSize:12,
                    color:'#666',
                    fontWeight:600
                  }}>
                    {c.members}人
                  </div>
                  <div style={{
                    fontSize:11,
                    color:'#999',
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
            background:'rgba(0,0,0,.5)', 
            backdropFilter:'blur(6px)',
            display:'flex', 
            alignItems:'flex-end',
            zIndex:100
          }} 
          onClick={()=>{setSearchOpen(false); resetSearch();}}
        >
          <div 
            style={{ 
              width:'100%', 
              background:'#fff',
              borderRadius:'20px 20px 0 0', 
              padding:'24px 20px 32px',
              maxHeight:'80vh', 
              overflowY:'auto',
              boxShadow:'0 -4px 20px rgba(0,0,0,.1)'
            }} 
            onClick={e=>e.stopPropagation()}
          >
            <h2 style={{ margin:'0 0 20px', fontSize:18, fontWeight:700 }}>フレンドを検索</h2>
            
            {/* キーワード */}
            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', marginBottom:8, fontSize:14, fontWeight:600 }}>キーワード</label>
              <input 
                placeholder='ユーザー名、趣味で検索...' 
                value={keyword} 
                onChange={e=>setKeyword(e.target.value)} 
                style={{ 
                  width:'100%',
                  padding:'12px 16px',
                  border:'2px solid #000',
                  borderRadius:12,
                  fontSize:15
                }} 
              />
            </div>

            {/* 年代 */}
            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', marginBottom:8, fontSize:14, fontWeight:600 }}>年代</label>
              <select 
                value={searchAge} 
                onChange={e=>setSearchAge(e.target.value)}
                style={{ 
                  width:'100%',
                  padding:'12px 16px',
                  border:'2px solid #000',
                  borderRadius:12,
                  fontSize:15,
                  background:'#fff'
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
            </div>

            {/* 都道府県 */}
            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', marginBottom:8, fontSize:14, fontWeight:600 }}>都道府県</label>
              <select 
                value={searchRegion} 
                onChange={e=>setSearchRegion(e.target.value)}
                style={{ 
                  width:'100%',
                  padding:'12px 16px',
                  border:'2px solid #000',
                  borderRadius:12,
                  fontSize:15,
                  background:'#fff'
                }}
              >
                <option value="">選択してください</option>
                <option value="東京">東京</option>
                <option value="大阪">大阪</option>
                <option value="神奈川">神奈川</option>
                <option value="愛知">愛知</option>
                <option value="福岡">福岡</option>
                <option value="北海道">北海道</option>
              </select>
            </div>

            {/* よく使う時間帯 */}
            <div style={{ marginBottom:24 }}>
              <label style={{ display:'block', marginBottom:8, fontSize:14, fontWeight:600 }}>よく使う時間帯</label>
              <select 
                value={searchTime} 
                onChange={e=>setSearchTime(e.target.value)}
                style={{ 
                  width:'100%',
                  padding:'12px 16px',
                  border:'2px solid #000',
                  borderRadius:12,
                  fontSize:15,
                  background:'#fff'
                }}
              >
                <option value="">選択してください</option>
                <option value="朝">朝</option>
                <option value="昼">昼</option>
                <option value="夜">夜</option>
                <option value="深夜">深夜</option>
              </select>
            </div>

            {/* ボタン */}
            <div style={{ display:'flex', gap:12 }}>
              <button 
                onClick={()=>{setSearchOpen(false); resetSearch();}}
                style={{
                  flex:1,
                  background:'#fff',
                  color:'#000',
                  border:'2px solid #000',
                  padding:'14px',
                  borderRadius:12,
                  fontSize:15,
                  fontWeight:600,
                  cursor:'pointer',
                  transition:'background .2s ease'
                }}
                onMouseOver={e=>(e.currentTarget.style.background='#f9f9f9')}
                onMouseOut={e=>(e.currentTarget.style.background='#fff')}
              >
                キャンセル
              </button>
              <button 
                onClick={handleSearch}
                style={{
                  flex:1,
                  background:'#000',
                  color:'#fff',
                  border:'none',
                  padding:'14px',
                  borderRadius:12,
                  fontSize:15,
                  fontWeight:600,
                  cursor:'pointer',
                  transition:'opacity .2s ease'
                }}
                onMouseOver={e=>(e.currentTarget.style.opacity='0.85')}
                onMouseOut={e=>(e.currentTarget.style.opacity='1')}
              >
                検索する
              </button>
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
              boxShadow:'0 20px 60px rgba(0,0,0,.15)'
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
                      borderRadius:'50%', 
                      background:'#f5f5f5', 
                      border:'2px solid var(--color-border)',
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
            background:'rgba(0,0,0,.5)', 
            backdropFilter:'blur(6px)',
            display:'flex', 
            alignItems:'flex-end',
            zIndex:100
          }} 
          onClick={()=>{setCommunitySearchOpen(false); resetCommunitySearch();}}
        >
          <div 
            style={{ 
              width:'100%',
              background:'#fff',
              borderRadius:'20px 20px 0 0',
              padding:'24px 20px 32px',
              maxHeight:'80vh',
              overflowY:'auto'
            }}
            onClick={e=>e.stopPropagation()}
          >
            <h2 style={{ margin:'0 0 24px', fontSize:20, fontWeight:700 }}>コミュニティを検索</h2>
            
            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', marginBottom:8, fontSize:14, fontWeight:600, color:'#000' }}>キーワード</label>
              <input 
                type="text" 
                placeholder="グループ名で検索..." 
                value={communityKeyword} 
                onChange={e=>setCommunityKeyword(e.target.value)}
                style={{ 
                  width:'100%', 
                  padding:'16px', 
                  border:'1px solid #ddd', 
                  borderRadius:8, 
                  fontSize:16,
                  outline:'none',
                  background:'#fff',
                  boxSizing:'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom:32 }}>
              <label style={{ display:'block', marginBottom:8, fontSize:14, fontWeight:600, color:'#000' }}>カテゴリ</label>
              <select 
                value={communityCategory} 
                onChange={e=>setCommunityCategory(e.target.value)}
                style={{ 
                  width:'100%', 
                  padding:'16px', 
                  border:'1px solid #ddd', 
                  borderRadius:8, 
                  fontSize:16,
                  outline:'none',
                  background:'#fff',
                  boxSizing:'border-box',
                  appearance:'none',
                  backgroundImage:'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                  backgroundRepeat:'no-repeat',
                  backgroundPosition:'right 12px center',
                  backgroundSize:'20px',
                  paddingRight:'40px'
                }}
              >
                <option value="">すべて</option>
                <option value="ゲーム">ゲーム</option>
                <option value="アニメ">アニメ</option>
                <option value="音楽">音楽</option>
                <option value="スポーツ">スポーツ</option>
                <option value="雑談">雑談</option>
              </select>
            </div>

            <div style={{ display:'flex', gap:12 }}>
              <button 
                onClick={()=>{setCommunitySearchOpen(false); resetCommunitySearch();}}
                style={{ 
                  flex:1,
                  padding:'16px',
                  background:'#fff',
                  border:'1px solid #ddd',
                  borderRadius:8,
                  fontSize:16,
                  fontWeight:600,
                  cursor:'pointer',
                  transition:'background .2s ease',
                  color:'#000'
                }}
                onMouseOver={e=>(e.currentTarget.style.background='#f5f5f5')}
                onMouseOut={e=>(e.currentTarget.style.background='#fff')}
              >
                キャンセル
              </button>
              <button 
                onClick={handleCommunitySearch}
                style={{ 
                  flex:1,
                  padding:'16px',
                  background:'#000',
                  color:'#fff',
                  border:'none',
                  borderRadius:8,
                  fontSize:16,
                  fontWeight:600,
                  cursor:'pointer',
                  transition:'background .2s ease'
                }}
                onMouseOver={e=>(e.currentTarget.style.background='#333')}
                onMouseOut={e=>(e.currentTarget.style.background='#000')}
              >
                検索する
              </button>
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
              background:'#fff',
              borderRadius:20,
              padding:'24px 20px',
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
                    borderRadius:16, 
                    background:'#f5f5f5',
                    border:'1px solid #e5e5e5',
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

      {/* コミュニティ詳細モーダル */}
      {showCommunityDetail && selectedCommunity && (
        <div style={{
          position:'fixed',
          top:0,
          left:0,
          right:0,
          bottom:0,
          background:'rgba(0,0,0,0.5)',
          zIndex:9999,
          display:'flex',
          alignItems:'flex-end',
          animation:'fadeIn 0.2s ease-out'
        }}
        onClick={()=>setShowCommunityDetail(false)}
        >
          <div style={{
            width:'100%',
            maxHeight:'85vh',
            background:'#fff',
            borderRadius:'20px 20px 0 0',
            overflow:'auto',
            animation:'slideUp 0.3s ease-out'
          }}
          onClick={e=>e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div style={{
              height:180,
              background:'linear-gradient(180deg, #0EA5E9 0%, #38BDF8 100%)',
              position:'relative',
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              justifyContent:'center',
              padding:20
            }}>
              <button style={{
                position:'absolute',
                top:16,
                right:16,
                width:32,
                height:32,
                borderRadius:'50%',
                border:'none',
                background:'rgba(255,255,255,0.2)',
                color:'#fff',
                fontSize:20,
                cursor:'pointer',
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
              }}
              onClick={()=>setShowCommunityDetail(false)}
              >
                ×
              </button>
              
              <div style={{
                width:120,
                height:120,
                borderRadius:20,
                background:'#fff',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                fontSize:48,
                boxShadow:'0 4px 12px rgba(0,0,0,0.1)'
              }}>
                {selectedCommunity.icon}
              </div>
            </div>

            {/* コンテンツ */}
            <div style={{padding:20}}>
              <div style={{
                display:'flex',
                alignItems:'center',
                gap:8,
                marginBottom:12
              }}>
                <h2 style={{
                  fontSize:24,
                  fontWeight:'bold',
                  margin:0,
                  color:'#1f2937'
                }}>
                  {selectedCommunity.name}
                </h2>
                <span style={{
                  padding:'4px 12px',
                  borderRadius:12,
                  fontSize:12,
                  fontWeight:'600',
                  background:'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
                  color:'#0284c7'
                }}>
                  {selectedCommunity.category}
                </span>
              </div>

              {/* 統計情報 */}
              <div style={{
                display:'flex',
                gap:12,
                marginBottom:20,
                padding:16,
                background:'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
                borderRadius:12
              }}>
                <div style={{flex:1,textAlign:'center'}}>
                  <div style={{
                    fontSize:24,
                    fontWeight:'bold',
                    color:'#0EA5E9',
                    marginBottom:4
                  }}>
                    {selectedCommunity.members}
                  </div>
                  <div style={{
                    fontSize:12,
                    color:'#64748b'
                  }}>
                    メンバー
                  </div>
                </div>
                <div style={{
                  width:1,
                  background:'#cbd5e1'
                }}></div>
                <div style={{flex:1,textAlign:'center'}}>
                  <div style={{
                    fontSize:24,
                    fontWeight:'bold',
                    color:'#0EA5E9',
                    marginBottom:4
                  }}>
                    {selectedCommunity.posts}
                  </div>
                  <div style={{
                    fontSize:12,
                    color:'#64748b'
                  }}>
                    投稿
                  </div>
                </div>
              </div>

              {/* 説明 */}
              <div style={{
                marginBottom:20
              }}>
                <h3 style={{
                  fontSize:16,
                  fontWeight:'600',
                  color:'#1f2937',
                  marginBottom:8
                }}>
                  コミュニティについて
                </h3>
                <p style={{
                  fontSize:14,
                  lineHeight:1.6,
                  color:'#64748b',
                  margin:0
                }}>
                  {selectedCommunity.description || 'このコミュニティでは、メンバー同士が交流し、情報を共有しています。'}
                </p>
              </div>

              {/* アクションボタン */}
              <div style={{
                display:'flex',
                gap:12
              }}>
                <button style={{
                  flex:1,
                  padding:'14px 24px',
                  borderRadius:12,
                  border:'1px solid #e5e7eb',
                  background:'#fff',
                  color:'#64748b',
                  fontSize:16,
                  fontWeight:'600',
                  cursor:'pointer',
                  transition:'all 0.2s'
                }}
                onClick={()=>setShowCommunityDetail(false)}
                onMouseOver={e=>{
                  e.currentTarget.style.background='#f9fafb';
                }}
                onMouseOut={e=>{
                  e.currentTarget.style.background='#fff';
                }}
                >
                  閉じる
                </button>
                <button style={{
                  flex:2,
                  padding:'14px 24px',
                  borderRadius:12,
                  border:'none',
                  background:'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
                  color:'#fff',
                  fontSize:16,
                  fontWeight:'600',
                  cursor:'pointer',
                  boxShadow:'0 2px 8px rgba(14,165,233,0.3)',
                  transition:'all 0.2s'
                }}
                onClick={()=>{
                  dispatch(setActiveCommunity(selectedCommunity.id));
                  dispatch(navigate('groupChat'));
                  setShowCommunityDetail(false);
                }}
                onMouseOver={e=>{
                  e.currentTarget.style.transform='translateY(-2px)';
                  e.currentTarget.style.boxShadow='0 4px 12px rgba(14,165,233,0.4)';
                }}
                onMouseOut={e=>{
                  e.currentTarget.style.transform='translateY(0)';
                  e.currentTarget.style.boxShadow='0 2px 8px rgba(14,165,233,0.3)';
                }}
                >
                  チャットに参加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};
export default ChatListScreen;
