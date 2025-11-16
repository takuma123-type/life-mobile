// Stamp Shop Screen Component
function StampShopScreen({ 
    setCurrentScreen,
    currentScreen,
    setViewingProfile 
}) {
    const [selectedStamp, setSelectedStamp] = React.useState(null);
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [points, setPoints] = React.useState(50);
    const [showAdModal, setShowAdModal] = React.useState(false);
    const [isWatchingAd, setIsWatchingAd] = React.useState(false);

    const handleStampClick = (pack) => {
        setSelectedStamp(pack);
        setShowDetailModal(true);
    };

    const handleAdClick = () => {
        setShowAdModal(true);
    };

    const handleWatchAd = () => {
        setIsWatchingAd(true);
        // 3秒後に広告視聴完了してポイント付与
        setTimeout(() => {
            setPoints(prev => prev + 10);
            setIsWatchingAd(false);
            setShowAdModal(false);
            alert('ポイントを10pt獲得しました!');
        }, 3000);
    };

    return (
        <div style={{ paddingBottom: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
            <Header title="スタンプ購入" showBack onBack={() => setCurrentScreen('mypage')} />
            
            {/* ポイント表示バー */}
            <div 
                className="wire-box" 
                style={{ 
                    margin: '16px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#fff'
                }}
                onClick={handleAdClick}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>スタンプダウンロード</span>
                    <div style={{ 
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#FFD700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                    }}>
                        🪙
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{points}</span>
                </div>
                <div style={{ 
                    padding: '6px 12px',
                    background: '#333',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                }}>
                    広告を見る
                </div>
            </div>
            
            <div style={{ padding: '16px' }}>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                    お気に入りのスタンプを見つけよう
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {mockStampPacks.map(pack => (
                        <div 
                            key={pack.id} 
                            className="wire-box" 
                            style={{ padding: '12px', cursor: 'pointer' }}
                            onClick={() => handleStampClick(pack)}
                        >
                            <div 
                                className="wire-avatar" 
                                style={{ 
                                    width: '100%', 
                                    aspectRatio: '1', 
                                    borderRadius: '12px', 
                                    marginBottom: '10px', 
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                STAMP
                            </div>
                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>{pack.name}</h3>
                            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>{pack.count}個</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{pack.points}</span>
                                <div style={{ 
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: '#FFD700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px'
                                }}>
                                    🪙
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 詳細モーダル */}
            {showDetailModal && selectedStamp && (
                <div 
                    style={{ 
                        position: 'fixed', 
                        inset: 0, 
                        background: 'rgba(0,0,0,0.7)', 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px'
                    }} 
                    onClick={() => setShowDetailModal(false)}
                >
                    <div 
                        className="wire-box" 
                        style={{ 
                            width: '100%',
                            maxWidth: '400px',
                            background: 'white',
                            borderRadius: '24px',
                            padding: '24px',
                            position: 'relative'
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="wire-box" style={{ 
                            borderRadius: '12px',
                            padding: '16px',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>{selectedStamp.name}</div>
                            <div style={{ fontSize: '14px', marginBottom: '12px' }}>{selectedStamp.subtitle}</div>
                            <div style={{ fontSize: '13px', color: '#666' }}>{selectedStamp.description}</div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                            <button 
                                onClick={() => {
                                    if (points >= selectedStamp.points) {
                                        setPoints(prev => prev - selectedStamp.points);
                                        alert('スタンプをダウンロードしました！');
                                        setShowDetailModal(false);
                                    } else {
                                        alert('ポイントが足りません。広告を見てポイントを貯めてください。');
                                    }
                                }}
                                className="wire-button"
                                style={{ 
                                    flex: 1, 
                                    padding: '14px',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    opacity: points >= selectedStamp.points ? 1 : 0.5
                                }}
                            >
                                {selectedStamp.points}pt でダウンロード
                            </button>
                            <button 
                                onClick={() => setShowDetailModal(false)}
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

                        {/* スタンププレビュー */}
                        <div className="wire-box" style={{ 
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ 
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '8px'
                            }}>
                                {[...Array(Math.min(selectedStamp.count, 12))].map((_, i) => (
                                    <div 
                                        key={i}
                                        className="wire-avatar"
                                        style={{
                                            aspectRatio: '1',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px'
                                        }}
                                    >
                                        IMG
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 広告視聴モーダル */}
            {showAdModal && (
                <div 
                    style={{ 
                        position: 'fixed', 
                        inset: 0, 
                        background: 'rgba(0,0,0,0.7)', 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px'
                    }} 
                    onClick={() => !isWatchingAd && setShowAdModal(false)}
                >
                    <div 
                        className="wire-box" 
                        style={{ 
                            width: '100%',
                            maxWidth: '400px',
                            background: 'white',
                            borderRadius: '24px',
                            padding: '24px',
                            textAlign: 'center'
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        {!isWatchingAd ? (
                            <>
                                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
                                    広告を視聴してポイント獲得
                                </div>
                                <div style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
                                    広告を最後まで視聴すると<br />
                                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>10pt</span> 獲得できます
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button 
                                        onClick={handleWatchAd}
                                        className="wire-button"
                                        style={{ 
                                            flex: 1, 
                                            padding: '14px',
                                            borderRadius: '12px',
                                            fontSize: '15px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        視聴する
                                    </button>
                                    <button 
                                        onClick={() => setShowAdModal(false)}
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
                                <div className="wire-box" style={{ 
                                    padding: '60px 20px',
                                    marginBottom: '20px',
                                    background: '#f5f5f5'
                                }}>
                                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                                        広告を視聴中...
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#666' }}>
                                        しばらくお待ちください
                                    </div>
                                </div>
                                <div style={{ fontSize: '13px', color: '#999' }}>
                                    視聴完了まであと数秒
                                </div>
                            </>
                        )}
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
