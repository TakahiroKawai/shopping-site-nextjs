import '../styles/globals.css'

import Head from 'next/head';
import Image from 'next/image';
import products from '@/data/products';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>ショッピングサイト</title>
      </Head>

      <Header />
      <main className="max-w-6xl mx-auto p-4">
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
            </div>
          ))}
        </div>
      </main>
      <Footer/>
    </>
  );
}
