'use client';

import Image from 'next/image';
import Link from 'next/link';
import Modal from '@/components/modal';
import { FakeProductType } from '@/app/lib/api';
import { useState, useMemo } from 'react';
import { useCart } from '@/context/cart';
import { useFavorite } from '@/context/favoritecontext';

type ProductProps = {
  products: FakeProductType[];
};

export default function Products({ products }: ProductProps) {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorite();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FakeProductType>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleConfirm = () => {
    if (selectedProduct) {
      addToCart({
        id: selectedProduct.id,
        name: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.image,
        quantity: 1,
      });
    }
    setShowModal(false);
    setSelectedProduct(undefined);
  };

  const handleAddToCart = (product: FakeProductType) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((p) =>
        p.title.toLowerCase().includes(searchKeyword.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
  }, [products, searchKeyword, sortOrder]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="商品名で検索" className="px-4 py-2 border rounded w-full md:w-1/3"/>
        <button onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          価格順: {sortOrder === 'asc' ? '昇順' : '降順'}
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">商品一覧</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAndSortedProducts.map((product) => {
          const isFavorite = favorites.includes(product.id);

          return (
          <div key={product.id} className="border rounded shadow-sm p-4 min-h-[360px] flex flex-col justify-between">
            <div className="w-full h-[250px] flex items-center justify-center mt-2 mb-4">
                <Image src={product.image} alt={product.title} className="object-contain max-h-full" width={300} height={300} style={{ objectFit: 'contain' }} priority/>
            </div>
            <Link href={`/products/${product.id}`}>
              <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                {product.title}
              </h2>
            <span className="text-gray-700 text-sm ml-2">
                ${product.price.toLocaleString()}
            </span>
            </Link>
            <button onClick={() => handleAddToCart(product)} className="w-full mx-auto mt-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md">
              カートに追加
            </button>
            <button onClick={() => toggleFavorite(product.id)}>
              {isFavorite ? '❤️ お気に入り解除' : '🤍 お気に入り'}
            </button>
          </div>
          );
        })}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={handleConfirm} title="カートに追加" message="この商品をカートに追加しますか？" confirmText="追加する"/>
    </>
  );
}
