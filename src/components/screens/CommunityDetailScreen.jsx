// Community Detail Screen Component (Group Chat)
function CommunityDetailScreen({ 
    selectedCommunity, 
    setCurrentScreen,
    currentScreen,
    setViewingProfile,
    setChatType
}) {
    const { useState } = React;
    const [message, setMessage] = useState('');
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    const [translatedMessages, setTranslatedMessages] = useState({});
    const [messages, setMessages] = useState([
        { id: 1, userId: 'U1', userName: 'ユーザー1', avatar: '真', message: 'こんにちは！', time: '10:30', isOwn: false, country: '日本' },
        { id: 2, userId: 'U2', userName: 'Emma', avatar: 'E', message: 'Hello everyone! Nice to meet you all!', time: '10:32', isOwn: false, country: 'アメリカ' },
        { id: 3, userId: 'GU', userName: 'ゲストユーザー', avatar: 'GU', message: 'みなさん、よろしくです！', time: '10:35', isOwn: true, country: '日本' },
        { id: 4, userId: 'U3', userName: 'Li Wei', avatar: 'L', message: '大家好！我也喜欢动漫', time: '10:36', isOwn: false, country: '中国' },
        { id: 5, userId: 'U4', userName: 'たろ', avatar: 'た', message: 'いろんな国の人がいて楽しいね！', time: '10:38', isOwn: false, country: '日本' },
        { id: 6, userId: 'U5', userName: 'Min-jun', avatar: 'M', message: '저도 일본 애니메이션 정말 좋아해요!', time: '10:40', isOwn: false, country: '韓国' },
    ]);

    const handleTranslate = (msgId, originalMessage) => {
        if (translatedMessages[msgId]) {
            const newTranslated = { ...translatedMessages };
            delete newTranslated[msgId];
            setTranslatedMessages(newTranslated);
        } else {
            setTimeout(() => {
                setTranslatedMessages({
                    ...translatedMessages,
                    [msgId]: `[翻訳] ${originalMessage}`
                });
            }, 300);
        }
    };

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
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                        <div className="wire-avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', fontSize: '14px', flexShrink: 0 }}>
                                            {msg.avatar}
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px', marginLeft: '4px' }}>{msg.userName}</p>
                                            <div style={{ background: 'white', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', marginBottom: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                                <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                                                    {translatedMessages[msg.id] || msg.message}
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '4px' }}>
                                                <p style={{ fontSize: '11px', color: '#999' }}>{msg.time}</p>
                                                {msg.country && msg.country !== '日本' && (
                                                    <button
                                                        onClick={() => handleTranslate(msg.id, msg.message)}
                                                        className="wire-button-outline"
                                                        style={{
                                                            padding: '4px 8px',
                                                            fontSize: '10px',
                                                            borderRadius: '10px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '3px'
                                                        }}
                                                    >
                                                        <span style={{ fontSize: '12px' }}>🌐</span>
                                                        {translatedMessages[msg.id] ? '原文' : '翻訳'}
                                                    </button>
                                                )}
                                            </div>
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
                {showAttachmentMenu && (
                    <div style={{ marginBottom: '12px', display: 'flex', gap: '8px' }}>
                        <button className="wire-button-outline" style={{ flex: 1, padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                            <Icons.Image />
                            画像
                        </button>
                        <button className="wire-button-outline" style={{ flex: 1, padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                            <Icons.Paperclip />
                            ファイル
                        </button>
                        <button className="wire-button-outline" style={{ flex: 1, padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                            <Icons.Smile />
                            スタンプ
                        </button>
                    </div>
                )}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button 
                        onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '8px' }}
                    >
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
