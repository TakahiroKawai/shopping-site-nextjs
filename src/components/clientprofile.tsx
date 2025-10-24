'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import type { Profile as DbProfile } from "@prisma/client";

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
  profileImageUrl: "/default-profile.png",
};

export default function ClientProfile({ session }: { session: Session | null }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const email = session?.user?.email ?? "";

  useEffect(() => {
    async function load() {
      if (email) {
        try {
          const res = await fetch(`/api/profile?email=${encodeURIComponent(email)}`);
          if (res.ok) {
            const data: DbProfile | null = await res.json();
            if (data) {
              setProfile({
                name: session?.user?.name ?? DEFAULT_PROFILE.name,
                age: data.age ?? DEFAULT_PROFILE.age,
                address: data.address ?? DEFAULT_PROFILE.address,
                profileImageUrl: data.profileImageUrl ?? (session?.user?.image ?? DEFAULT_PROFILE.profileImageUrl),
              });
              return;
            }
          }
        } catch (e) {
          console.error("failed to fetch profile", e);
        }
      }

      const stored = localStorage.getItem("userProfile");
      if (stored) {
        setProfile(JSON.parse(stored));
      } else {
        localStorage.setItem("userProfile", JSON.stringify(DEFAULT_PROFILE));
        setProfile(DEFAULT_PROFILE);
      }
    }

    load();
  }, [email, session]);

  useEffect(() => {
    async function ensureServer() {
      if (!profile || !email) return;
      try {
        await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name: profile.name,
            age: profile.age,
            address: profile.address,
            profileImageUrl: profile.profileImageUrl,
          }),
        });
      } catch (e) {
        console.error("failed to upsert profile", e);
      }
    }
    ensureServer();
  }, [profile, email]);

  if (!profile) return <p>プロフィール情報が見つかりません</p>;

  const user = {
    name: profile.name,
    email,
    age: profile.age,
    address: profile.address,
    image: profile.profileImageUrl || "/default-profile.png",
  };

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
