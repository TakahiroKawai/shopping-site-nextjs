'use client';

import { CartProvider } from '@/context/cart';
import { SessionProvider } from "next-auth/react";
import { FavoriteProvider } from '@/context/favoritecontext';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider><CartProvider><FavoriteProvider>{children}</FavoriteProvider></CartProvider></SessionProvider>
}
