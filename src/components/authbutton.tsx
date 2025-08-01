'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <button onClick={() => signOut()}>ログアウト</button>
  ) : (
    <button onClick={() => signIn()}>ログイン</button>
  );
}
