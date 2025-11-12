// Google Auth Modal Component
function GoogleAuthModal({ onClose, onAuthSuccess }) {
    const handleGoogleAuth = () => {
        // Google認証のシミュレーション
        // 実際の実装ではGoogle OAuth APIを使用
        setTimeout(() => {
            alert('Google認証に成功しました');
            onAuthSuccess();
        }, 500);
    };

    return (
        <div 
            style={{ 
                position: 'fixed', 
                inset: 0, 
                background: 'rgba(0,0,0,0.5)', 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
                padding: '20px'
            }} 
            onClick={onClose}
        >
            <div 
                className="wire-box" 
                style={{ 
                    width: '100%',
                    maxWidth: '400px',
                    background: 'white',
                    borderRadius: '24px',
                    padding: '32px',
                    textAlign: 'center'
                }} 
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>ログインが必要です</h2>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                        この機能を使用するにはログインが必要です。
                        <br />
                        Googleアカウントでログインしてください。
                    </p>
                </div>

                <button 
                    onClick={handleGoogleAuth}
                    className="wire-button"
                    style={{ 
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <span style={{ fontSize: '18px' }}>G</span>
                    Googleでログイン
                </button>

                <button 
                    onClick={onClose}
                    className="wire-button-outline"
                    style={{ 
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: 'bold'
                    }}
                >
                    キャンセル
                </button>
            </div>
        </div>
    );
}
