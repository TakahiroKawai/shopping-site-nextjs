import { notFound } from 'next/navigation';
import Products from '@/data/products';
import Image from 'next/image';
import { Metadata } from 'next';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = Number(params.id);
  const product = Products.find((p) => p.id === productId);

  if (!product) {
    return {
      title: '商品が見つかりません',
      description: '指定された商品は存在しません',
    };
  }

  return {
    title: `${product.name} | 商品詳細`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    }
  };
}

export default async function ProductDetail({ params }: Props) {
  const { id } = await params
  const productId = Number(id);
  const product = Products.find((p) => p.id === productId);

  if (!product) {
    return notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <Image src={product.image} alt={product.name} width={400} height={300} className="w-64 h-auto mb-4 object-contain"/>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="font-bold text-lg">{product.price}円</p>
    </div>
  );
}
