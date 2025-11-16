import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { navigate } from '../store/uiSlice';
import { IconBack } from '../components/icons';
import { toggleJoin } from '../store/communitySlice';

const CommunityDetailScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeId = useAppSelector((s:any)=> s.communities.activeCommunityId);
  const community = useAppSelector((s:any)=> s.communities.list.find((c:any)=> c.id === activeId));
  const joined = useAppSelector((s:any)=> s.communities.joined[activeId]);

  if(!community) return null;

  // 常にモーダル表示
  return (
    <div 
      style={{ 
        position:'fixed', 
        inset:0, 
        background:'rgba(0,0,0,.5)', 
        backdropFilter:'blur(6px)',
        display:'flex', 
        alignItems:'center',
        justifyContent:'center',
        padding:20,
        zIndex:100
      }}
      onClick={()=>dispatch(navigate('chat'))}
    >
      <div 
        style={{ 
          width:'100%',
          maxWidth:480,
          background:'#fff',
          borderRadius:24,
          padding:'32px 24px 24px',
          textAlign:'center',
          maxHeight:'90vh',
          overflowY:'auto',
          position:'relative'
        }}
        onClick={e=>e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button 
          aria-label='閉じる' 
          onClick={()=>dispatch(navigate('chat'))} 
          style={{ 
            position:'absolute', 
            top:16, 
            left:16, 
            background:'rgba(0,0,0,.05)', 
            border:'none', 
            cursor:'pointer', 
            width:36, 
            height:36, 
            borderRadius:'50%', 
            display:'flex', 
            alignItems:'center', 
            justifyContent:'center', 
            transition:'background .2s ease'
          }} 
          onMouseOver={e=>(e.currentTarget.style.background='rgba(0,0,0,.1)')} 
          onMouseOut={e=>(e.currentTarget.style.background='rgba(0,0,0,.05)')}
        >
          <IconBack size={20} />
        </button>

        {/* アイコン */}
        <div style={{ 
          width:100, 
          height:100, 
          borderRadius:24, 
          background:'#f5f5f5',
          border:'2px solid #e5e5e5',
          display:'flex', 
          alignItems:'center', 
          justifyContent:'center', 
          fontSize:14,
          fontWeight:600,
          color:'#999',
          margin:'0 auto 20px'
        }}>
          IMG
        </div>

        {/* コミュニティ名 */}
        <h2 style={{ margin:'0 0 12px', fontSize:22, fontWeight:700 }}>{community.name}</h2>

        {/* カテゴリバッジ */}
        {community.category && (
          <div style={{ marginBottom:16 }}>
            <span style={{ 
              fontSize:12, 
              background:'#000',
              color:'#fff',
              padding:'5px 12px', 
              borderRadius:14,
              fontWeight:600,
              display:'inline-block'
            }}>
              {community.category}
            </span>
          </div>
        )}

        {/* メンバー数・投稿数 */}
        <p style={{ margin:'0 0 24px', fontSize:14, color:'#666' }}>
          {community.members}人 · {community.posts}投稿
        </p>

        {/* について */}
        <div style={{ 
          textAlign:'left', 
          background:'#fafafa', 
          padding:'16px', 
          borderRadius:12, 
          marginBottom:24 
        }}>
          <h3 style={{ margin:'0 0 8px', fontSize:15, fontWeight:700 }}>について</h3>
          <p style={{ margin:0, fontSize:13, lineHeight:1.7, color:'#666' }}>
            {community.desc || 'コミュニティの説明文がここに表示されます。'}
          </p>
        </div>

        {/* ボタン */}
        {!joined ? (
          <button 
            onClick={()=>{
              dispatch(toggleJoin(activeId));
            }}
            style={{ 
              width:'100%',
              padding:'16px',
              background:'#000',
              color:'#fff',
              border:'none',
              borderRadius:16,
              fontSize:15,
              fontWeight:700,
              cursor:'pointer',
              transition:'opacity .2s ease',
              marginBottom:12
            }}
            onMouseOver={e=>(e.currentTarget.style.opacity='0.85')}
            onMouseOut={e=>(e.currentTarget.style.opacity='1')}
          >
            参加する
          </button>
        ) : (
          <>
            <button 
              onClick={()=>dispatch(toggleJoin(activeId))}
              style={{ 
                width:'100%',
                padding:'14px',
                background:'#fff',
                border:'2px solid #000',
                borderRadius:12,
                fontSize:15,
                fontWeight:600,
                cursor:'pointer',
                transition:'opacity .2s ease',
                marginBottom:12
              }}
              onMouseOver={e=>(e.currentTarget.style.opacity='0.7')}
              onMouseOut={e=>(e.currentTarget.style.opacity='1')}
            >
              参加中
            </button>

            <button 
              onClick={()=>dispatch(navigate('groupChat'))}
              style={{ 
                width:'100%',
                padding:'14px',
                background:'#000',
                color:'#fff',
                border:'none',
                borderRadius:12,
                fontSize:15,
                fontWeight:600,
                cursor:'pointer',
                transition:'opacity .2s ease'
              }}
              onMouseOver={e=>(e.currentTarget.style.opacity='0.85')}
              onMouseOut={e=>(e.currentTarget.style.opacity='1')}
            >
              会話を見る
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default CommunityDetailScreen;
