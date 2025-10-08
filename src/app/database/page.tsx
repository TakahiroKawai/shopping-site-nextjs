import prisma from "@/script/prismaclient";
import Products from "@/components/products";
import { FakeProductType } from "../lib/api";
import { ProductType } from "@/data/products";

function convertToFakeProductType(products: ProductType[]): FakeProductType[] {
  return products.map((p) => ({
    id: p.id,
    title: p.name,
    price: p.price,
    description: p.description,
    category: p.category,
    image: p.image,
    rating: {
      rate: 0,
      count: 0,
    },
  }));
}

export default async function ProductsPage() {
  const dbProducts: ProductType[] = await prisma.product.findMany();
  const products: FakeProductType[] = convertToFakeProductType(dbProducts);

  return (
    <div>
      <h1>商品一覧</h1>
      <Products products={products} />
    </div>
  );
}