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
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>都道府県</label>
                    <select className="wire-text" style={{ width: '100%', borderRadius: '8px' }}>
                        <option value="">都道府県を選択</option>
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
