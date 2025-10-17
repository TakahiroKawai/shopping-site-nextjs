'use client';

import React from "react";
import Link from "next/link";
import StripeCheckoutButton from "@/components/stripecheckout";

export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">テスト用の機能をまとめたページ</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">分析・チャート</h2>
        <p className="text-sm text-gray-600 mb-2">売上チャートを表示します。</p>
        <Link href="/sales" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          売上チャートへ
        </Link>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">データベース</h2>
        <p className="text-sm text-gray-600 mb-2">データベースから商品情報を取得して表示します。</p>
        <Link href="/database" className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          データベースへ
        </Link>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Stripe決済リンク</h2>
        <p className="text-sm text-gray-600 mb-2">カード決済を行うページを表示します。 (実際に決済は行われません)</p>
        <StripeCheckoutButton />
      </section>
    </div>
  );
}