import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex gap-4">
        <Link href="/" className="hover:underline">ホーム</Link>
        <Link href="/about" className="hover:underline">このサイトについて</Link>
        <Link href="/cart" className="text-white">カートを見る</Link>
      </nav>
    </header>
  );
}