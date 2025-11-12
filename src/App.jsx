function App() {
    const { useState, useEffect } = React;
    const [showSplash, setShowSplash] = useState(true);
    const [currentScreen, setCurrentScreen] = useState('chat');
    const [chatType, setChatType] = useState('following');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [viewingProfile, setViewingProfile] = useState(null);
    const [isFollowing, setIsFollowing] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authCallback, setAuthCallback] = useState(null);

    // スプラッシュ画面を2秒間表示
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const requireAuth = (callback) => {
        if (isAuthenticated) {
            // 認証済みの場合、プロフィール登録画面へ
            if (isLoggedIn) {
                callback();
            } else {
                setAuthCallback(() => callback);
                setCurrentScreen('profileRegistration');
            }
        } else {
            // 未認証の場合、認証モーダルを表示
            setAuthCallback(() => callback);
            setShowAuthModal(true);
        }
    };

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
        setShowAuthModal(false);
        setCurrentScreen('profileRegistration');
    };

    const handleRegistrationComplete = () => {
        setIsLoggedIn(true);
        if (authCallback) {
            authCallback();
            setAuthCallback(null);
        } else {
            setCurrentScreen('chat');
        }
    };

    // スプラッシュ画面表示中は何も表示しない
    if (showSplash) {
        return <SplashScreen />;
    }

    return (
        <div style={{ width: '100%', minHeight: '100vh' }}>
            {currentScreen === 'login' && (
                <LoginScreen 
                    setIsLoggedIn={setIsLoggedIn} 
                    setCurrentScreen={setCurrentScreen} 
                />
            )}
            
            {currentScreen === 'chat' && (
                <ChatListScreen 
                    chatType={chatType}
                    setChatType={setChatType}
                    setSelectedUser={setSelectedUser}
                    setSelectedCommunity={setSelectedCommunity}
                    setCurrentScreen={setCurrentScreen}
                    currentScreen={currentScreen}
                    setViewingProfile={setViewingProfile}
                    requireAuth={requireAuth}
                />
            )}
            
            {currentScreen === 'chatDetail' && (
                <ChatDetailScreen 
                    selectedUser={selectedUser}
                    setCurrentScreen={setCurrentScreen}
                />
            )}
            
            {currentScreen === 'groupChat' && (
                <GroupChatScreen 
                    selectedCommunity={selectedCommunity}
                    setCurrentScreen={setCurrentScreen}
                />
            )}
            
            {currentScreen === 'communityDetail' && (
                <CommunityDetailScreen 
                    selectedCommunity={selectedCommunity}
                    setCurrentScreen={setCurrentScreen}
                    currentScreen={currentScreen}
                    setViewingProfile={setViewingProfile}
                    setChatType={setChatType}
                />
            )}
            
            {currentScreen === 'mypage' && (
                <MyPageScreen 
                    setCurrentScreen={setCurrentScreen}
                    setIsLoggedIn={setIsLoggedIn}
                    currentScreen={currentScreen}
                    setViewingProfile={setViewingProfile}
                />
            )}
            
            {currentScreen === 'followRequests' && (
                <FollowRequestsScreen 
                    setCurrentScreen={setCurrentScreen}
                    currentScreen={currentScreen}
                    setViewingProfile={setViewingProfile}
                />
            )}
            
            {currentScreen === 'editProfile' && (
                <EditProfileScreen 
                    setCurrentScreen={setCurrentScreen}
                    currentScreen={currentScreen}
                    setViewingProfile={setViewingProfile}
                />
            )}
            
            {currentScreen === 'stampShop' && (
                <StampShopScreen 
                    setCurrentScreen={setCurrentScreen}
                    currentScreen={currentScreen}
                    setViewingProfile={setViewingProfile}
                />
            )}
            
            {currentScreen === 'profileRegistration' && (
                <ProfileRegistrationScreen 
                    setCurrentScreen={setCurrentScreen}
                    setIsLoggedIn={setIsLoggedIn}
                    onRegistrationComplete={handleRegistrationComplete}
                />
            )}
            
            {showAuthModal && (
                <GoogleAuthModal 
                    onClose={() => setShowAuthModal(false)}
                    onAuthSuccess={handleAuthSuccess}
                />
            )}
        </div>
    );
}
