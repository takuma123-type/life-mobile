// Follow Requests Screen Component
function FollowRequestsScreen({ 
    setCurrentScreen,
    currentScreen,
    setViewingProfile 
}) {
    const { useState } = React;
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleApprove = (request) => {
        setSelectedRequest(request);
        setShowConfirmModal(true);
    };

    const handleReject = (request) => {
        setSelectedRequest(request);
        setShowRejectModal(true);
    };

    const confirmApprove = () => {
        // ここで承認処理を実行
        console.log('承認:', selectedRequest);
        setShowConfirmModal(false);
        setSelectedRequest(null);
    };

    const confirmReject = () => {
        // ここで拒否処理を実行
        console.log('拒否:', selectedRequest);
        setShowRejectModal(false);
        setSelectedRequest(null);
    };

    return (
        <div style={{ paddingBottom: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
            <Header title="フレンド申請" showBack onBack={() => setCurrentScreen('mypage')} />
            
            <div style={{ padding: '16px' }}>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                    {mockFollowRequests.length}件の申請
                </p>

                {mockFollowRequests.map(request => (
                    <div key={request.id} className="wire-box" style={{ padding: '16px', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div className="wire-avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', fontSize: '18px', flexShrink: 0 }}>
                                {request.avatar}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{request.name}</span>
                                    <span className="wire-badge">{request.age}</span>
                                </div>
                                <p style={{ fontSize: '13px', color: '#666' }}>{request.message}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                                className="wire-button" 
                                style={{ flex: 1, padding: '10px', borderRadius: '8px', fontSize: '14px' }}
                                onClick={() => handleApprove(request)}
                            >
                                承認
                            </button>
                            <button 
                                className="wire-button-outline" 
                                style={{ flex: 1, padding: '10px', borderRadius: '8px', fontSize: '14px' }}
                                onClick={() => handleReject(request)}
                            >
                                拒否
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 承認確認モーダル */}
            {showConfirmModal && (
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
                    onClick={() => setShowConfirmModal(false)}
                >
                    <div 
                        className="wire-box" 
                        style={{ 
                            width: '100%', 
                            maxWidth: '400px',
                            borderRadius: '16px', 
                            padding: '28px', 
                            background: 'white'
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>
                            フレンド申請の承認
                        </h2>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', textAlign: 'center', lineHeight: '1.6' }}>
                            {selectedRequest?.name}さんのフレンド申請を<br/>承認してもよろしいですか？
                        </p>
                        
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                className="wire-button-outline" 
                                style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '15px' }} 
                                onClick={() => setShowConfirmModal(false)}
                            >
                                キャンセル
                            </button>
                            <button 
                                className="wire-button" 
                                style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '15px' }}
                                onClick={confirmApprove}
                            >
                                承認する
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 拒否確認モーダル */}
            {showRejectModal && (
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
                    onClick={() => setShowRejectModal(false)}
                >
                    <div 
                        className="wire-box" 
                        style={{ 
                            width: '100%', 
                            maxWidth: '400px',
                            borderRadius: '16px', 
                            padding: '28px', 
                            background: 'white'
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>
                            フレンド申請の拒否
                        </h2>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', textAlign: 'center', lineHeight: '1.6' }}>
                            {selectedRequest?.name}さんのフレンド申請を<br/>拒否してもよろしいですか？
                        </p>
                        
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                className="wire-button-outline" 
                                style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '15px' }} 
                                onClick={() => setShowRejectModal(false)}
                            >
                                キャンセル
                            </button>
                            <button 
                                className="wire-button" 
                                style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '15px', background: '#dc3545', borderColor: '#dc3545' }}
                                onClick={confirmReject}
                            >
                                拒否する
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
