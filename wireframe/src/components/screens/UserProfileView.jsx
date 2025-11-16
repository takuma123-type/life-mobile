// User Profile View Component
function UserProfileView({ 
    user, 
    onClose, 
    isFollowing, 
    setIsFollowing,
    setSelectedUser,
    setCurrentScreen,
    setViewingProfile 
}) {
    const following = isFollowing[user.id] || false;
    
    return (
        <div style={{ background: 'white', minHeight: 'calc(100vh - 80px)' }}>
            <div style={{ padding: '16px', borderBottom: '2px solid #000' }}>
                <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                    <Icons.ArrowLeft />
                </button>
            </div>
            
            <div style={{ padding: '28px' }}>
                {/* アイコンとユーザー名 */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                        <div className="wire-avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', fontSize: '36px', margin: '0 auto' }}>
                            {user.avatar}
                            {user.online && <div className="online-indicator" style={{ width: '22px', height: '22px' }}></div>}
                        </div>
                    </div>
                    <h2 style={{ fontSize: '26px', fontWeight: 'bold' }}>{user.name}</h2>
                </div>

                {/* フレンド申請ボタン */}
                <button
                    onClick={() => setIsFollowing({...isFollowing, [user.id]: !following})}
                    className={following ? 'wire-button-outline' : 'wire-button'}
                    style={{ width: '100%', padding: '14px', borderRadius: '30px', marginBottom: '10px', fontSize: '15px' }}
                >
                    {following ? 'フレンド' : 'フレンド申請'}
                </button>
                {following && (
                    <button
                        onClick={() => {
                            setSelectedUser(user);
                            setCurrentScreen('chatDetail');
                            setViewingProfile(null);
                        }}
                        className="wire-button-outline"
                        style={{ width: '100%', padding: '14px', borderRadius: '30px', marginBottom: '20px', fontSize: '15px' }}
                    >
                        メッセージを送る
                    </button>
                )}

                {/* 基本情報 */}
                <div className="wire-box" style={{ padding: '18px', marginBottom: '18px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '14px' }}>基本情報</h3>
                    <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' }}>
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>年代</p>
                        <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{user.age}</p>
                    </div>
                    <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' }}>
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>国</p>
                        <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{user.country}</p>
                    </div>
                    <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' }}>
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>よく使う時間帯</p>
                        <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{user.activeTime || 'いつでも'}</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>自己紹介</p>
                        <p style={{ fontSize: '14px', lineHeight: '1.7' }}>{user.bio}</p>
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
    );
}
