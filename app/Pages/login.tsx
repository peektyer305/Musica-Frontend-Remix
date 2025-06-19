// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '~/utils/supabase/client';

export default function LoginPage()  {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      // ログイン成功 → / about ページへリダイレクト
      console.log('ログイン成功');
      supabase.auth.getUser().then(({ data }) => {
        console.log('ログインユーザー:', data.user);
        const email = data?.user?.email;
        if (email) {
          //e-mailをバックエンドのデータベースでユーザーを検索するのに使いたいから保存
          localStorage.setItem('userEmail', email);
          console.log('ログインユーザーのメールアドレス:', email);
        }
      });
      const {data: {session}} = await supabase.auth.getSession();
        console.log('セッション情報:', session);
      const res = await fetch('http://localhost:8080/me', {
        headers: {
            'Authorization': `Bearer ${session?.access_token}`,
            },
        });
        if (!res.ok) {
            console.error('ユーザーデータの取得に失敗:', res.statusText);
            setErrorMsg('ユーザーデータの取得に失敗しました。');
            return;
            }
        const userData = await res.json();
        console.log('ユーザーデータ:', userData);
      navigate("/about", { replace: true });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            メールアドレス<br/>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            パスワード<br/>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </label>
        </div>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'ログイン中…' : 'ログイン'}
        </button>
      </form>
    </div>
  );
};
