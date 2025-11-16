// My Page Screen Component
function MyPageScreen({ 
    setCurrentScreen, 
    setIsLoggedIn,
    currentScreen,
    setViewingProfile 
}) {
    const [showProfileModal, setShowProfileModal] = React.useState(false);
    const [showLanguageModal, setShowLanguageModal] = React.useState(false);
    const [showSmsModal, setShowSmsModal] = React.useState(false);
    const [isVerified, setIsVerified] = React.useState(false);
    const [language, setLanguage] = React.useState(LanguageManager.getLanguage());

    React.useEffect(() => {
        return LanguageManager.subscribe((newLang) => {
            setLanguage(newLang);
        });
    }, []);

    const handleLanguageChange = (lang) => {
        LanguageManager.setLanguage(lang);
        setShowLanguageModal(false);
    };

    const myProfile = {
        id: 'guest_001',
        name: 'ゲストユーザー',
        avatar: 'GU',
        age: '20代',
        region: '東京都',
        city: '渋谷区',
        activeTime: '夜',
        bio: 'よろしくお願いします！',
        online: true
    };

    return (
        <div style={{ paddingBottom: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
            <Header title="マイページ" />
            
            <div style={{ padding: '16px' }}>
                <div 
                    className="wire-box" 
                    style={{ padding: '28px', marginBottom: '20px', background: '#000', color: 'white', cursor: 'pointer', position: 'relative' }}
                    onClick={() => setShowProfileModal(true)}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                        <div className="wire-avatar" style={{ width: '70px', height: '70px', borderRadius: '50%', fontSize: '24px', borderColor: 'white', background: '#333' }}>
                            GU
                        </div>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: '19px', fontWeight: 'bold', marginBottom: '6px' }}>ゲストユーザー</h2>
                            <p style={{ fontSize: '12px', opacity: 0.7 }}>ID: guest_001</p>
                        </div>
                    </div>
                    <div style={{ 
                        marginTop: '12px', 
                        padding: '10px', 
                        background: 'rgba(255,255,255,0.1)', 
                        borderRadius: '8px',
                        fontSize: '12px',
                        textAlign: 'center',
                        opacity: 0.9
                    }}>
                        タップしてプロフィールを見る
                    </div>
                </div>

                <div className="wire-box" style={{ marginBottom: '14px' }}>
                    {[
                        { Icon: Icons.User, label: 'SMS本人確認', badge: !isVerified ? '未認証' : '✓', screen: null, action: () => setShowSmsModal(true), verified: isVerified },
                        { Icon: Icons.Users, label: 'フレンド申請', badge: '3', screen: 'followRequests' },
                        { Icon: Icons.Heart, label: 'スタンプ購入', screen: 'stampShop' },
                        { Icon: Icons.Settings, label: '言語設定', action: () => setShowLanguageModal(true) }
                    ].map((item, index, arr) => (
                        <button
                            key={index}
                            onClick={() => item.action ? item.action() : setCurrentScreen(item.screen)}
                            className="wire-button-outline"
                            style={{
                                width: '100%',
                                padding: '16px',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                borderWidth: index < arr.length - 1 ? '0 0 2px 0' : '0',
                                borderRadius: 0
                            }}
                        >
                            <item.Icon />
                            <span style={{ flex: 1, fontSize: '15px' }}>{item.label}</span>
                            {item.badge && (
                                <span className="wire-badge" style={{ 
                                    background: item.verified ? '#4CAF50' : '#f00',
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontSize: '11px'
                                }}>{item.badge}</span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="wire-box">
                    <button
                        onClick={() => {
                            setIsLoggedIn(false);
                            setCurrentScreen('login');
                        }}
                        className="wire-button-outline"
                        style={{ width: '100%', padding: '16px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                        <Icons.LogOut />
                        ログアウト
                    </button>
                </div>
            </div>

            {/* プロフィールモーダル */}
            {showProfileModal && (
                <div 
                    style={{ 
                        position: 'fixed', 
                        inset: 0, 
                        background: 'rgba(0,0,0,0.5)', 
                        display: 'flex', 
                        alignItems: 'flex-end', 
                        zIndex: 1000 
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
                            maxHeight: '80vh', 
                            overflowY: 'auto' 
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>マイプロフィール</h2>
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
                                    {myProfile.avatar}
                                    {myProfile.online && <div className="online-indicator" style={{ width: '22px', height: '22px' }}></div>}
                                </div>
                            </div>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>{myProfile.name}</h2>
                            <p style={{ fontSize: '13px', color: '#666' }}>ID: {myProfile.id}</p>
                        </div>

                        <button
                            onClick={() => {
                                setShowProfileModal(false);
                                setCurrentScreen('editProfile');
                            }}
                            className="wire-button"
                            style={{ width: '100%', padding: '14px', borderRadius: '30px', marginBottom: '20px', fontSize: '15px' }}
                        >
                            プロフィールを編集
                        </button>

                        {/* 基本情報 */}
                        <div className="wire-box" style={{ padding: '18px', marginBottom: '18px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '14px' }}>基本情報</h3>
                            <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' }}>
                                <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>年代</p>
                                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{myProfile.age}</p>
                            </div>
                            <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' }}>
                                <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>地域</p>
                                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{myProfile.region} / {myProfile.city}</p>
                            </div>
                            <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' }}>
                                <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>よく使う時間帯</p>
                                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{myProfile.activeTime}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>自己紹介</p>
                                <p style={{ fontSize: '14px', lineHeight: '1.7' }}>{myProfile.bio}</p>
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

            {/* Language Selection Modal */}
            {showLanguageModal && (
                <div 
                    style={{ 
                        position: 'fixed', 
                        inset: 0, 
                        background: 'rgba(0,0,0,0.5)', 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px'
                    }} 
                    onClick={() => setShowLanguageModal(false)}
                >
                    <div 
                        className="wire-box" 
                        style={{ 
                            width: '100%',
                            maxWidth: '400px',
                            background: 'white',
                            borderRadius: '24px',
                            padding: '24px'
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>言語設定 / Language</h2>
                        
                        <div style={{ marginBottom: '12px' }}>
                            <button
                                onClick={() => handleLanguageChange('ja')}
                                className={language === 'ja' ? 'wire-button' : 'wire-button-outline'}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <span>日本語</span>
                                {language === 'ja' && <span>✓</span>}
                            </button>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <button
                                onClick={() => handleLanguageChange('en')}
                                className={language === 'en' ? 'wire-button' : 'wire-button-outline'}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <span>English</span>
                                {language === 'en' && <span>✓</span>}
                            </button>
                        </div>

                        <button
                            onClick={() => setShowLanguageModal(false)}
                            className="wire-button-outline"
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '12px',
                                fontSize: '15px'
                            }}
                        >
                            キャンセル / Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* SMS認証モーダル */}
            {showSmsModal && (
                <SmsVerificationModal 
                    onClose={() => setShowSmsModal(false)}
                    onVerificationComplete={() => {
                        setIsVerified(true);
                        setShowSmsModal(false);
                    }}
                />
            )}

            <BottomNav 
                currentScreen={currentScreen} 
                setCurrentScreen={setCurrentScreen} 
                setViewingProfile={setViewingProfile}
            />
        </div>
    );
}
