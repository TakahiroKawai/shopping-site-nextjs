'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FakeProductType } from '../lib/api';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FakeProductType[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  if (favorites.length === 0) {
    return <p className="mt-4">お気に入り商品はまだありません。</p>;
  }

  return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">♡ お気に入り商品一覧</h1>
        {favorites.length === 0 ? (
            <p className="text-center text-gray-500">お気に入りに登録された商品はありません。</p>
            ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {favorites.map((item) => (
                <div key={item.id} className="border p-4 rounded shadow">
                <Image src={item.image} alt={item.title} className="w-full h-40 object-contain" width={100} height={100}/>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">¥{item.price}</p>
                </div>
            ))}
        </div>
        )}
    </div>
  );
}
