import { useEffect, useState } from "react";
import { User, getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../firebaseConfig";
import { useRouter } from "next/navigation";

export default function FirebaseAuthButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const firebaseAuth = getAuth(firebaseApp);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    setError(null);
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      router.push('/');
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(String(e));
      }
    }
  };

  const handleSignup = async () => {
    setError(null);
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      router.push('/');
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(String(e));
      }
    }
  };

  const handleLogout = async () => {
    await signOut(firebaseAuth);
    router.push('/');
  };

  return (
    <div className="w-full">
      {user ? (
        <button onClick={handleLogout} className="bg-red-800 text-white rounded px-5 py-2 font-bold w-full hover:bg-red-700 transition">
          ログアウト
        </button>
      ) : (
        <form onSubmit={e => { e.preventDefault(); handleLogin(); }} className="flex flex-col w-full">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="mb-4 p-2 rounded border border-gray-300" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="mb-6 p-2 rounded border border-gray-300" />
          <div className="flex gap-2">
            <button type="button" onClick={handleSignup} className="bg-green-700 text-white rounded px-5 py-2 font-bold flex-1 hover:bg-green-600 transition">
              新規登録
            </button>
            <button type="submit" className="bg-blue-700 text-white rounded px-5 py-2 font-bold flex-1 hover:bg-blue-600 transition">
              ログイン
            </button>
          </div>
          {error && <div className="text-red-600 mt-4">{error}</div>}
        </form>
      )}
    </div>
  );
}