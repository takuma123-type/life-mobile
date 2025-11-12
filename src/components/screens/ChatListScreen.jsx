// Chat List Screen Component
function ChatListScreen({ 
    chatType, 
    setChatType, 
    setSelectedUser, 
    setSelectedCommunity, 
    setCurrentScreen,
    currentScreen,
    setViewingProfile,
    requireAuth
}) {
    const { useState } = React;
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [previewCommunity, setPreviewCommunity] = useState(null);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [selectedProfileUser, setSelectedProfileUser] = useState(null);
    const [searchFilters, setSearchFilters] = useState({ keyword: '', category: '', age: '', region: '', activeTime: '' });
    const [searchResults, setSearchResults] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState(null);
    const [isFollowing, setIsFollowing] = useState({});

    const handleCommunityClick = (community) => {
        setPreviewCommunity(community);
        setShowPreviewModal(true);
    };

    const handleJoinCommunity = () => {
        if (requireAuth) {
            requireAuth(() => {
                setSelectedCommunity(previewCommunity);
                setShowPreviewModal(false);
                setCurrentScreen('communityDetail');
            });
        } else {
            setSelectedCommunity(previewCommunity);
            setShowPreviewModal(false);
            setCurrentScreen('communityDetail');
        }
    };

    const handleSearch = () => {
        if (chatType === 'following') {
            // フレンド検索
            let results = mockUsers;
            
            if (searchFilters.keyword) {
                results = results.filter(u => 
                    u.name.toLowerCase().includes(searchFilters.keyword.toLowerCase()) ||
                    u.message.toLowerCase().includes(searchFilters.keyword.toLowerCase())
                );
            }
            
            if (searchFilters.age) {
                results = results.filter(u => u.age === searchFilters.age);
            }
            
            if (searchFilters.region) {
                results = results.filter(u => 
                    u.region.toLowerCase().includes(searchFilters.region.toLowerCase()) ||
                    (u.city && u.city.toLowerCase().includes(searchFilters.region.toLowerCase()))
                );
            }
            
            if (searchFilters.activeTime) {
                results = results.filter(u => u.activeTime === searchFilters.activeTime);
            }
            
            setSearchResults(results);
        } else {
            // コミュニティ検索
            let results = mockCommunities;
            
            if (searchFilters.keyword) {
                results = results.filter(c => 
                    c.name.toLowerCase().includes(searchFilters.keyword.toLowerCase())
                );
            }
            
            if (searchFilters.category) {
                results = results.filter(c => c.category === searchFilters.category);
            }
            
            setSearchResults(results);
        }
        
        setAppliedFilters({...searchFilters});
        setShowSearchModal(false);
        setShowResultsModal(true);
    };

    const clearSearch = () => {
        setSearchResults(null);
        setAppliedFilters(null);
        setSearchFilters({ keyword: '', category: '', age: '', region: '', activeTime: '' });
        setShowResultsModal(false);
    };

    return (
        <div style={{ paddingBottom: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
            <Header title="LIFE" />
            
            <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    <button
                        onClick={() => setChatType('following')}
                        className={chatType === 'following' ? 'wire-button' : 'wire-button-outline'}
                        style={{ flex: 1, padding: '14px', borderRadius: '30px', fontSize: '15px' }}
                    >
                        フレンド
                    </button>
                    <button
                        onClick={() => setChatType('open')}
                        className={chatType === 'open' ? 'wire-button' : 'wire-button-outline'}
                        style={{ flex: 1, padding: '14px', borderRadius: '30px', fontSize: '15px' }}
                    >
                        コミュニティ
                    </button>
                </div>

                {chatType === 'following' && (
                    <div>
                        {mockUsers.map(user => (
                            <div
                                key={user.id}
                                onClick={() => {
                                    if (requireAuth) {
                                        requireAuth(() => {
                                            setSelectedUser(user);
                                            setCurrentScreen('chatDetail');
                                        });
                                    } else {
                                        setSelectedUser(user);
                                        setCurrentScreen('chatDetail');
                                    }
                                }}
                                className="wire-box"
                                style={{ padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}
                            >
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <div className="wire-avatar" style={{ width: '60px', height: '60px', borderRadius: '50%', fontSize: '22px' }}>
                                        {user.avatar}
                                        {user.online && <div className="online-indicator"></div>}
                                    </div>
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{user.name}</span>
                                        <span className="wire-badge">{user.age}</span>
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.message}</p>
                                </div>
                                <span style={{ fontSize: '11px', color: '#999', flexShrink: 0 }}>{user.time}</span>
                            </div>
                        ))}
                    </div>
                )}

                {chatType === 'open' && (
                    <div>
                        {/* 参加中のコミュニティ */}
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '16px' }}>参加中</h3>
                            {mockCommunities.slice(0, 2).map(community => (
                                <div
                                    key={`joined-${community.id}`}
                                    onClick={() => {
                                        if (requireAuth) {
                                            requireAuth(() => {
                                                setSelectedCommunity(community);
                                                setCurrentScreen('communityDetail');
                                            });
                                        } else {
                                            setSelectedCommunity(community);
                                            setCurrentScreen('communityDetail');
                                        }
                                    }}
                                    className="wire-box"
                                    style={{ padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}
                                >
                                    <div className="wire-avatar" style={{ width: '60px', height: '60px', borderRadius: '16px', fontSize: '14px', flexShrink: 0 }}>
                                        IMG
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{community.name}</span>
                                            <span className="wire-badge">{community.category}</span>
                                        </div>
                                        <p style={{ fontSize: '12px', color: '#666' }}>
                                            {community.members}人 · {community.posts}投稿
                                        </p>
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#999', flexShrink: 0 }}>
                                        2時間前
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 人気のコミュニティ */}
                        <div>
                            <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '16px' }}>人気のコミュニティ</h3>
                            {mockCommunities.map(community => (
                                <div
                                    key={community.id}
                                    onClick={() => handleCommunityClick(community)}
                                    className="wire-box"
                                    style={{ padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}
                                >
                                    <div className="wire-avatar" style={{ width: '60px', height: '60px', borderRadius: '16px', fontSize: '14px', flexShrink: 0 }}>
                                        IMG
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{community.name}</span>
                                            <span className="wire-badge">{community.category}</span>
                                        </div>
                                        <p style={{ fontSize: '12px', color: '#666' }}>
                                            {community.members}人 · {community.posts}投稿
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Floating Search Button - Show in both tabs */}
            <button
                onClick={() => setShowSearchModal(true)}
                className="wire-button"
                style={{
                    position: 'fixed',
                    bottom: '100px',
                    right: '24px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    zIndex: 100
                }}
            >
                <Icons.Search />
            </button>

            {/* Search Modal */}
            {showSearchModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 1000 }} onClick={() => setShowSearchModal(false)}>
                    <div className="wire-box" style={{ width: '100%', borderRadius: '24px 24px 0 0', padding: '24px', background: 'white', maxHeight: '70vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
                            {chatType === 'following' ? 'フレンドを検索' : 'コミュニティを検索'}
                        </h2>
                        
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>キーワード</label>
                            <input
                                type="text"
                                value={searchFilters.keyword}
                                onChange={(e) => setSearchFilters({...searchFilters, keyword: e.target.value})}
                                placeholder={chatType === 'following' ? 'ユーザー名、趣味で検索...' : 'グループ名で検索...'}
                                className="wire-text"
                                style={{ width: '100%', borderRadius: '8px' }}
                            />
                        </div>

                        {chatType === 'following' ? (
                            <>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>年代</label>
                                    <select
                                        value={searchFilters.age}
                                        onChange={(e) => setSearchFilters({...searchFilters, age: e.target.value})}
                                        className="wire-text"
                                        style={{ width: '100%', borderRadius: '8px' }}
                                    >
                                        <option value="">選択してください</option>
                                        <option>10代前半</option>
                                        <option>10代後半</option>
                                        <option>20代</option>
                                        <option>30代</option>
                                        <option>40代</option>
                                    </select>
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>都道府県</label>
                                    <select
                                        value={searchFilters.region}
                                        onChange={(e) => setSearchFilters({...searchFilters, region: e.target.value})}
                                        className="wire-text"
                                        style={{ width: '100%', borderRadius: '8px' }}
                                    >
                                        <option value="">選択してください</option>
                                        <option>北海道</option>
                                        <option>青森県</option>
                                        <option>岩手県</option>
                                        <option>宮城県</option>
                                        <option>秋田県</option>
                                        <option>山形県</option>
                                        <option>福島県</option>
                                        <option>茨城県</option>
                                        <option>栃木県</option>
                                        <option>群馬県</option>
                                        <option>埼玉県</option>
                                        <option>千葉県</option>
                                        <option>東京都</option>
                                        <option>神奈川県</option>
                                        <option>新潟県</option>
                                        <option>富山県</option>
                                        <option>石川県</option>
                                        <option>福井県</option>
                                        <option>山梨県</option>
                                        <option>長野県</option>
                                        <option>岐阜県</option>
                                        <option>静岡県</option>
                                        <option>愛知県</option>
                                        <option>三重県</option>
                                        <option>滋賀県</option>
                                        <option>京都府</option>
                                        <option>大阪府</option>
                                        <option>兵庫県</option>
                                        <option>奈良県</option>
                                        <option>和歌山県</option>
                                        <option>鳥取県</option>
                                        <option>島根県</option>
                                        <option>岡山県</option>
                                        <option>広島県</option>
                                        <option>山口県</option>
                                        <option>徳島県</option>
                                        <option>香川県</option>
                                        <option>愛媛県</option>
                                        <option>高知県</option>
                                        <option>福岡県</option>
                                        <option>佐賀県</option>
                                        <option>長崎県</option>
                                        <option>熊本県</option>
                                        <option>大分県</option>
                                        <option>宮崎県</option>
                                        <option>鹿児島県</option>
                                        <option>沖縄県</option>
                                    </select>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>よく使う時間帯</label>
                                    <select
                                        value={searchFilters.activeTime}
                                        onChange={(e) => setSearchFilters({...searchFilters, activeTime: e.target.value})}
                                        className="wire-text"
                                        style={{ width: '100%', borderRadius: '8px' }}
                                    >
                                        <option value="">選択してください</option>
                                        <option>いつでも</option>
                                        <option>朝（6:00-12:00）</option>
                                        <option>昼（12:00-18:00）</option>
                                        <option>夜（18:00-24:00）</option>
                                        <option>深夜（24:00-6:00）</option>
                                    </select>
                                </div>
                            </>
                        ) : (
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>カテゴリ</label>
                                <select
                                    value={searchFilters.category}
                                    onChange={(e) => setSearchFilters({...searchFilters, category: e.target.value})}
                                    className="wire-text"
                                    style={{ width: '100%', borderRadius: '8px' }}
                                >
                                    <option value="">すべて</option>
                                    <option>ゲーム</option>
                                    <option>アニメ</option>
                                    <option>音楽</option>
                                    <option>雑談</option>
                                    <option>スポーツ</option>
                                    <option>料理</option>
                                    <option>旅行</option>
                                </select>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                                className="wire-button-outline" 
                                style={{ flex: 1, padding: '12px', borderRadius: '12px' }} 
                                onClick={() => setShowSearchModal(false)}
                            >
                                キャンセル
                            </button>
                            <button 
                                className="wire-button" 
                                style={{ flex: 1, padding: '12px', borderRadius: '12px' }} 
                                onClick={handleSearch}
                            >
                                検索する
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Results Modal */}
            {showResultsModal && searchResults && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 1000 }} onClick={clearSearch}>
                    <div className="wire-box" style={{ width: '100%', borderRadius: '24px 24px 0 0', padding: '24px', background: 'white', maxHeight: '85vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>検索結果</h2>
                            <button 
                                onClick={clearSearch}
                                style={{ 
                                    border: 'none', 
                                    background: 'none', 
                                    cursor: 'pointer', 
                                    padding: '8px',
                                    display: 'flex'
                                }}
                            >
                                <Icons.X />
                            </button>
                        </div>

                        {searchResults.length > 0 ? (
                            <>
                                <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                                    {chatType === 'following' 
                                        ? `${searchResults.length}人のユーザーが見つかりました`
                                        : `${searchResults.length}件のコミュニティが見つかりました`
                                    }
                                </p>

                                {chatType === 'following' ? (
                                    // フレンド検索結果
                                    searchResults.map(user => (
                                        <div
                                            key={`modal-user-${user.id}`}
                                            onClick={() => {
                                                setSelectedProfileUser(user);
                                                setShowProfileModal(true);
                                            }}
                                            className="wire-box"
                                            style={{ padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}
                                        >
                                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                                <div className="wire-avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', fontSize: '18px' }}>
                                                    {user.avatar}
                                                    {user.online && <div className="online-indicator"></div>}
                                                </div>
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{user.name}</span>
                                                    <span className="wire-badge">{user.age}</span>
                                                </div>
                                                <p style={{ fontSize: '12px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.message}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    // コミュニティ検索結果
                                    searchResults.map(community => (
                                        <div
                                            key={`modal-community-${community.id}`}
                                            onClick={() => {
                                                handleCommunityClick(community);
                                                clearSearch();
                                            }}
                                            className="wire-box"
                                            style={{ padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}
                                        >
                                            <div className="wire-avatar" style={{ width: '50px', height: '50px', borderRadius: '16px', fontSize: '14px', flexShrink: 0 }}>
                                                IMG
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{community.name}</span>
                                                    <span className="wire-badge">{community.category}</span>
                                                </div>
                                                <p style={{ fontSize: '12px', color: '#666' }}>
                                                    {community.members}人 · {community.posts}投稿
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                <p style={{ fontSize: '14px', color: '#999', marginBottom: '8px' }}>検索条件に一致する結果が見つかりませんでした</p>
                                <button 
                                    className="wire-button-outline" 
                                    style={{ padding: '10px 24px', borderRadius: '8px', marginTop: '16px' }}
                                    onClick={clearSearch}
                                >
                                    検索条件を変更
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Community Preview Modal */}
            {showPreviewModal && previewCommunity && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 1000 }} onClick={() => setShowPreviewModal(false)}>
                    <div className="wire-box" style={{ width: '100%', borderRadius: '24px 24px 0 0', padding: '24px', background: 'white', maxHeight: '85vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
                        {/* Community Info */}
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <div className="wire-avatar" style={{ width: '80px', height: '80px', borderRadius: '20px', fontSize: '16px', margin: '0 auto 16px' }}>
                                IMG
                            </div>
                            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' }}>{previewCommunity.name}</h2>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                                <span className="wire-badge">{previewCommunity.category}</span>
                            </div>
                            <p style={{ fontSize: '14px', color: '#666' }}>
                                {previewCommunity.members}人のメンバー · {previewCommunity.posts}件の投稿
                            </p>
                        </div>

                        {/* About */}
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>について</h3>
                            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{previewCommunity.desc}</p>
                        </div>

                        {/* Recent Messages Preview */}
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px' }}>最近の会話</h3>
                            <div style={{ background: '#f5f5f5', borderRadius: '12px', padding: '16px' }}>
                                {[
                                    { user: 'ユーザー1', message: 'こんにちは！よろしくお願いします', time: '2時間前' },
                                    { user: 'ユーザー2', message: 'みなさんの好きな作品は何ですか？', time: '3時間前' },
                                    { user: 'ユーザー3', message: '盛り上がってますね〜参加したいです！', time: '5時間前' }
                                ].map((msg, index) => (
                                    <div key={index} style={{ marginBottom: index < 2 ? '12px' : '0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{msg.user}</span>
                                            <span style={{ fontSize: '11px', color: '#999' }}>{msg.time}</span>
                                        </div>
                                        <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>{msg.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                                className="wire-button-outline" 
                                style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '15px' }} 
                                onClick={() => setShowPreviewModal(false)}
                            >
                                キャンセル
                            </button>
                            <button 
                                className="wire-button" 
                                style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '15px' }} 
                                onClick={handleJoinCommunity}
                            >
                                参加する
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* User Profile Modal */}
            {showProfileModal && selectedProfileUser && (
                <div 
                    style={{ 
                        position: 'fixed', 
                        inset: 0, 
                        background: 'rgba(0,0,0,0.5)', 
                        display: 'flex', 
                        alignItems: 'flex-end', 
                        zIndex: 1100 
                    }} 
                    onClick={() => setShowProfileModal(false)}
                >
                    <div 
                        className="wire-box" 
                        style={{ 
                            width: '100%', 
                            borderRadius: '24px 24px 0 0', 
                            padding: '24px', 
                            background: 'white', 
                            maxHeight: '85vh', 
                            overflowY: 'auto' 
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>プロフィール</h2>
                            <button
                                onClick={() => setShowProfileModal(false)}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    display: 'flex'
                                }}
                            >
                                <Icons.X />
                            </button>
                        </div>

                        {/* アイコンとユーザー名 */}
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
                                <div className="wire-avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', fontSize: '36px', margin: '0 auto' }}>
                                    {selectedProfileUser.avatar}
                                    {selectedProfileUser.online && <div className="online-indicator" style={{ width: '22px', height: '22px' }}></div>}
                                </div>
                            </div>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>{selectedProfileUser.name}</h2>
                        </div>

                        {/* フレンド申請ボタン */}
                        <button
                            onClick={() => {
                                if (requireAuth) {
                                    requireAuth(() => {
                                        setIsFollowing({...isFollowing, [selectedProfileUser.id]: !isFollowing[selectedProfileUser.id]});
                                    });
                                } else {
                                    setIsFollowing({...isFollowing, [selectedProfileUser.id]: !isFollowing[selectedProfileUser.id]});
                                }
                            }}
                            className={isFollowing[selectedProfileUser.id] ? 'wire-button-outline' : 'wire-button'}
                            style={{ width: '100%', padding: '14px', borderRadius: '30px', marginBottom: '10px', fontSize: '15px' }}
                        >
                            {isFollowing[selectedProfileUser.id] ? 'フレンド' : 'フレンド申請'}
                        </button>
                        {isFollowing[selectedProfileUser.id] && (
                            <button
                                onClick={() => {
                                    if (requireAuth) {
                                        requireAuth(() => {
                                            setSelectedUser(selectedProfileUser);
                                            setShowProfileModal(false);
                                            setShowResultsModal(false);
                                            setCurrentScreen('chatDetail');
                                        });
                                    } else {
                                        setSelectedUser(selectedProfileUser);
                                        setShowProfileModal(false);
                                        setShowResultsModal(false);
                                        setCurrentScreen('chatDetail');
                                    }
                                }}
                                className="wire-button-outline"
                                style={{ width: '100%', padding: '14px', borderRadius: '30px', marginBottom: '20px', fontSize: '15px' }}
                            >
                                メッセージを送る
                            </button>
                        )}

                        {/* 基本情報 */}
                        <div className="wire-box" style={{ padding: '18px', marginBottom: '18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                                <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>基本情報</h3>
                                {selectedProfileUser.verified && (
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '4px 8px',
                                        background: '#4CAF50',
                                        color: 'white',
                                        borderRadius: '12px',
                                        fontSize: '11px',
                                        fontWeight: 'bold'
                                    }}>
                                        <span>✓</span>
                                        <span>本人確認済み</span>
                                    </div>
                                )}
                            </div>
                            <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' }}>
                                <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>年代</p>
                                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{selectedProfileUser.age}</p>
                            </div>
                            <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' }}>
                                <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>地域</p>
                                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                    {selectedProfileUser.region}
                                    {selectedProfileUser.city && ` / ${selectedProfileUser.city}`}
                                </p>
                            </div>
                            <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' }}>
                                <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>よく使う時間帯</p>
                                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{selectedProfileUser.activeTime || 'いつでも'}</p>
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <p style={{ fontSize: '12px', color: '#666' }}>自己紹介</p>
                                    {selectedProfileUser.country && selectedProfileUser.country !== '日本' && (
                                        <button
                                            onClick={async () => {
                                                if (!selectedProfileUser.translatedBio) {
                                                    const translated = await LanguageManager.translateText(
                                                        selectedProfileUser.bio,
                                                        'en',
                                                        'ja'
                                                    );
                                                    selectedProfileUser.translatedBio = translated;
                                                    selectedProfileUser.showTranslation = true;
                                                } else {
                                                    selectedProfileUser.showTranslation = !selectedProfileUser.showTranslation;
                                                }
                                                setSelectedProfileUser({...selectedProfileUser});
                                            }}
                                            className="wire-button-outline"
                                            style={{
                                                padding: '4px 8px',
                                                fontSize: '10px',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '3px'
                                            }}
                                        >
                                            <span style={{ fontSize: '12px' }}>🌐</span>
                                            {selectedProfileUser.showTranslation ? '原文' : '翻訳'}
                                        </button>
                                    )}
                                </div>
                                <p style={{ fontSize: '14px', lineHeight: '1.7' }}>
                                    {selectedProfileUser.showTranslation && selectedProfileUser.translatedBio 
                                        ? selectedProfileUser.translatedBio 
                                        : selectedProfileUser.bio
                                    }
                                </p>
                            </div>
                        </div>

                        {/* ギャラリー */}
                        <div className="wire-box" style={{ padding: '18px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px' }}>ギャラリー</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="wire-avatar" style={{ width: '100%', aspectRatio: '1', borderRadius: '8px', fontSize: '12px' }}>
                                        IMG
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav 
                currentScreen={currentScreen} 
                setCurrentScreen={setCurrentScreen} 
                setViewingProfile={setViewingProfile}
            />
        </div>
    );
}
