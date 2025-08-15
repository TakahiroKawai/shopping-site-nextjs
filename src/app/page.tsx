import '../styles/globals.css'

import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Products from '@/components/products';
import Pagination from '@/components/pagination';
import { fetchPaginationData } from '@/app/lib/api';

export default async function Home({ searchParams }: { searchParams?: { page?: string, limit?: string }; }) {
  const params = await searchParams;
  const page = Number(params?.page || '1');
  const limit = Number(params?.limit || '4');
  const fakePaginationData = await fetchPaginationData(page, limit);

  return (
    <>
      <Head>
        <title>ショッピングサイト</title>
      </Head>

      <Header/>
      <main className="max-w-6xl mx-auto p-4">
        <Products products={fakePaginationData.products}/>
        <Pagination currentPage={page} totalPages={fakePaginationData.totalPages} limit={limit}/>
      </main>
      <Footer/>
    </>
  );
}
