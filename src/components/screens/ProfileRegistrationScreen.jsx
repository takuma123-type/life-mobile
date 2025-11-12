// Profile Registration Screen Component
function ProfileRegistrationScreen({ 
    setCurrentScreen,
    setIsLoggedIn,
    onRegistrationComplete 
}) {
    const [formData, setFormData] = React.useState({
        name: '',
        age: '',
        country: '',
        activeTime: '',
        bio: ''
    });

    const handleSubmit = () => {
        // 必須項目のチェック
        if (!formData.name || !formData.age || !formData.country) {
            alert('名前、年代、国は必須項目です');
            return;
        }

        // 登録処理
        alert('プロフィール登録が完了しました！');
        setIsLoggedIn(true);
        
        if (onRegistrationComplete) {
            onRegistrationComplete();
        } else {
            setCurrentScreen('chat');
        }
    };

    return (
        <div style={{ paddingBottom: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
            <Header title="プロフィール登録" />
            
            <div style={{ padding: '16px' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
                    LIFEへようこそ！
                    <br />
                    プロフィールを登録して、フレンドやコミュニティとつながりましょう。
                </p>

                <div className="wire-box" style={{ padding: '20px', marginBottom: '16px' }}>
                    {/* プロフィールアイコン */}
                    <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
                            プロフィールアイコン
                        </label>
                        <div style={{ display: 'inline-block', position: 'relative' }}>
                            <div className="wire-avatar" style={{ 
                                width: '100px', 
                                height: '100px', 
                                borderRadius: '50%', 
                                fontSize: '36px',
                                margin: '0 auto',
                                cursor: 'pointer'
                            }}>
                                IMG
                            </div>
                            <button
                                type="button"
                                className="wire-button"
                                style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '0',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '18px'
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                            名前 <span style={{ color: '#f00' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="名前を入力"
                            className="wire-text"
                            style={{ width: '100%', borderRadius: '8px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                            年代 <span style={{ color: '#f00' }}>*</span>
                        </label>
                        <select
                            value={formData.age}
                            onChange={(e) => setFormData({...formData, age: e.target.value})}
                            className="wire-text"
                            style={{ width: '100%', borderRadius: '8px' }}
                        >
                            <option value="">選択してください</option>
                            <option value="10代">10代</option>
                            <option value="20代">20代</option>
                            <option value="30代">30代</option>
                            <option value="40代">40代</option>
                            <option value="50代以上">50代以上</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                            国 <span style={{ color: '#f00' }}>*</span>
                        </label>
                        <select
                            value={formData.country}
                            onChange={(e) => setFormData({...formData, country: e.target.value})}
                            className="wire-text"
                            style={{ width: '100%', borderRadius: '8px' }}
                        >
                            <option value="">選択してください</option>
                            <option value="日本">日本</option>
                            <option value="アメリカ">アメリカ</option>
                            <option value="中国">中国</option>
                            <option value="韓国">韓国</option>
                            <option value="その他">その他</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                            よく使う時間帯
                        </label>
                        <select
                            value={formData.activeTime}
                            onChange={(e) => setFormData({...formData, activeTime: e.target.value})}
                            className="wire-text"
                            style={{ width: '100%', borderRadius: '8px' }}
                        >
                            <option value="">選択してください</option>
                            <option value="朝">朝</option>
                            <option value="昼">昼</option>
                            <option value="夕方">夕方</option>
                            <option value="夜">夜</option>
                            <option value="深夜">深夜</option>
                            <option value="いつでも">いつでも</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                            自己紹介
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            placeholder="自己紹介を入力"
                            className="wire-text"
                            style={{ width: '100%', borderRadius: '8px', minHeight: '100px', resize: 'vertical' }}
                        />
                    </div>

                    {/* ギャラリー */}
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
                            ギャラリー
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div 
                                    key={i} 
                                    className="wire-avatar" 
                                    style={{ 
                                        width: '100%', 
                                        aspectRatio: '1', 
                                        borderRadius: '8px', 
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    +
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="wire-button"
                    style={{ width: '100%', padding: '16px', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold' }}
                >
                    登録完了
                </button>
            </div>
        </div>
    );
}
