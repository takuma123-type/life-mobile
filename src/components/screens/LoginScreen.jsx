// Login Screen Component
function LoginScreen({ setIsLoggedIn, setCurrentScreen }) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#f5f5f5' }}>
            <div className="wire-box" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>LIFE</h1>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '40px', textAlign: 'center' }}>つながる、話す、楽しむ</p>
                
                <button
                    onClick={() => {
                        setIsLoggedIn(true);
                        setCurrentScreen('chat');
                    }}
                    className="wire-button-outline"
                    style={{ width: '100%', padding: '14px', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Googleでログイン
                </button>

                <div style={{ position: 'relative', margin: '24px 0' }}>
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: '#e0e0e0' }}></div>
                    <div style={{ position: 'relative', textAlign: 'center', background: 'white', display: 'inline-block', padding: '0 12px', left: '50%', transform: 'translateX(-50%)', fontSize: '13px', color: '#999' }}>
                        または
                    </div>
                </div>

                <input
                    type="email"
                    placeholder="メールアドレス"
                    className="wire-text"
                    style={{ width: '100%', borderRadius: '8px', marginBottom: '12px' }}
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    className="wire-text"
                    style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
                />

                <button
                    onClick={() => {
                        setIsLoggedIn(true);
                        setCurrentScreen('chat');
                    }}
                    className="wire-button"
                    style={{ width: '100%', padding: '14px', borderRadius: '8px', marginBottom: '12px' }}
                >
                    ログイン
                </button>

                <div style={{ textAlign: 'center', fontSize: '13px', color: '#666' }}>
                    アカウントをお持ちでないですか？
                    <button style={{ border: 'none', background: 'none', textDecoration: 'underline', cursor: 'pointer', marginLeft: '4px', fontWeight: 'bold' }}>
                        新規登録
                    </button>
                </div>
            </div>
        </div>
    );
}
