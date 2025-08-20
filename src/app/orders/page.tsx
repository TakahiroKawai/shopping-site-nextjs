'use client';

import { useEffect, useState } from 'react';

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">注文履歴</h1>
      {orders.length === 0 ? (
        <p>注文履歴はありません。</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-6 border border-gray-200 p-4 rounded shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold mb-2">注文日: {order.date}</h2>
            <ul className="mb-2 space-y-1">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <p className="text-right font-bold">合計金額: ${order.total.toLocaleString()}</p>
          </div>
        ))
      )}
    </main>
  );
}
