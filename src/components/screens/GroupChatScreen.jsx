// Group Chat Screen Component
function GroupChatScreen({ 
    selectedCommunity, 
    setCurrentScreen 
}) {
    const { useState } = React;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, userId: 'U1', userName: 'ユーザー1', avatar: '真', message: 'こんにちは！', time: '10:30', isOwn: false },
        { id: 2, userId: 'U2', userName: 'ユーザー2', avatar: 'た', message: 'よろしくお願いします！', time: '10:32', isOwn: false },
        { id: 3, userId: 'GU', userName: 'ゲストユーザー', avatar: 'GU', message: 'みなさん、よろしくです！', time: '10:35', isOwn: true },
        { id: 4, userId: 'U1', userName: 'ユーザー1', avatar: '真', message: 'この趣味について語りましょう〜', time: '10:36', isOwn: false },
    ]);

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                userId: 'GU',
                userName: 'ゲストユーザー',
                avatar: 'GU',
                message: message,
                time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
                isOwn: true
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f5f5f5' }}>
            <Header 
                title={selectedCommunity?.name || 'グループチャット'} 
                showBack 
                onBack={() => setCurrentScreen('chat')} 
            />
            
            {/* Chat Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                {messages.map((msg, index) => (
                    <div key={msg.id}>
                        {/* Show date separator if needed */}
                        {index === 0 && (
                            <div style={{ textAlign: 'center', margin: '16px 0' }}>
                                <span style={{ background: 'rgba(0,0,0,0.1)', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', color: '#666' }}>
                                    今日
                                </span>
                            </div>
                        )}
                        
                        {msg.isOwn ? (
                            // Own message (right side)
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                                <div style={{ maxWidth: '70%' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', flexDirection: 'row-reverse' }}>
                                        <div className="wire-avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', fontSize: '14px', flexShrink: 0 }}>
                                            {msg.avatar}
                                        </div>
                                        <div>
                                            <div style={{ background: '#000', color: 'white', padding: '12px 16px', borderRadius: '18px 18px 4px 18px', marginBottom: '4px' }}>
                                                <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{msg.message}</p>
                                            </div>
                                            <p style={{ fontSize: '11px', color: '#999', textAlign: 'right' }}>{msg.time}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Others' messages (left side)
                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
                                <div style={{ maxWidth: '70%' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                                        <div className="wire-avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', fontSize: '14px', flexShrink: 0 }}>
                                            {msg.avatar}
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px', marginLeft: '4px' }}>{msg.userName}</p>
                                            <div style={{ background: 'white', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', marginBottom: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                                <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{msg.message}</p>
                                            </div>
                                            <p style={{ fontSize: '11px', color: '#999', marginLeft: '4px' }}>{msg.time}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div style={{ padding: '12px 16px', background: 'white', borderTop: '1px solid #e0e0e0' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '8px' }}>
                        <Icons.Plus />
                    </button>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="メッセージを入力..."
                        className="wire-text"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '24px' }}
                    />
                    <button
                        onClick={handleSend}
                        style={{ border: 'none', background: 'black', color: 'white', cursor: 'pointer', padding: '10px', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Icons.Send />
                    </button>
                </div>
            </div>
        </div>
    );
}
