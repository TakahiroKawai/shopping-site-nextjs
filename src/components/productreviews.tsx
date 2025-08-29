'use client'

import { useState, useEffect, useCallback } from 'react'
import ReviewForm from './reviewform'
import ReviewList from './reviewlist'

interface Review {
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([])

  const loadReviews = useCallback(() => {
    const stored = localStorage.getItem(`reviews-${productId}`)
    if (stored) {
      setReviews(JSON.parse(stored))
    } else {
      setReviews([])
    }
  }, [productId])

  useEffect(() => {
    loadReviews()
  }, [loadReviews])

  return (
    <div>
      <h2 className="text-xl font-semibold mt-8 mb-4">レビュー</h2>
      <ReviewForm productId={productId} onReviewSubmitted={loadReviews}/>
      <ReviewList reviews={reviews} />
    </div>
  )
}
