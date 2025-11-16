// Mock User Data
const mockUsers = [
    { id: 1, name: '寅斗', age: '10代前半', message: 'よろ!', time: '14秒前', online: true, avatar: '寅', bio: 'ゲームとアニメが好きです!よろしくお願いします!', gender: '男性', country: '日本', region: '北海道', city: '札幌市', verified: true, activeTime: 'いつでも' },
    { id: 2, name: 'たろ', age: '10代後半', message: '通話しよー', time: '1分前', online: true, avatar: 'た', bio: '音楽を聴くのが好きです。バンドやってます!', gender: '男性', country: '日本', region: '東京都', city: '渋谷区', verified: true, activeTime: '夜（18:00-24:00）' },
    { id: 3, name: 'みう', age: '10代前半', message: '中1女子です!よろしく!', time: '5分前', online: false, avatar: 'み', bio: 'アニメ鑑賞とYouTube見るのが趣味です。よろしくね!', gender: '女性', country: '日本', region: '大阪府', city: '大阪市', verified: false, activeTime: '昼（12:00-18:00）' },
    { id: 4, name: 'めん', age: '10代前半', message: '気軽に話しかけてね!', time: '10分前', online: true, avatar: 'め', bio: 'イラスト描くのが好き。趣味友達募集中!', gender: 'その他', country: '日本', region: '福岡県', city: '福岡市', verified: true, activeTime: 'いつでも' },
    { id: 5, name: 'たくと', age: '10代前半', message: '13歳です年近い人なかよくなりたいです!', time: '15分前', online: false, avatar: 'た', bio: 'サッカーとゲームが好きです。気軽に話しかけてください!', gender: '男性', country: '日本', region: '東京都', city: '新宿区', verified: false, activeTime: '朝（6:00-12:00）' },
    { id: 6, name: 'Emma', age: '10代後半', message: 'Hello! Nice to meet you!', time: '20分前', online: true, avatar: 'E', bio: 'I love Japanese anime and manga! Learning Japanese now.', gender: '女性', country: 'アメリカ', region: 'California', city: 'Los Angeles', verified: true, activeTime: '夜（18:00-24:00）' },
    { id: 7, name: 'Li Wei', age: '20代', message: '你好！很高兴认识你', time: '25分前', online: true, avatar: 'L', bio: '喜欢日本文化和动漫。正在学习日语。', gender: '男性', country: '中国', region: 'Shanghai', city: 'Pudong', verified: true, activeTime: 'いつでも' },
    { id: 8, name: 'Min-jun', age: '10代後半', message: '안녕하세요! 잘 부탁드립니다', time: '30分前', online: false, avatar: 'M', bio: 'K-POPと日本のアニメが好きです。友達になりましょう！', gender: '男性', country: '韓国', region: 'Seoul', city: 'Gangnam', verified: false, activeTime: '昼（12:00-18:00）' },
    { id: 9, name: 'Sophie', age: '10代後半', message: 'Bonjour! I want to learn Japanese', time: '35分前', online: true, avatar: 'S', bio: 'French student who loves Japanese culture. Let\'s be friends!', gender: '女性', country: 'フランス', region: 'Île-de-France', city: 'Paris', verified: true, activeTime: '朝（6:00-12:00）' },
    { id: 10, name: 'Carlos', age: '20代', message: '¡Hola! Me encanta el anime', time: '40分前', online: false, avatar: 'C', bio: 'Español aprendiendo japonés. Me gusta el anime y los videojuegos.', gender: '男性', country: 'スペイン', region: 'Madrid', city: 'Madrid', verified: false, activeTime: '夜（18:00-24:00）' },
];

// Mock Community Data
const mockCommunities = [
    { id: 1, name: 'ゲーム好き', category: 'ゲーム', members: '1.2k', posts: '5.4k', desc: 'ゲーム好きが集まるコミュニティ!最新ゲームからレトロゲームまで、何でも語り合いましょう。', image: 'https://i.postimg.cc/66Ckt8YH/anime-sky-community.jpg' },
    { id: 2, name: 'アニメ好き', category: 'アニメ', members: '2.1k', posts: '8.2k', desc: 'アニメについて語り合おう!今期のアニメから過去の名作まで、アニメ好きが集まる場所です。', image: 'https://i.postimg.cc/66Ckt8YH/anime-sky-community.jpg' },
    { id: 3, name: '音楽好き', category: '音楽', members: '890', posts: '3.1k', desc: '音楽を愛する人たちのコミュニティ。ジャンルを問わず、好きな音楽について語り合いましょう。', image: 'https://i.postimg.cc/66Ckt8YH/anime-sky-community.jpg' },
    { id: 4, name: '雑談部屋', category: '雑談', members: '3.5k', posts: '12k', desc: 'なんでも話せる雑談部屋。気軽に参加して、楽しく交流しましょう!', image: 'https://i.postimg.cc/66Ckt8YH/anime-sky-community.jpg' },
];

// Mock Chat Messages
const mockChats = [
    { id: 1, sender: 'other', message: '最近仕事で疲れてるんだ', time: '21:19' },
    { id: 2, sender: 'me', message: 'なにかあったの?', time: '21:20' },
    { id: 3, sender: 'other', message: '今入社一年目なんだけど、なかなか仕事って難しいなと思って。', time: '21:21' },
    { id: 4, sender: 'me', message: '私もそうだったよ!これを乗り切ったら、きっと楽になるよ~', time: '21:22' },
    { id: 5, sender: 'other', message: 'いつもありがとう(^凹^)', time: '21:23' },
];

// Mock Chat Messages (Foreign User)
const mockForeignChats = [
    { id: 1, sender: 'other', message: 'Hi! How are you doing today?', time: '14:30' },
    { id: 2, sender: 'me', message: 'I\'m good! How about you?', time: '14:31' },
    { id: 3, sender: 'other', message: 'I\'m great! I just finished watching a new anime. It was amazing!', time: '14:32' },
    { id: 4, sender: 'me', message: 'That sounds cool! Which anime was it?', time: '14:33' },
    { id: 5, sender: 'other', message: 'It\'s called "Attack on Titan". Have you seen it?', time: '14:34' },
];

// Mock Follow Requests
const mockFollowRequests = [
    { id: 1, name: '佐藤太郎', age: '20代', message: 'よろしくお願いします!', avatar: '佐' },
    { id: 2, name: '田中花子', age: '10代後半', message: '仲良くしてください', avatar: '田' },
    { id: 3, name: '鈴木一郎', age: '30代', message: 'フォローありがとうございます', avatar: '鈴' },
];

// Mock Stamp Packs
const mockStampPacks = [
    { 
        id: 1, 
        name: 'まるこ', 
        subtitle: 'ゆるゆるニャンコ',
        author: 'まるこ',
        points: 100, 
        count: 24,
        description: 'かわいい！ゆるゆるニャンコのスタンプです！',
        thumbnail: '🐱'
    },
    { 
        id: 2, 
        name: 'りよの', 
        subtitle: '街に来たきつね',
        author: 'りよの',
        points: 100, 
        count: 24,
        description: 'きつねが街にやってきました！',
        thumbnail: '🦊'
    },
    { 
        id: 3, 
        name: 'ヨギリリ', 
        subtitle: 'わんこの気持ち',
        author: 'ヨギリリ',
        points: 100, 
        count: 24,
        description: 'わんこの気持ちを表現したスタンプです！',
        thumbnail: '🐶'
    },
    { 
        id: 4, 
        name: 'やましたまほ', 
        subtitle: 'キノコの日常',
        author: 'やましたまほ',
        points: 100, 
        count: 24,
        description: 'キノコの日常を描いたスタンプ！',
        thumbnail: '🍄'
    },
    { 
        id: 5, 
        name: 'ミト', 
        subtitle: '双葉ウサギの日々スタンプ',
        author: 'ミト',
        points: 100, 
        count: 24,
        description: '双葉ウサギの日々を描いたスタンプ！',
        thumbnail: '🐰'
    },
    { 
        id: 6, 
        name: 'のの', 
        subtitle: 'ゆるふわガールとペットのトト',
        author: 'のの',
        points: 100, 
        count: 24,
        description: 'ゆるふわガールとペットのトトのスタンプ！',
        thumbnail: '👧'
    },
    { 
        id: 7, 
        name: 'のの', 
        subtitle: '若夫婦のまったり日常生活',
        author: 'のの',
        points: 100, 
        count: 24,
        description: '若夫婦のまったりした日常生活！',
        thumbnail: '👫'
    },
    { 
        id: 8, 
        name: 'おはな', 
        subtitle: 'おんなのこだけのすたんぷ',
        author: 'おはな',
        points: 100, 
        count: 24,
        description: 'おんなのこだけのかわいいスタンプ！',
        thumbnail: '👩'
    },
    { 
        id: 9, 
        name: 'RABA', 
        subtitle: 'Peco Life',
        author: 'RABA',
        points: 100, 
        count: 24,
        description: 'Pecoの日常スタンプ！',
        thumbnail: '🐱'
    },
    { 
        id: 10, 
        name: 'あんなマン', 
        subtitle: '毎日使える！ほのぼのすぐな犬の日',
        author: 'あんなマン',
        points: 100, 
        count: 24,
        description: '毎日使える！ほのぼのすぐな犬の日常スタンプ！',
        thumbnail: '🐕'
    },
    { 
        id: 11, 
        name: 'NALL', 
        subtitle: 'Zombie Girl',
        author: 'NALL',
        points: 100, 
        count: 40,
        description: 'コワかわいい？ゾンビ少女のスタンプです！',
        thumbnail: '🧟‍♀️'
    },
    { 
        id: 12, 
        name: 'のの', 
        subtitle: 'ゆるふわガールとペットのトト2',
        author: 'のの',
        points: 100, 
        count: 24,
        description: 'ゆるふわガールとペットのトト第2弾！',
        thumbnail: '👧'
    },
];
