import Image from 'next/image';
import ProductReviews from '@/components/productreviews';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchProductData } from '@/app/lib/api';
import FavoriteButton from '@/components/favritebutton';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params } : Props): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductData(id);

  if (!product) {
    return {
      title: '商品が見つかりません',
      description: '指定された商品は存在しません',
    };
  }

  return {
    title: `${product.title} | 商品詳細`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    }
  };
}

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  const product = await fetchProductData(id);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <Image src={product.image} alt={product.title} width={400} height={300} className="w-64 h-auto mb-4 object-contain"/>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="font-bold text-lg">{product.price}円</p>
        <FavoriteButton product={product}/>
      </div>
      <ProductReviews productId={String(product.id)}/>
    </>
  );
}
