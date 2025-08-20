import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { handler } from "../api/auth/[...nextauth]/route";
import { Session } from "next-auth";

export default async function ProfilePage() {
  const session : Session | null = await getServerSession(handler);

  if (!session) {
    redirect("/");
  }

  const user = {
    ...session.user,
    age: 30,
    address: "東京都渋谷区○○ 1-2-3",
    image: "/default-profile.png",
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">プロフィール</h1>
      <Image src={user.image} width={100} height={100} alt="プロフィール画像" className="w-24 h-24 rounded-full mb-4 object-cover" />
      <p><strong>名前:</strong> {user.name}</p>
      <p><strong>メール:</strong> {user.email}</p>
      <p><strong>年齢:</strong> {user.age}</p>
      <p><strong>住所:</strong> {user.address}</p>
    </div>
  );
}
