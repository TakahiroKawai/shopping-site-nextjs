import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import ReviewList from "@/components/reviewlist";

interface Review {
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

describe("ReviewList", () => {
  test("shows placeholder when no reviews", () => {
    render(<ReviewList reviews={[]} />);
    expect(screen.getByText("まだレビューはありません。")).toBeInTheDocument();
  });

  test("renders list of reviews with name, rating and comment", () => {
    const reviews: Review[] = [
      {
        productId: "1",
        userName: "山田太郎",
        rating: 5,
        comment: "とても良い商品でした。",
        date: "2025-10-31",
      },
      {
        productId: "1",
        userName: "佐藤花子",
        rating: 3,
        comment: "普通でした。",
        date: "2025-10-30",
      },
    ];

    render(<ReviewList reviews={reviews} />);

    expect(screen.getByText("山田太郎")).toBeInTheDocument();
    expect(screen.getByText("評価: 5 / 5")).toBeInTheDocument();
    expect(screen.getByText("とても良い商品でした。")).toBeInTheDocument();

    expect(screen.getByText("佐藤花子")).toBeInTheDocument();
    expect(screen.getByText("評価: 3 / 5")).toBeInTheDocument();
    expect(screen.getByText("普通でした。")).toBeInTheDocument();
  });
});