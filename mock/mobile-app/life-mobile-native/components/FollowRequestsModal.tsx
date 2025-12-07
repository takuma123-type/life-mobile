import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, View, Text, TouchableOpacity, Image } from 'react-native';

type Request = { id: string; name: string; ageLabel?: string; message?: string; avatar?: string };

type Props = {
  visible: boolean;
  requests: Request[];
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

export default function FollowRequestsModal({ visible, requests, onClose, onApprove, onReject }: Props) {
  const backdrop = useRef(new Animated.Value(0)).current;
  const sheetY = useRef(new Animated.Value(80)).current;
  const [confirm, setConfirm] = useState<{ type: 'approve' | 'reject'; id: string } | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const targetName = useMemo(() => {
    if (!confirm) return '';
    const t = requests.find(r => r.id === confirm.id);
    return t?.name ?? '';
  }, [confirm, requests]);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdrop, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.spring(sheetY, { toValue: 0, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdrop, { toValue: 0, duration: 160, useNativeDriver: true }),
        Animated.timing(sheetY, { toValue: 80, duration: 160, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={{ position: 'absolute', inset: 0, justifyContent: 'flex-end' }}>
      <Animated.View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', opacity: backdrop }} />
      <Animated.View
        style={{
          transform: [{ translateY: sheetY }],
          backgroundColor: '#fff',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingBottom: 24,
          maxHeight: '88%',
        }}
      >
        <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderColor: '#e5e7eb', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={onClose} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: '#eaf5ff' }}>
            <Text style={{ color: '#1e9afc', fontWeight: '700' }}>× 閉じる</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>フレンド申請</Text>
          <View style={{ width: 60 }} />
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 14 }}>
          <View style={{ alignSelf: 'flex-start', backgroundColor: '#eef2f7', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6, marginBottom: 12 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#334155' }}>{requests.length}件の申請</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          {requests.map((r) => (
            <View key={r.id} style={{ marginBottom: 12, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', padding: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center', marginRight: 12, overflow: 'hidden' }}>
                  {r.avatar ? (
                    <Image source={{ uri: r.avatar }} style={{ width: 56, height: 56 }} />
                  ) : (
                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#f1f5f9' }} />
                  )}
                </View>
                <TouchableOpacity onPress={() => setPreviewId(r.id)} style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>{r.name}</Text>
                    {r.ageLabel && (
                      <View style={{ marginLeft: 8, backgroundColor: '#eaf5ff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 }}>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#1e9afc' }}>{r.ageLabel}</Text>
                      </View>
                    )}
                  </View>
                  {!!r.message && <Text style={{ marginTop: 6, fontSize: 13, color: '#4b5563' }}>{r.message}</Text>}
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
                <TouchableOpacity onPress={() => setConfirm({ type: 'approve', id: r.id })} style={{ flex: 1, height: 44, borderRadius: 12, backgroundColor: '#1e9afc', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 15, fontWeight: '800' }}>承認</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setConfirm({ type: 'reject', id: r.id })} style={{ flex: 1, height: 44, borderRadius: 12, borderWidth: 1, borderColor: '#d9dee8', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#334155', fontSize: 15, fontWeight: '800' }}>拒否</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {requests.length === 0 && (
            <View style={{ borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#f8fafc', borderRadius: 16, paddingVertical: 40, alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ color: '#64748b' }}>フレンド申請はありません</Text>
            </View>
          )}
        </View>
      </Animated.View>

      {/* 確認ダイアログ（中央） */}
      {confirm && (
        <View style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'rgba(0,0,0,0.45)', position: 'absolute', inset: 0 }} />
          <View style={{ width: '90%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 18, paddingVertical: 18, paddingHorizontal: 16, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 16, shadowOffset: { width: 0, height: 10 } }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#0f172a', textAlign: 'center', marginBottom: 8 }}>申請を{confirm.type === 'approve' ? '承認' : '拒否'}しますか？</Text>
            <Text style={{ fontSize: 14, color: '#475569', textAlign: 'center', marginBottom: 16 }}>{targetName}さんのフレンド申請を{confirm.type === 'approve' ? '承認' : '拒否'}しようとしています。</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity onPress={() => setConfirm(null)} style={{ flex: 1, height: 44, borderRadius: 12, borderWidth: 2, borderColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 15, fontWeight: '800', color: '#0f172a' }}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (!confirm) return;
                  if (confirm.type === 'approve') onApprove(confirm.id);
                  else onReject(confirm.id);
                  setConfirm(null);
                  setToast({ type: confirm.type === 'approve' ? 'success' : 'danger', message: `${targetName}さんの申請を${confirm.type === 'approve' ? '承認' : '拒否'}しました` });
                }}
                style={{ flex: 1, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: confirm.type === 'approve' ? '#0EA5E9' : '#e11d48', shadowColor: confirm.type === 'approve' ? '#0EA5E9' : '#e11d48', shadowOpacity: 0.25, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }}
              >
                <Text style={{ fontSize: 15, fontWeight: '800', color: '#fff' }}>{confirm.type === 'approve' ? '承認する' : '拒否する'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* トースト通知 */}
      {toast && (
        <View style={{ position: 'absolute', left: '50%', transform: [{ translateX: -180 }], bottom: 22, width: 360, maxWidth: '90%', backgroundColor: toast.type === 'success' ? '#0EA5E9' : '#e11d48', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 999, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }}>
          <Text style={{ color: '#fff', fontWeight: '800' }}>{toast.message}</Text>
        </View>
      )}

      {/* 簡易プロフィールプレビュー */}
      {previewId && (
        <View style={{ position: 'absolute', inset: 0, justifyContent: 'flex-end' }}>
          <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
          <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingVertical: 18, paddingHorizontal: 16 }}>
            {(() => {
              const u = requests.find(r => r.id === previewId);
              if (!u) return null;
              return (
                <View>
                  <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 8 }}>{u.name}</Text>
                  <Text style={{ fontSize: 13, color: '#334155', marginBottom: 12 }}>{u.ageLabel ?? ''}</Text>
                  {!!u.message && <Text style={{ fontSize: 14, color: '#334155', lineHeight: 22 }}>{u.message}</Text>}
                  <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
                    <TouchableOpacity onPress={() => setPreviewId(null)} style={{ flex: 1, height: 44, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontWeight: '800', color: '#0f172a' }}>閉じる</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPreviewId(null)} style={{ flex: 1, height: 44, borderRadius: 12, backgroundColor: '#0EA5E9', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontWeight: '800', color: '#fff' }}>申請画面へ戻る</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })()}
          </View>
        </View>
      )}
    </View>
  );
}
