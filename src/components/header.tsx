'use client';

import React from "react";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('テスト用のエラーです');
  }

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between items-center px-6 gap-4">
        <Link href="/" className="content-center hover:underline">ホーム</Link>
        <Link href="/about" className="content-center hover:underline">このサイトについて</Link>
        {
          !session && (
            <Link href="/login" className="content-center hover:underline">ログイン</Link>
        )}
        {session && (
          <>
            <Link href="/profile" className="content-center hover:underline">プロフィール</Link>
            <Link href="/favorites" className="content-center hover:underline">お気に入り一覧</Link>
            <Link href="/cart" className="content-center hover:underline">カートを見る</Link>
            <Link href="/orders" className="content-center hover:underline">注文履歴</Link>
            <Link href="/logout" className="content-center hover:underline">ログアウト</Link>
          </>
        )}
        <button onClick={() => setShouldError(true)} className="ml-auto mr-0 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition">
          エラーを発生させる
        </button>
        <Link href="/test" className="content-center hover:underline">試験的機能ページ</Link>
      </nav>
    </header>
  );
}