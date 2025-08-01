'use client';

import { CartProvider } from '@/context/cart';
import { SessionProvider } from "next-auth/react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider><CartProvider>{children}</CartProvider></SessionProvider>
}
