'use client';

import { useRouter } from "next/navigation";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
import { firebaseApp } from "@/firebaseConfig";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const firebaseAuth = getAuth(firebaseApp);
    firebaseSignOut(firebaseAuth).catch(() => {});

    nextAuthSignOut({ redirect: false });

    router.push("/");
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg font-bold">ログアウト中...</div>
    </div>
  );
}