"use client";

import { useCart } from "@/context/cart";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, clearCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">カートの中身</h1>

      {cartItems.length === 0 ? (
        <p>カートは空です。</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border p-4 rounded-md">
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>価格: ¥{item.price.toLocaleString()}</p>
                <p>数量: {item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-xl mt-4">
            合計: ¥
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toLocaleString()}
          </div>
        </div>
      )}

      <button onClick={clearCart} className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        カートを空にする
      </button>

      <div className="mt-6">
        <Link href="/" className="text-blue-500 hover:underline">
          商品一覧に戻る
        </Link>
      </div>
    </div>
  );
}
