'use client';

import '../styles/globals.css'

import Head from 'next/head';
import Image from 'next/image';
import products from '@/data/products';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/cart';

export const metadata = {
  title: 'ショッピングサイト｜トップページ',
  description: '人気商品を揃えたオンラインショッピングサイトです。',
  openGraph: {
    title: 'ショッピングサイト｜トップページ',
    description: '人気商品を揃えたオンラインショッピングサイトです。',
    url: 'https://aiqveone-test-shopping-domain.com/',
    siteName: 'ショッピングサイト',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_image',
    title: 'ショッピングサイト',
    description: '人気商品を揃えたオンラインショッピングサイトです。',
  },
};


export default function Home() {
  const [showMessage, setShowMessage] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = (product: typeof products[number]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);

  };

  return (
    <>
      <Head>
        <title>ショッピングサイト</title>
      </Head>

      <Header />
      <main className="max-w-6xl mx-auto p-4">
        {showMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition">
            商品をカートに追加しました
          </div>
        )}
        <h1 className="text-2xl font-bold mb-4">商品一覧</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded shadow-sm p-4">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-2"
                width={300}
                height={300}
              />
              <Link href={`/products/${product.id}`}>
                <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                  {product.name}
                </h2>
              </Link>
              <button onClick={() => handleAddToCart(product)} className="w-full mt-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md">
                カートに追加
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer/>
    </>
  );
}
