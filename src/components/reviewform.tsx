'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react'

interface Review {
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewSubmitted }) => {
  const { data: session } = useSession()
  const user = session?.user

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!session) {
    return <p className="text-gray-600">レビューを投稿するにはログインしてください。</p>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert('コメントを入力してください。');
      return;
    }

    const newReview: Review = {
      productId: productId,
      userName: user?.name || "",
      rating,
      comment,
      date: new Date().toISOString(),
    };

    const key = `reviews-${productId}`;
    const existing = localStorage.getItem(key);
    const reviews = existing ? JSON.parse(existing) : [];
    reviews.push(newReview);
    localStorage.setItem(key, JSON.stringify(reviews));

    setRating(5);
    setComment('');

    onReviewSubmitted();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded space-y-4">
      <div>
        <label className="block mb-1 text-sm font-semibold">評価（★）</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full p-2 border rounded">
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {'★'.repeat(star)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold">コメント</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-2 border rounded" rows={4}/>
      </div>

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
        レビューを投稿
      </button>
    </form>
  );
};

export default ReviewForm;
