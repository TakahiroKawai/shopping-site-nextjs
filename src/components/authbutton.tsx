'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <button onClick={() => signOut()} className="hover:underline">ログアウト</button>
  ) : (
    <button onClick={() => signIn()} className="hover:underline">ログイン</button>
  );
}
