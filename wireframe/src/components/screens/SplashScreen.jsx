// Splash Screen Component
const SplashScreen = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <div style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#333'
            }}>
                LIFE
            </div>
        </div>
    );
};
