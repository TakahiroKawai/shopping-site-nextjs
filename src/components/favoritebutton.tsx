'use client';

import { useEffect, useState } from 'react';
import { FakeProductType } from '@/app/lib/api';

export default function FavoriteButton({ product }: { product: FakeProductType }) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(product.id));
  }, [product.id]);

  const saveFavorite = (item: FakeProductType) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updated = [...favorites, item];
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const removeFavorite = (id: number) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updated = favorites.filter((item: FakeProductType) => item.id !== id);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (id: number) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some((item: FakeProductType) => item.id === id);
  };

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(product.id);
    } else {
      saveFavorite(product);
    }
    setFavorited(!favorited);
  };

  return (
    <button onClick={toggleFavorite} className="text-2xl hover:scale-110 transition-transform duration-200" aria-label={favorited ? 'お気に入り解除' : 'お気に入り追加'}>
      {favorited ? '❤️' : '🤍'}
    </button>
  );
}
