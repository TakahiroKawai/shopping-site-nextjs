'use client';

import AuthButton from '@/components/authbutton'
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex gap-4">
        <Link href="/" className="hover:underline">ホーム</Link>
        <Link href="/about" className="hover:underline">このサイトについて</Link>
        <AuthButton/>
        {session && (
          <>
            <Link href="/profile" className="hover:underline">プロフィール</Link>
            <Link href="/cart" className="hover:underline">カートを見る</Link>
            <Link href="/orders" className="over:underline">注文履歴</Link>
          </>
        )}
      </nav>
    </header>
  );
}