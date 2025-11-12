// Chat Detail Screen Component
function ChatDetailScreen({ selectedUser, setCurrentScreen }) {
    const { useState } = React;
    const [messageInput, setMessageInput] = useState('');
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    const [translatedMessages, setTranslatedMessages] = useState({});
    
    // ユーザーが外国人かどうかチェック
    const isForeignUser = selectedUser?.country && selectedUser.country !== '日本';

    const handleTranslate = (chatId, originalMessage) => {
        // 翻訳シミュレーション（実際にはGoogle Translate APIなどを使用）
        if (translatedMessages[chatId]) {
            // すでに翻訳済みの場合は元に戻す
            const newTranslated = { ...translatedMessages };
            delete newTranslated[chatId];
            setTranslatedMessages(newTranslated);
        } else {
            // 翻訳する
            setTimeout(() => {
                setTranslatedMessages({
                    ...translatedMessages,
                    [chatId]: `[翻訳] ${originalMessage}`
                });
            }, 300);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
            <Header title={selectedUser?.name || 'チャット'} showBack onBack={() => setCurrentScreen('chat')} />
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                {mockChats.map(chat => (
                    <div key={chat.id} style={{ display: 'flex', justifyContent: chat.sender === 'me' ? 'flex-end' : 'flex-start', marginBottom: '16px', flexDirection: 'column', alignItems: chat.sender === 'me' ? 'flex-end' : 'flex-start' }}>
                        <div className="wire-box" style={{
                            maxWidth: '70%',
                            padding: '14px',
                            borderRadius: '20px',
                            background: chat.sender === 'me' ? '#000' : 'white',
                            color: chat.sender === 'me' ? 'white' : 'black'
                        }}>
                            <p style={{ fontSize: '14px', marginBottom: '6px', lineHeight: '1.5' }}>
                                {translatedMessages[chat.id] || chat.message}
                            </p>
                            <span style={{ fontSize: '11px', opacity: 0.7 }}>{chat.time}</span>
                        </div>
                        {isForeignUser && chat.sender !== 'me' && (
                            <button
                                onClick={() => handleTranslate(chat.id, chat.message)}
                                className="wire-button-outline"
                                style={{
                                    marginTop: '6px',
                                    padding: '6px 12px',
                                    fontSize: '11px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                <span style={{ fontSize: '14px' }}>🌐</span>
                                {translatedMessages[chat.id] ? '原文を表示' : '日本語に翻訳'}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ borderTop: '2px solid #000', background: 'white', padding: '16px' }}>
                {showAttachmentMenu && (
                    <div style={{ marginBottom: '12px', display: 'flex', gap: '12px' }}>
                        <button className="wire-button-outline" style={{ flex: 1, padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <Icons.Image />
                            <span style={{ fontSize: '11px' }}>画像</span>
                        </button>
                        <button className="wire-button-outline" style={{ flex: 1, padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <Icons.Paperclip />
                            <span style={{ fontSize: '11px' }}>ファイル</span>
                        </button>
                        <button className="wire-button-outline" style={{ flex: 1, padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <Icons.Smile />
                            <span style={{ fontSize: '11px' }}>スタンプ</span>
                        </button>
                    </div>
                )}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                        onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                        className="wire-button-outline"
                        style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                    >
                        <Icons.Plus />
                    </button>
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="メッセージを入力..."
                        className="wire-text"
                        style={{ flex: 1, borderRadius: '30px', padding: '12px 16px' }}
                    />
                    <button className="wire-button" style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icons.Send />
                    </button>
                </div>
            </div>
        </div>
    );
}
