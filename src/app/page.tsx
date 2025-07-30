'use client';

import '../styles/globals.css'

import Head from 'next/head';
import Image from 'next/image';
import Products from '@/data/products';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import Modal from '@/components/modal'
import { ProductType } from '@/data/products';
import { useState } from 'react';
import { useCart } from '@/context/cart';

export default function Home() {
  const [showMessage] = useState(false);

  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductType>()

  const handleAddToCart = (product: ProductType) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const handleConfirm = () => {
    if (selectedProduct) {
      addToCart({ ...selectedProduct, quantity: 1 })
    }
    setShowModal(false)
    setSelectedProduct(selectedProduct)
  }

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
          {Products.map((product) => (
            <div key={product.id} className="border rounded shadow-sm p-4">
              <Image src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" width={300} height={300} priority/>
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
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={handleConfirm} title="カートに追加" message="この商品をカートに追加しますか？" confirmText="追加する"/>
      </main>
      <Footer/>
    </>
  );
}
