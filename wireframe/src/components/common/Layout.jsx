// Header Component
function Header({ title, showBack, onBack }) {
    return (
        <div style={{ borderBottom: '2px solid #000', background: 'white', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {showBack && (
                <button onClick={onBack} style={{ position: 'absolute', left: '16px', border: 'none', background: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                    <Icons.ArrowLeft />
                </button>
            )}
            <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>LIFE</h1>
        </div>
    );
}

// Bottom Navigation Component
function BottomNav({ currentScreen, setCurrentScreen, setViewingProfile }) {
    return (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '2px solid #000', display: 'flex', justifyContent: 'space-around', padding: '10px 0', zIndex: 100 }}>
            {[
                { id: 'chat', label: 'チャット', Icon: Icons.Chat },
                { id: 'mypage', label: 'マイページ', Icon: Icons.User }
            ].map(item => (
                <button
                    key={item.id}
                    onClick={() => {
                        setCurrentScreen(item.id);
                        setViewingProfile(null);
                    }}
                    style={{
                        border: 'none',
                        background: (currentScreen === item.id || (item.id === 'chat' && currentScreen === 'chatDetail')) ? '#e0e0e0' : 'transparent',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        flex: 1
                    }}
                >
                    <item.Icon />
                    <span style={{ fontSize: '11px', fontWeight: 'bold' }}>{item.label}</span>
                </button>
            ))}
        </div>
    );
}
