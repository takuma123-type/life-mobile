// SMS Verification Modal Component
function SmsVerificationModal({ onClose, onVerificationComplete }) {
    const [step, setStep] = React.useState('phone'); // 'phone' or 'code'
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [verificationCode, setVerificationCode] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSendCode = () => {
        if (phoneNumber.length < 10) {
            alert('正しい電話番号を入力してください');
            return;
        }
        
        setIsLoading(true);
        // SMS送信シミュレーション
        setTimeout(() => {
            setIsLoading(false);
            setStep('code');
            alert('認証コードを送信しました（テスト: 123456）');
        }, 1500);
    };

    const handleVerifyCode = () => {
        if (verificationCode === '123456' || verificationCode.length === 6) {
            alert('本人確認が完了しました！');
            onVerificationComplete();
            onClose();
        } else {
            alert('認証コードが正しくありません');
        }
    };

    return (
        <div 
            style={{ 
                position: 'fixed', 
                inset: 0, 
                background: 'rgba(0,0,0,0.7)', 
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
                    padding: '24px'
                }} 
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>
                    本人確認（SMS認証）
                </h2>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px', textAlign: 'center' }}>
                    電話番号による本人確認を行います
                </p>

                {step === 'phone' ? (
                    <>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                                電話番号
                            </label>
                            <input 
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="090-1234-5678"
                                className="wire-input"
                                style={{ 
                                    width: '100%', 
                                    padding: '12px',
                                    fontSize: '16px',
                                    border: '2px solid #ddd',
                                    borderRadius: '8px'
                                }}
                            />
                            <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
                                ※ハイフンなしでも入力可能です
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button 
                                onClick={handleSendCode}
                                disabled={isLoading}
                                className="wire-button"
                                style={{ 
                                    flex: 1, 
                                    padding: '14px',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    opacity: isLoading ? 0.5 : 1
                                }}
                            >
                                {isLoading ? '送信中...' : '認証コードを送信'}
                            </button>
                            <button 
                                onClick={onClose}
                                className="wire-button-outline"
                                style={{ 
                                    flex: 1, 
                                    padding: '14px',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: 'bold'
                                }}
                            >
                                キャンセル
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ marginBottom: '24px' }}>
                            <p style={{ fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>
                                <strong>{phoneNumber}</strong> にSMSを送信しました
                            </p>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                                認証コード（6桁）
                            </label>
                            <input 
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder="123456"
                                maxLength="6"
                                className="wire-input"
                                style={{ 
                                    width: '100%', 
                                    padding: '12px',
                                    fontSize: '24px',
                                    textAlign: 'center',
                                    letterSpacing: '8px',
                                    border: '2px solid #ddd',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                            <button 
                                onClick={handleVerifyCode}
                                className="wire-button"
                                style={{ 
                                    flex: 1, 
                                    padding: '14px',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: 'bold'
                                }}
                            >
                                確認
                            </button>
                            <button 
                                onClick={() => setStep('phone')}
                                className="wire-button-outline"
                                style={{ 
                                    flex: 1, 
                                    padding: '14px',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: 'bold'
                                }}
                            >
                                戻る
                            </button>
                        </div>

                        <button 
                            onClick={handleSendCode}
                            style={{ 
                                width: '100%',
                                padding: '12px',
                                fontSize: '13px',
                                color: '#2196F3',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            認証コードを再送信
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
