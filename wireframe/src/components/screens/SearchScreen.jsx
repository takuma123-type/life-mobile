// Search Screen Component
function SearchScreen({ 
    viewingProfile, 
    setViewingProfile, 
    isFollowing,
    setIsFollowing,
    setSelectedUser,
    setCurrentScreen,
    currentScreen 
}) {
    const { useState } = React;
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(mockUsers);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [filters, setFilters] = useState({ keyword: '', age: '', country: '', activeTime: '' });

    if (viewingProfile) {
        return (
            <div style={{ paddingBottom: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
                <UserProfileView 
                    user={viewingProfile} 
                    onClose={() => setViewingProfile(null)}
                    isFollowing={isFollowing}
                    setIsFollowing={setIsFollowing}
                    setSelectedUser={setSelectedUser}
                    setCurrentScreen={setCurrentScreen}
                    setViewingProfile={setViewingProfile}
                />
                <BottomNav 
                    currentScreen={currentScreen} 
                    setCurrentScreen={setCurrentScreen} 
                    setViewingProfile={setViewingProfile}
                />
            </div>
        );
    }

    return (
        <div style={{ paddingBottom: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
            <Header title="検索" />
            
            <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>検索結果</h3>
                    <span className="wire-badge">{searchResults.length}人</span>
                </div>

                {searchResults.map(user => (
                    <div
                        key={user.id}
                        onClick={() => setViewingProfile(user)}
                        className="wire-box"
                        style={{ padding: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}
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
                ))}
            </div>

            {/* Search Filter Button - Opens Modal */}
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
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }}
            >
                <Icons.Search />
            </button>

            {/* Search Filter Modal */}
            {showSearchModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 1000 }} onClick={() => setShowSearchModal(false)}>
                    <div className="wire-box" style={{ width: '100%', borderRadius: '24px 24px 0 0', padding: '24px', background: 'white', maxHeight: '80vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>条件検索</h2>
                        
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>キーワード</label>
                            <input
                                type="text"
                                value={filters.keyword}
                                onChange={(e) => setFilters({...filters, keyword: e.target.value})}
                                placeholder="ユーザー名、趣味で検索..."
                                className="wire-text"
                                style={{ width: '100%', borderRadius: '8px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>年代</label>
                            <select
                                value={filters.age}
                                onChange={(e) => setFilters({...filters, age: e.target.value})}
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
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>国</label>
                            <select
                                value={filters.country}
                                onChange={(e) => setFilters({...filters, country: e.target.value})}
                                className="wire-text"
                                style={{ width: '100%', borderRadius: '8px' }}
                            >
                                <option value="">選択してください</option>
                                <option>日本</option>
                                <option>アメリカ</option>
                                <option>中国</option>
                                <option>韓国</option>
                                <option>その他</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>よく使う時間帯</label>
                            <select
                                value={filters.activeTime}
                                onChange={(e) => setFilters({...filters, activeTime: e.target.value})}
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

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="wire-button-outline" style={{ flex: 1, padding: '12px', borderRadius: '12px' }} onClick={() => setShowSearchModal(false)}>
                                キャンセル
                            </button>
                            <button className="wire-button" style={{ flex: 1, padding: '12px', borderRadius: '12px' }} onClick={() => setShowSearchModal(false)}>
                                検索する
                            </button>
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
