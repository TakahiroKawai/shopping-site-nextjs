"use client";

import { useState } from 'react'
import { useCart } from "@/context/cart";
import Modal from '@/components/modal'
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const [showModal, setShowModal] = useState(false)
  const [targetId, setTargetId] = useState<number | null>(null)

  const handleClickDelete = (id: number) => {
    setTargetId(id)
    setShowModal(true)
  }

  const handleConfirm = () => {
    if (targetId !== null) {
      removeFromCart(targetId)
    }
    setShowModal(false)
    setTargetId(null)
  }

  const handlePlaceOrder = () => {
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total,
      date: new Date().toISOString()
    };
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    clearCart();
    alert("ご注文が確定しました！");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">カートの中身</h1>

      {cartItems.length === 0 ? (
        <p>カートは空です。</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 border p-4 rounded-md">
              <Image src={item.image} alt={item.name} width={100} height={100} className="rounded w-[100px] h-[100px] object-contain" style={{ objectFit: "contain" }}/>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>価格: ${item.price.toLocaleString()}</p>
                <p>数量: {item.quantity}</p>
              </div>
              <button className="bg-red-500 text-white px-4 py-1 rounded mt-2 sm:mt-0" onClick={() => handleClickDelete(item.id)}>
                削除
              </button>
            </div>
          ))}

          <div className="text-right font-bold text-xl mt-4">
            合計: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6 justify-end">
            <button onClick={clearCart} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded w-auto md:w-auto">
              カートを空にする
            </button>

            <button onClick={handlePlaceOrder} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded w-auto md:w-auto">
              注文を確定する
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link href="/" className="text-blue-500 hover:underline">
          商品一覧に戻る
        </Link>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={handleConfirm} title="削除の確認" message="この商品をカートから削除しますか？" confirmText="削除する"/>
    </div>
  );
}
