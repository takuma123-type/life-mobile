import React, { useState, useCallback } from 'react';
import { useAppDispatch } from '../hooks';
import { navigate, setOnboarded } from '../store/uiSlice';
import Button from '../components/common/Button';

// シンプルなスワイプ検出（横方向）閾値
const SWIPE_THRESHOLD = 50;

interface SlideData {
  id: number;
  title?: string;
  headline: string;
  body?: string;
  cta?: boolean;
}

const slides: SlideData[] = [
  { id: 0, headline: '趣味でつながる、新しいコミュニティ', body: 'LIFEへようこそ。あなたの好きが誰かの好きと出会う場所。' },
  { id: 1, headline: '好きなことで仲間を見つけよう', body: 'アニメ、ゲーム、料理など、様々なコミュニティに参加できます。' },
  { id: 2, headline: '気軽にメッセージでつながる', body: '趣味の仲間とチャットやスタンプで楽しく交流。' },
  { id: 3, headline: 'さあ、始めよう', body: '今すぐ参加してコミュニティを覗いてみよう。', cta: true }
];

// ベース円スタイル（動的に色やアニメを付与）
const baseCircle: React.CSSProperties = {
  width: 260,
  height: 260,
  borderRadius: '50%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 42,
  fontWeight: 700,
  letterSpacing: '.08em',
  userSelect: 'none'
};

const OnboardingScreen: React.FC = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useAppDispatch();
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const goto = useCallback((next:number) => {
    if (next < 0 || next >= slides.length) return;
    setIndex(next);
  }, []);

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = e => {
    setTouchStartX(e.touches[0].clientX);
    setDragging(true);
  };
  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = e => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff < 0) goto(index + 1); else goto(index - 1);
    }
    setDragging(false);
    setTouchStartX(null);
  };

  const complete = () => {
    try { localStorage.setItem('onboarding_completed', '1'); } catch {}
    dispatch(setOnboarded(true));
    dispatch(navigate('chat'));
  };

  const skip = () => complete();

  return (
    <div
      style={{
        height: '100vh',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
      aria-label='オンボーディング画面'
    >
      {/* Skip */}
      <button
        onClick={skip}
        aria-label='スキップ'
        style={{
          position: 'absolute', top: 16, right: 16, padding: '10px 14px',
          background: 'rgba(0,160,233,0.08)', border: 'none', borderRadius: 24,
          fontSize: 13, fontWeight: 600, color: '#00A0E9', cursor: 'pointer',
          minWidth: 72
        }}
      >今はしない</button>

      {/* Slides wrapper */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ flex:1, overflow:'hidden', position:'relative' }}
      >
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: `${slides.length * 100}%`,
            transform: `translateX(-${index * (100 / slides.length)}%)`,
            transition: dragging ? 'none' : 'transform .5s cubic-bezier(.4,0,.2,1)'
          }}
          role='list'
          aria-live='polite'
        >
          {slides.map((s, i) => (
            <div
              key={s.id}
              role='listitem'
              aria-label={`スライド ${i + 1}`}
              style={{
                width: `${100 / slides.length}%`,
                flexShrink:0,
                padding: '100px 24px 80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  ...baseCircle,
                  background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #E9F9FF 45%, #D7F1FF 70%, #C9ECFF 100%)',
                  boxShadow: '0 18px 48px -8px rgba(0,160,233,.35), 0 4px 16px rgba(0,160,233,.25)',
                  color: '#0095db',
                  animation: 'fadeScale .8s cubic-bezier(.4,0,.2,1)',
                  backdropFilter: 'blur(2px)',
                }}
                aria-hidden='true'
              >
                <span style={{
                  position:'absolute',
                  inset:0,
                  borderRadius:'50%',
                  background:'linear-gradient(140deg, rgba(255,255,255,.6) 0%, rgba(255,255,255,0) 60%)',
                  mixBlendMode:'overlay'
                }} />
                <span style={{
                  position:'relative',
                  zIndex:1,
                  background:'linear-gradient(90deg,#00A0E9,#36C5F5)',
                  WebkitBackgroundClip:'text',
                  color:'transparent'
                }}>IMG</span>
              </div>
              <h2 style={{ fontSize:22, fontWeight:700, margin:'40px 0 16px', color:'#0f172a' }}>{s.headline}</h2>
              <p style={{ fontSize:14, lineHeight:1.7, color:'#475569', maxWidth:320 }}>{s.body}</p>
              {s.cta && (
                <div style={{ marginTop:44 }}>
                  <button
                    onClick={complete}
                    aria-label='チャットを始める'
                    style={{
                      position:'relative',
                      display:'inline-flex',
                      alignItems:'center',
                      justifyContent:'center',
                      gap:12,
                      padding:'18px 40px',
                      borderRadius:40,
                      fontSize:16,
                      fontWeight:700,
                      letterSpacing:'.06em',
                      background:'linear-gradient(120deg,#0095db 0%, #00A0E9 30%, #06B6D4 60%, #2BBEF3 100%)',
                      color:'#fff',
                      border:'none',
                      cursor:'pointer',
                      boxShadow:'0 10px 32px -6px rgba(0,160,233,.55), 0 4px 14px rgba(0,160,233,.4)',
                      overflow:'hidden',
                      minWidth:240,
                      transition:'transform .45s cubic-bezier(.4,0,.2,1), box-shadow .45s cubic-bezier(.4,0,.2,1)',
                      WebkitTapHighlightColor:'transparent'
                    }}
                    onMouseOver={e=>{
                      e.currentTarget.style.transform='translateY(-4px)';
                      e.currentTarget.style.boxShadow='0 16px 40px -6px rgba(0,160,233,.6), 0 6px 18px rgba(0,160,233,.45)';
                    }}
                    onMouseOut={e=>{
                      e.currentTarget.style.transform='translateY(0)';
                      e.currentTarget.style.boxShadow='0 10px 32px -6px rgba(0,160,233,.55), 0 4px 14px rgba(0,160,233,.4)';
                    }}
                    onMouseDown={e=>{
                      e.currentTarget.style.transform='translateY(-1px) scale(.97)';
                    }}
                    onMouseUp={e=>{
                      e.currentTarget.style.transform='translateY(-4px)';
                    }}
                  >
                    <span style={{ position:'relative', zIndex:2 }}>チャットを始める</span>
                    <span
                      aria-hidden='true'
                      style={{
                        position:'absolute',
                        inset:0,
                        background:'linear-gradient(60deg,rgba(255,255,255,.15) 0%,rgba(255,255,255,0) 55%)',
                        mixBlendMode:'screen'
                      }}
                    />
                    <span
                      aria-hidden='true'
                      style={{
                        position:'absolute',
                        top:0,left:-120,width:'40%',height:'100%',
                        background:'linear-gradient(90deg,rgba(255,255,255,.0) 0%,rgba(255,255,255,.7) 50%,rgba(255,255,255,0) 100%)',
                        transform:'skewX(-18deg)',
                        animation:'sheen 3.2s ease-in-out infinite'
                      }}
                    />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Indicators & controls */}
      <div style={{ padding:'0 24px 34px', display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>
        <div style={{ display:'flex', gap:14 }} aria-label='ページインジケーター'>
          {slides.map((s,i) => (
            <button
              key={s.id}
              onClick={()=>goto(i)}
              aria-label={`スライド ${i+1} に移動`}
              style={{
                width: i===index?18:12,
                height: i===index?18:12,
                borderRadius:'50%',
                background: i===index? 'linear-gradient(135deg,#00A0E9,#2BBEF3)' : 'rgba(0,160,233,.25)',
                boxShadow: i===index? '0 4px 14px rgba(0,160,233,.45)' : 'none',
                border:'none',
                cursor:'pointer',
                transition:'all .35s cubic-bezier(.4,0,.2,1)'
              }}
            />
          ))}
        </div>
        <div style={{ display:'flex', gap:22 }}>
          <button
            onClick={()=>goto(index-1)}
            disabled={index===0}
            aria-label='前のスライド'
            style={{
              width:56,height:56,borderRadius:28,border:'none',cursor:index===0?'not-allowed':'pointer',
              background:index===0?'rgba(0,160,233,.12)':'linear-gradient(135deg,#F7FCFF,#E6F7FF)',
              color:'#0095db',fontWeight:700,fontSize:18,boxShadow:'0 6px 18px rgba(0,160,233,.25)',
              transition:'all .25s'
            }}
            onMouseOver={e=>{if(index!==0){e.currentTarget.style.transform='translateY(-3px)';}}}
            onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)';}}
          >←</button>
          <button
            onClick={()=>goto(index+1)}
            disabled={index===slides.length-1}
            aria-label='次のスライド'
            style={{
              width:56,height:56,borderRadius:28,border:'none',cursor:index===slides.length-1?'not-allowed':'pointer',
              background:index===slides.length-1?'rgba(0,160,233,.12)':'linear-gradient(135deg,#00A0E9,#2BBEF3)',
              color:'#fff',fontWeight:700,fontSize:18,boxShadow:'0 8px 22px rgba(0,160,233,.45)',
              transition:'all .25s'
            }}
            onMouseOver={e=>{if(index!==slides.length-1){e.currentTarget.style.transform='translateY(-3px)';}}}
            onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)';}}
          >→</button>
        </div>
        {index < slides.length-1 && (
          <Button
            onClick={complete}
            variant='outline'
            size='md'
            aria-label='スキップして開始'
            style={{ color:'#0095db', borderColor:'#00A0E9', background:'rgba(0,160,233,.06)', backdropFilter:'blur(4px)' }}
          >スキップして開始</Button>
        )}
      </div>
      <style>{`
        @keyframes fadeScale {0%{opacity:0;transform:scale(.85);}60%{opacity:1;}100%{opacity:1;transform:scale(1);} }
        @keyframes sheen {0%{left:-120px;}55%{left:160%;}100%{left:160%;}}
      `}</style>
    </div>
  );
};

export default OnboardingScreen;
