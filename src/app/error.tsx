'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('500 error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-8">
      <h1 className="text-4xl font-bold mb-4">エラーが発生しました</h1>
      <p className="mb-6">もう一度お試しください。または後で再度アクセスしてください。</p>
      <button onClick={() => reset()} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        再読み込み
      </button>
    </div>
  );
}
