import type { NextApiRequest, NextApiResponse } from 'next';

import Products from '@/data/products';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(Products);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
