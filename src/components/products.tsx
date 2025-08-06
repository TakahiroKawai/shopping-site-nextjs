'use client';

import Image from 'next/image';
import Link from 'next/link';
import Modal from '@/components/modal'
import { FakeProductType } from '@/app/lib/api';
import { useState } from 'react';
import { useCart } from '@/context/cart';

type ProductProps = {
  products: FakeProductType[];
};

export default function Products({ products }: ProductProps) {
    const [showMessage] = useState(false);

    const { addToCart } = useCart();
    const [showModal, setShowModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<FakeProductType>()

    const handleConfirm = () => {
        if (selectedProduct) {
            addToCart({ id: selectedProduct.id, name: selectedProduct.title, price: selectedProduct.price, image: selectedProduct.image, quantity: 1 })
        }
        setShowModal(false)
        setSelectedProduct(selectedProduct)
    }
    
    const handleAddToCart = (product: FakeProductType) => {
        setSelectedProduct(product)
        setShowModal(true)
    }

    return (
        <>
            {showMessage && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition">
                商品をカートに追加しました
                </div>
            )}

            <h1 className="text-2xl font-bold mb-4">商品一覧</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                <div key={product.id} className="border rounded shadow-sm p-4">
                    <Image src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" width={300} height={300} priority/>
                    <Link href={`/products/${product.id}`}>
                    <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                        {product.title}
                    </h2>
                    </Link>
                    <button onClick={() => handleAddToCart(product)} className="w-full mt-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md">
                        カートに追加
                    </button>
                </div>
                ))}
            </div>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={handleConfirm} title="カートに追加" message="この商品をカートに追加しますか？" confirmText="追加する"/>
        </>
  );
}