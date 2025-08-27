'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type UserProfile = {
  name: string;
  age: string;
  address: string;
  profileImageUrl: string;
};

export default function EditProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: '',
    address: '',
    profileImageUrl: '',
  });

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('プロフィールを保存しました');
    router.push('/profile');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">プロフィール編集</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="名前" className="w-full border p-2 rounded"/>
        <input type="number" name="age" value={profile.age} onChange={handleChange} placeholder="年齢" className="w-full border p-2 rounded"/>
        <input type="text" name="address" value={profile.address} onChange={handleChange} placeholder="住所" className="w-full border p-2 rounded"/>
        <input type="text" name="profileImageUrl" value={profile.profileImageUrl} onChange={handleChange} placeholder="プロフィール画像URL" className="w-full border p-2 rounded"/>
        {profile.profileImageUrl && (
          <Image src={profile.profileImageUrl} width={100} height={100} alt="preview" className="w-32 h-32 object-cover rounded-full mx-auto" />
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          保存
        </button>
      </form>
    </div>
  );
}
