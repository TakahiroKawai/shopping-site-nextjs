'use client';

interface Review {
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-gray-500">まだレビューはありません。</p>;
  }

  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-lg font-semibold">レビュー一覧</h3>
      {reviews.map((review, index) => (
        <div key={index} className="p-4 border rounded bg-white shadow-sm">
          <p className="font-bold">{review.userName}</p>
          <p className="text-yellow-500">評価: {review.rating} / 5</p>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
