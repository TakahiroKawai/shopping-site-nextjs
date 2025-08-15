export type FakeProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type PaginationDataType = {
  products: FakeProductType[];
  total: number;
  totalPages: number;
};

export const fetchPaginationData = async (page: number, limit: number): Promise<PaginationDataType> => {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const products = await res.json();

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    products: products.slice(start, end),
    total: products.length,
    totalPages: Math.ceil(products.length / limit),
  };
};
