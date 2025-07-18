'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4 text-red-600">404</h1>
      <p className="text-lg mb-6">お探しのページは見つかりませんでした。</p>
      <Link href="/" className="text-blue-600 hover:underline">
        トップページに戻る
      </Link>
    </div>
  );
}
