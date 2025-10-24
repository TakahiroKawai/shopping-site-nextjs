'use client';

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type UserProfile = {
  name: string;
  age: string;
  address: string;
  profileImageUrl: string;
};

export default function EditProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    address: "",
    profileImageUrl: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      if (!session?.user?.email) return;
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        if (data) setProfile({
          name: session.user.name ?? "",
          age: data.age ?? "",
          address: data.address ?? "",
          profileImageUrl: data.profileImageUrl ?? session.user.image ?? "",
        });
      }
    }
    load();
  }, [session]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">プロフィール編集</h1>
      <form onSubmit={handleSave} className="flex flex-col gap-2">
        <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="名前" />
        <input value={profile.age} onChange={e => setProfile({ ...profile, age: e.target.value })} placeholder="年齢" />
        <input value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })} placeholder="住所" />
        <input value={profile.profileImageUrl} onChange={e => setProfile({ ...profile, profileImageUrl: e.target.value })} placeholder="画像URL" />
        <button type="submit" disabled={saving} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
          {saving ? "保存中..." : "保存"}
        </button>
      </form>
    </div>
  );
}
