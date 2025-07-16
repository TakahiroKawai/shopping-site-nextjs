import '../styles/globals.css'

import Head from 'next/head';
import Image from 'next/image';
import products from '@/data/products';
import Header from '@/components/header';
import Footer from '@/components/footer';

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
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="font-bold mt-1">¥{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer/>
    </>
  );
}
