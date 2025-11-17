import { UserProfile, Community, ChatMessage } from '../types';
import type { FollowRequest, StampPack } from '../store/userSlice';

export const mockUsers: UserProfile[] = [
  { id:'u1', name:'あかり', age:'20代', region:'東京', message:'今日は渋谷でカフェ巡り☕', bio:'カフェと写真が好き。週末は都内散歩。', avatar:'/user/image.png', verified:true, online:true },
  { id:'u2', name:'Ren', age:'30代', region:'大阪', message:'React触ってます', bio:'JSと旅行。', avatar:'/user/image copy.png', online:false },
  { id:'u3', name:'Liam', age:'20代', region:'東京', message:'Building something cool!', bio:'I love web3 and AI.', avatar:'/user/image copy 2.png', online:true },
  { id:'u4', name:'ゆい', age:'10代後半', region:'神奈川', message:'アニメとゲームが好きです！', bio:'声優目指してます🎤', avatar:'/user/image copy 3.png', verified:false, online:true },
  { id:'u5', name:'ケンタ', age:'20代', region:'福岡', message:'筋トレ頑張ってます💪', bio:'ジム通い3年目。健康第一！', avatar:'/user/image copy 4.png', verified:true, online:false },
  { id:'u6', name:'さくら', age:'30代', region:'東京', message:'料理とお菓子作りが趣味です🍰', bio:'インスタでレシピ公開中。', avatar:'/user/image copy 5.png', verified:false, online:true },
  { id:'u7', name:'タカシ', age:'40代', region:'愛知', message:'釣り好きです🎣', bio:'週末は海か川へ。', avatar:'/user/image copy 6.png', verified:false, online:false },
  { id:'u8', name:'まい', age:'20代', region:'北海道', message:'旅行と写真が好き📷', bio:'47都道府県制覇目指し中！', avatar:'/user/image.png', verified:true, online:true },
  { id:'u9', name:'りょう', age:'10代前半', region:'東京', message:'プログラミング勉強中💻', bio:'将来はエンジニアになりたい。', avatar:'/user/image copy.png', verified:false, online:false },
  { id:'u10', name:'エミリー', age:'20代', region:'東京', message:'英会話教えます！', bio:'アメリカ出身。日本語勉強中。', avatar:'/user/image copy 2.png', verified:true, online:true },
  { id:'u11', name:'ユウタ', age:'30代', region:'大阪', message:'お笑い大好き🤣', bio:'漫才見るのも演るのも好き。', avatar:'/user/image copy 3.png', verified:false, online:false },
  { id:'u12', name:'あやか', age:'20代', region:'神奈川', message:'ヨガインストラクターです🧘', bio:'心と体の健康をサポート。', avatar:'/user/image copy 4.png', verified:true, online:true },
  { id:'u13', name:'コウジ', age:'40代', region:'東京', message:'ワイン好きです🍷', bio:'ソムリエ資格持ってます。', avatar:'/user/image copy 5.png', verified:false, online:false },
  { id:'u14', name:'みく', age:'10代後半', region:'福岡', message:'K-POP大好き💕', bio:'ダンス練習中。推しは秘密。', avatar:'/user/image copy 6.png', verified:false, online:true },
  { id:'u15', name:'ショウ', age:'30代', region:'愛知', message:'車とバイクが趣味🏍️', bio:'ツーリング仲間募集中。', avatar:'/user/image.png', verified:true, online:false },
  { id:'u16', name:'なな', age:'20代', region:'大阪', message:'美容系YouTuberです💄', bio:'コスメレビューしてます。', avatar:'/user/image copy.png', verified:true, online:true },
  { id:'u17', name:'ダイキ', age:'20代', region:'東京', message:'DJ活動してます🎧', bio:'週末はクラブで。', avatar:'/user/image copy 2.png', verified:false, online:true },
  { id:'u18', name:'かおり', age:'30代', region:'神奈川', message:'ガーデニングが趣味🌻', bio:'ベランダで野菜育ててます。', avatar:'/user/image copy 3.png', verified:false, online:false },
  { id:'u19', name:'ジュン', age:'20代', region:'北海道', message:'スノボシーズン待ち🏂', bio:'冬が一番好きな季節。', avatar:'/user/image copy 4.png', verified:true, online:true },
  { id:'u20', name:'りさ', age:'10代後半', region:'東京', message:'イラスト描いてます🎨', bio:'pixivで活動中。', avatar:'/user/image copy 5.png', verified:false, online:false },
];

export const mockCommunities: Community[] = [
  { id:'c1', name:'カフェ好き集まれ', category:'旅行', members:231, posts:120, desc:'全国のおすすめカフェを共有しよう。', image:'/com/image.png' },
  { id:'c2', name:'夜型エンジニア', category:'雑談', members:88, posts:54, desc:'深夜に作業している人同士でまったりチャット。', image:'/com/image copy.png' },
  { id:'c3', name:'ゲーム作り勉強会', category:'ゲーム', members:140, posts:320, desc:'インディーゲーム制作ノウハウを交換。', image:'/com/image copy 2.png' },
  { id:'c4', name:'アニメ好き集会', category:'アニメ', members:520, posts:1850, desc:'最新アニメから名作まで語り合おう。', image:'/com/image copy 3.png' },
  { id:'c5', name:'料理レシピ共有', category:'料理', members:380, posts:640, desc:'おすすめレシピや料理のコツを共有。', image:'/com/image copy 4.png' },
  { id:'c6', name:'筋トレ部', category:'スポーツ', members:290, posts:450, desc:'トレーニングメニューや食事管理について。', image:'/com/image copy 5.png' },
  { id:'c7', name:'写真撮影サークル', category:'趣味', members:410, posts:980, desc:'素敵な写真や撮影スポットを共有。', image:'/com/image.png' },
  { id:'c8', name:'英語勉強会', category:'学習', members:270, posts:380, desc:'英語学習者同士で情報交換。', image:'/com/image copy.png' },
  { id:'c9', name:'音楽好き集まれ', category:'音楽', members:350, posts:720, desc:'好きなアーティストやライブ情報を共有。', image:'/com/image copy 2.png' },
  { id:'c10', name:'ペット好き', category:'雑談', members:480, posts:1120, desc:'犬猫をはじめペット自慢や相談。', image:'/com/image copy 3.png' },
  { id:'c11', name:'映画鑑賞会', category:'趣味', members:310, posts:560, desc:'おすすめ映画や感想を語り合う。', image:'/com/image copy 4.png' },
  { id:'c12', name:'読書クラブ', category:'趣味', members:220, posts:410, desc:'おすすめの本や読書感想を共有。', image:'/com/image copy 5.png' },
  { id:'c13', name:'旅行好き集合', category:'旅行', members:540, posts:890, desc:'国内外の旅行情報やおすすめスポット。', image:'/com/image.png' },
  { id:'c14', name:'イラスト制作', category:'アート', members:390, posts:670, desc:'イラスト制作のコツや作品共有。', image:'/com/image copy.png' },
  { id:'c15', name:'副業・起業相談', category:'ビジネス', members:260, posts:380, desc:'副業や起業の情報交換。', image:'/com/image copy 2.png' }
];

export const seedChat: ChatMessage[] = [
  { id:'m1', sender:'u1', message:'やっほー！', time:'10:00' },
  { id:'m2', sender:'me', message:'こんにちは！', time:'10:01' },
  { id:'m3', sender:'u1', message:'午後空いてる？', time:'10:02' },
];

export const mockFollowRequests: FollowRequest[] = [
  { id:'fr1', userId:'u101', name:'佐藤太郎', age:'20代', message:'よろしくお願いします！共通の趣味があると嬉しいです。' },
  { id:'fr2', userId:'u102', name:'田中花子', age:'10代後半', message:'友達募集中です！気軽に話しかけてください。' },
  { id:'fr3', userId:'u103', name:'鈴木一郎', age:'30代', message:'同じ地域の人と繋がりたいです。' }
];

export const mockStampPacks: StampPack[] = [
  { id:'s1', name:'まるこ', description:'ゆるゆるニャンコ', price:100, count:24 },
  { id:'s2', name:'りょの', description:'かわいい表情いっぱい', price:100, count:24 },
  { id:'s3', name:'ヨギリリ', description:'クセになる動き', price:100, count:24 },
  { id:'s4', name:'やましたまほ', description:'日常で使える', price:100, count:24 },
  { id:'s5', name:'うさぎちゃん', description:'ふわふわウサギ', price:100, count:24 },
  { id:'s6', name:'くまモン', description:'人気のクマ', price:100, count:24 },
  { id:'s7', name:'パンダくん', description:'癒しパンダ', price:100, count:24 },
  { id:'s8', name:'ペンギン', description:'よちよち歩き', price:100, count:24 }
];

export function mockTranslate(text: string): Promise<string> {
  return new Promise(r => setTimeout(() => r(`[翻訳] ${text}`), 300));
}
