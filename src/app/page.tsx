import '../styles/globals.css'

import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Products from '@/components/products';
import { fetchProducts } from '@/app/lib/api';

export default async function Home() {
  const fakeProducts = await fetchProducts();

  return (
    <>
      <Head>
        <title>ショッピングサイト</title>
      </Head>

      <Header />
      <main className="max-w-6xl mx-auto p-4">
        <Products products={fakeProducts}/>
      </main>
      <Footer/>
    </>
  );
}
