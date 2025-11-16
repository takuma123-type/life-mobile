import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setActiveChat } from '../store/chatSlice';
import { navigate, openSmsModal } from '../store/uiSlice';
import { toggleFollow } from '../store/userSlice';
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

  const filteredUsers = users.filter((u:any)=> !keyword || u.name.toLowerCase().includes(keyword.toLowerCase()) || (u.message||'').toLowerCase().includes(keyword.toLowerCase()));
  const filteredCommunities = communities.filter((c:any)=> !keyword || c.name.toLowerCase().includes(keyword.toLowerCase()));
  
  // ログイン前またはフレンドが0人の場合は新規作成順のユーザーを表示（無限スクロール対応）
  const displayUsers = (!isAuthenticated || !me || following.length === 0) 
    ? users.slice(0, displayCount) 
    : filteredUsers;

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
      style={{ paddingBottom:80, background:'var(--color-bg)', minHeight:'100vh', height:'100vh', overflow:'auto' }}
      onScroll={handleScroll}
    >
      {/* Tabs */}
      <div style={{ display:'flex', gap:12, padding:'16px 20px', background:'#fff', borderBottom:'1px solid var(--color-border)' }}>
        <button 
          onClick={()=>setTab('following')}
          style={{ 
            flex:1,
            background: tab==='following' ? '#000' : '#fff',
            color: tab==='following' ? '#fff' : '#000',
            border: tab==='following' ? 'none' : '1px solid var(--color-border)',
            padding:'12px 20px',
            borderRadius:20,
            fontSize:15,
            fontWeight:600,
            cursor:'pointer',
            transition:'all .2s ease'
          }}
        >
          フレンド
        </button>
        <button 
          onClick={()=>setTab('open')}
          style={{ 
            flex:1,
            background: tab==='open' ? '#000' : '#fff',
            color: tab==='open' ? '#fff' : '#000',
            border: tab==='open' ? 'none' : '1px solid var(--color-border)',
            padding:'12px 20px',
            borderRadius:20,
            fontSize:15,
            fontWeight:600,
            cursor:'pointer',
            transition:'all .2s ease'
          }}
        >
          コミュニティ
        </button>
      </div>

      {tab==='following' && (
        <div style={{ padding:'20px', background:'var(--color-bg)' }}>
          {/* ログイン前またはフレンド0人の場合の案内メッセージ */}

          <div style={{ 
            display:'grid', 
            gridTemplateColumns:'repeat(2, 1fr)', 
            gap:12 
          }}>
            {displayUsers.map((u:any)=>(
              <div 
                key={u.id} 
                style={{ 
                  display:'flex', 
                  flexDirection:'column',
                  alignItems:'center',
                  cursor:'pointer',
                  padding:'16px 12px',
                  background:'#fff',
                  border:'1px solid #e5e5e5',
                  borderRadius:16,
                  transition:'all .2s ease',
                  boxShadow:'0 1px 3px rgba(0,0,0,.04)'
                }} 
                onClick={()=> {
                  if (!isAuthenticated || !me) {
                    dispatch(openSmsModal());
                    return;
                  }
                  dispatch(setActiveChat(u.id)); 
                  dispatch(navigate('chatDetail'));
                }}
                onMouseOver={e=>{
                  e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,.08)';
                  e.currentTarget.style.transform='translateY(-2px)';
                }}
                onMouseOut={e=>{
                  e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.04)';
                  e.currentTarget.style.transform='translateY(0)';
                }}
              >
                <div style={{ position:'relative', marginBottom:10 }}>
                  <div style={{ 
                    width:60, 
                    height:60, 
                    borderRadius:'50%', 
                    background:'#f5f5f5', 
                    border:'2px solid #e5e5e5',
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
                      bottom:0, 
                      right:0, 
                      width:14, 
                      height:14, 
                      background:'#10b981', 
                      border:'2px solid #fff', 
                      borderRadius:'50%' 
                    }} />
                  )}
                </div>
                <div style={{ textAlign:'center', width:'100%' }}>
                  <div style={{ marginBottom:4 }}>
                    <span style={{ fontWeight:700, fontSize:13, display:'block', marginBottom:2 }}>{u.name}</span>
                    {u.age && (
                      <span style={{ 
                        fontSize:10, 
                        background:'#000', 
                        color:'#fff',
                        padding:'2px 6px', 
                        borderRadius:10,
                        fontWeight:600
                      }}>
                        {u.age}
                      </span>
                    )}
                  </div>
                  <p style={{ 
                    margin:0, 
                    fontSize:11, 
                    color:'#666',
                    overflow:'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap',
                    width:'100%'
                  }}>
                    {u.message||'よろしくお願いします'}
                  </p>
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

      {tab==='open' && (
        <div style={{ padding:'20px', background:'var(--color-bg)' }}>
          {/* 参加中セクション - ログイン時のみ表示 */}
          {isAuthenticated && me && (
            <>
              <h3 style={{ margin:'0 0 16px', fontSize:15, fontWeight:700, color:'#000' }}>参加中</h3>
              <div style={{ marginBottom:32 }}>
                {filteredCommunities.slice(0, 2).map((c:any)=>(
                  <div 
                    key={c.id} 
                    style={{ 
                      display:'flex', 
                      gap:16, 
                      alignItems:'center', 
                      cursor:'pointer',
                      padding:'18px',
                      background:'#fff',
                      border:'1px solid #e5e5e5',
                      borderRadius:16,
                      marginBottom:12,
                      transition:'all .2s ease',
                      boxShadow:'0 1px 3px rgba(0,0,0,.04)'
                    }} 
                    onClick={()=> {
                      if (!isAuthenticated || !me) {
                        dispatch(openSmsModal());
                        return;
                      }
                      dispatch(setActiveCommunity(c.id)); 
                      dispatch(navigate('communityDetail'));
                    }}
                    onMouseOver={e=>{
                      e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,.08)';
                      e.currentTarget.style.transform='translateY(-2px)';
                    }}
                    onMouseOut={e=>{
                      e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.04)';
                      e.currentTarget.style.transform='translateY(0)';
                    }}
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
                        margin:'0 0 4px', 
                        fontSize:13, 
                        color:'#666'
                      }}>
                        {c.members}人 · {c.posts}投稿
                      </p>
                      <p style={{ 
                        margin:0, 
                        fontSize:12, 
                        color:'#999'
                      }}>
                        2時間前
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 人気のコミュニティセクション */}
          <h3 style={{ margin:'0 0 16px', fontSize:15, fontWeight:700, color:'#000' }}>人気のコミュニティ</h3>
          <div style={{ 
            display:'grid', 
            gridTemplateColumns:'repeat(2, 1fr)', 
            gap:12 
          }}>
            {filteredCommunities.map((c:any)=>(
              <div 
                key={c.id} 
                style={{ 
                  display:'flex', 
                  flexDirection:'column',
                  cursor:'pointer',
                  padding:'16px',
                  background:'#fff',
                  border:'1px solid #e5e5e5',
                  borderRadius:16,
                  transition:'all .2s ease',
                  boxShadow:'0 1px 3px rgba(0,0,0,.04)'
                }} 
                onClick={()=> {
                  if (!isAuthenticated || !me) {
                    dispatch(openSmsModal());
                    return;
                  }
                  dispatch(setActiveCommunity(c.id)); 
                  dispatch(navigate('communityDetail'));
                }}
                onMouseOver={e=>{
                  e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,.08)';
                  e.currentTarget.style.transform='translateY(-2px)';
                }}
                onMouseOut={e=>{
                  e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.04)';
                  e.currentTarget.style.transform='translateY(0)';
                }}
              >
                <div style={{ 
                  width:'100%',
                  aspectRatio:'1',
                  borderRadius:12, 
                  background:'#f5f5f5',
                  border:'1px solid #e5e5e5',
                  display:'flex', 
                  alignItems:'center', 
                  justifyContent:'center', 
                  fontSize:12,
                  fontWeight:600,
                  color:'#999',
                  marginBottom:12
                }}>
                  IMG
                </div>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6, flexWrap:'wrap' }}>
                    <span style={{ fontWeight:700, fontSize:14, color:'#000' }}>{c.name}</span>
                    {c.category && (
                      <span style={{ 
                        fontSize:10, 
                        background:'#000',
                        color:'#fff',
                        padding:'2px 8px', 
                        borderRadius:10,
                        fontWeight:600
                      }}>
                        {c.category}
                      </span>
                    )}
                  </div>
                  <p style={{ 
                    margin:0, 
                    fontSize:12, 
                    color:'#666'
                  }}>
                    {c.members}人 · {c.posts}投稿
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={()=>{
          if (tab === 'following') {
            setSearchOpen(!searchOpen);
          } else {
            setCommunitySearchOpen(!communitySearchOpen);
          }
        }} 
        aria-label='検索' 
        style={{ 
          position:'fixed', 
          right:20, 
          bottom:100, 
          width:56, 
          height:56, 
          borderRadius:'50%', 
          background:'#000', 
          color:'#fff', 
          border:'none', 
          cursor:'pointer', 
          boxShadow:'0 4px 16px rgba(0,0,0,.2)', 
          display:'flex', 
          alignItems:'center', 
          justifyContent:'center',
          transition:'all .2s ease',
          zIndex:50
        }}
        onMouseOver={e=>(e.currentTarget.style.transform='scale(1.05)')}
        onMouseOut={e=>(e.currentTarget.style.transform='scale(1)')}
      >
        <IconSearch size={24} />
      </button>
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
          onClick={()=>{setShowResults(false); setSearchOpen(false); resetSearch();}}
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
                onClick={()=>{setShowResults(false); setSearchOpen(false); resetSearch();}}
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
              <label style={{ display:'block', marginBottom:8, fontSize:14, fontWeight:600 }}>キーワード</label>
              <input 
                type="text" 
                placeholder="グループ名で検索..." 
                value={communityKeyword} 
                onChange={e=>setCommunityKeyword(e.target.value)}
                style={{ 
                  width:'100%', 
                  padding:'14px 16px', 
                  border:'2px solid #000', 
                  borderRadius:12, 
                  fontSize:15,
                  outline:'none'
                }}
              />
            </div>

            <div style={{ marginBottom:28 }}>
              <label style={{ display:'block', marginBottom:8, fontSize:14, fontWeight:600 }}>カテゴリ</label>
              <select 
                value={communityCategory} 
                onChange={e=>setCommunityCategory(e.target.value)}
                style={{ 
                  width:'100%', 
                  padding:'14px 16px', 
                  border:'2px solid #000', 
                  borderRadius:12, 
                  fontSize:15,
                  outline:'none',
                  background:'#fff'
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
                  padding:'14px',
                  background:'#fff',
                  border:'2px solid #000',
                  borderRadius:12,
                  fontSize:15,
                  fontWeight:600,
                  cursor:'pointer',
                  transition:'opacity .2s ease'
                }}
                onMouseOver={e=>(e.currentTarget.style.opacity='0.7')}
                onMouseOut={e=>(e.currentTarget.style.opacity='1')}
              >
                キャンセル
              </button>
              <button 
                onClick={handleCommunitySearch}
                style={{ 
                  flex:1,
                  padding:'14px',
                  background:'#000',
                  color:'#fff',
                  border:'none',
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
          onClick={()=>{setCommunityShowResults(false); setCommunitySearchOpen(false); resetCommunitySearch();}}
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
                onClick={()=>{setCommunityShowResults(false); setCommunitySearchOpen(false); resetCommunitySearch();}}
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
                    dispatch(setActiveCommunity(c.id)); 
                    dispatch(navigate('communityDetail'));
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

      <BottomNav />
    </div>
  );
};
export default ChatListScreen;
