'use client';

import AuthButton from "@/components/authbutton";
import FirebaseAuthButton from "@/components/firebaseauthbutton";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5f6fa]">
      <div className="flex gap-8 flex-wrap">
        <div className="bg-white p-8 rounded-xl shadow-lg min-w-[320px] flex flex-col items-center">
          <h3 className="text-lg mb-6">メールアドレスとパスワードでログイン</h3>
          <FirebaseAuthButton />
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg min-w-[320px] flex flex-col items-center">
          <h3 className="text-lg mb-6">GitHubでログイン</h3>
          <AuthButton />
        </div>
      </div>
    </div>
  );
}