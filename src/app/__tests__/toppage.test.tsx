import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Home from "@/app/page";
import * as api from "@/app/lib/api";

jest.mock("@/components/header", () => {
  const MockHeader = () => <header>HeaderMock</header>;
  MockHeader.displayName = "MockHeader";
  return MockHeader;
});
jest.mock("@/components/footer", () => {
  const MockFooter = () => <footer>FooterMock</footer>;
  MockFooter.displayName = "MockFooter";
  return MockFooter;
});
jest.mock("@/components/products", () => {
  type ProductsProps = { products: { id: number; title: string }[] };
  function MockProducts({ products }: ProductsProps) {
    return <div>ProductsMock: {products.length}</div>;
  }
  MockProducts.displayName = "MockProducts";
  return MockProducts;
});
jest.mock("@/components/pagination", () => {
  type PaginationProps = { currentPage: number; totalPages: number; limit: number };
  function MockPagination({ currentPage, totalPages, limit }: PaginationProps) {
    return <div>PaginationMock: {currentPage}/{totalPages} (limit:{limit})</div>;
  }
  MockPagination.displayName = "MockPagination";
  return MockPagination;
});

jest.spyOn(api, "fetchPaginationData").mockResolvedValue({
  products: [
    {
      id: 1,
      title: "商品A",
      price: 1000,
      description: "商品Aの説明",
      category: "カテゴリA",
      image: "https://example.com/imageA.jpg",
      rating: { rate: 4.5, count: 10 }
    },
    {
      id: 2,
      title: "商品B",
      price: 2000,
      description: "商品Bの説明",
      category: "カテゴリB",
      image: "https://example.com/imageB.jpg",
      rating: { rate: 4.0, count: 8 }
    }
  ],
  total: 2,
  totalPages: 3
});

describe("Home page", () => {
  it("ヘッダー・フッター・商品・ページネーションが表示される", async () => {
    const jsx = await Home({ searchParams: { page: "2", limit: "2" } });
    render(jsx as React.ReactElement);

    expect(await screen.findByText(/HeaderMock/)).toBeInTheDocument();
    expect(await screen.findByText(/FooterMock/)).toBeInTheDocument();
    expect(await screen.findByText(/ProductsMock: 2/)).toBeInTheDocument();
    expect(await screen.findByText(/PaginationMock: 2\/3 \(limit:2\)/)).toBeInTheDocument();
  });
});