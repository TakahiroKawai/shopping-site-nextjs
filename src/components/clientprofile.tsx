'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Session } from "next-auth";

type UserProfile = {
  name: string;
  age: string;
  address: string;
  profileImageUrl: string;
};

const DEFAULT_PROFILE: UserProfile = {
  name: "ゲストユーザー",
  age: "20",
  address: "東京都",
  profileImageUrl: "/default-profile.png"
};

export default function ClientProfile({ session }: { session: Session }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      setProfile(JSON.parse(stored));
    }
    else {
      localStorage.setItem('userProfile', JSON.stringify(DEFAULT_PROFILE));
      setProfile(DEFAULT_PROFILE);
    }
  }, []);

  if (!profile) return <p>プロフィール情報が見つかりません</p>;

  const user = {
    name: profile.name,
    email: session.user?.email,
    age: profile.age,
    address: profile.address,
    image: profile.profileImageUrl || "/default-profile.png",
  };

  console.log(session)

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">プロフィール</h1>
      <Image src={user.image} width={100} height={100} alt="プロフィール画像" className="w-24 h-24 rounded-full mb-4 object-cover" />
      <p><strong>名前:</strong> {user.name}</p>
      <p><strong>メール:</strong> {user.email}</p>
      <p><strong>年齢:</strong> {user.age}</p>
      <p><strong>住所:</strong> {user.address}</p>
      <Link href="/profile/edit">
        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          編集する
        </button>
      </Link>
    </div>
  );
}
