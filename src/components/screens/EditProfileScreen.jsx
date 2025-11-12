// Edit Profile Screen Component
function EditProfileScreen({ 
    setCurrentScreen,
    currentScreen,
    setViewingProfile 
}) {
    return (
        <div style={{ paddingBottom: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
            <Header title="プロフィール編集" showBack onBack={() => setCurrentScreen('mypage')} />
            
            <div style={{ padding: '16px' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div className="wire-avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', fontSize: '36px', margin: '0 auto 12px' }}>
                        GU
                    </div>
                    <button className="wire-button-outline" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px' }}>
                        写真を変更
                    </button>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>ユーザー名</label>
                    <input
                        type="text"
                        defaultValue="ゲストユーザー"
                        className="wire-text"
                        style={{ width: '100%', borderRadius: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>年代</label>
                    <select className="wire-text" style={{ width: '100%', borderRadius: '8px' }}>
                        <option>10代前半</option>
                        <option>10代後半</option>
                        <option>20代</option>
                        <option>30代</option>
                        <option>40代</option>
                    </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>国</label>
                    <select className="wire-text" style={{ width: '100%', borderRadius: '8px' }}>
                        <option>日本</option>
                        <option>アメリカ</option>
                        <option>中国</option>
                        <option>韓国</option>
                        <option>その他</option>
                    </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>よく使う時間帯</label>
                    <select className="wire-text" style={{ width: '100%', borderRadius: '8px' }}>
                        <option>いつでも</option>
                        <option>朝（6:00-12:00）</option>
                        <option>昼（12:00-18:00）</option>
                        <option>夜（18:00-24:00）</option>
                        <option>深夜（24:00-6:00）</option>
                    </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>自己紹介</label>
                    <textarea
                        defaultValue="よろしくお願いします！"
                        className="wire-text"
                        style={{ width: '100%', minHeight: '100px', borderRadius: '8px', resize: 'vertical' }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>ギャラリー</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{ position: 'relative', paddingBottom: '100%' }}>
                                <div 
                                    className="wire-avatar" 
                                    style={{ 
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%', 
                                        height: '100%', 
                                        borderRadius: '8px', 
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    IMG
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="wire-button-outline" style={{ width: '100%', padding: '10px', borderRadius: '8px', fontSize: '13px', marginTop: '12px' }}>
                        写真を追加
                    </button>
                </div>

                <button className="wire-button" style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '15px' }}>
                    保存する
                </button>
            </div>

            <BottomNav 
                currentScreen={currentScreen} 
                setCurrentScreen={setCurrentScreen} 
                setViewingProfile={setViewingProfile}
            />
        </div>
    );
}
