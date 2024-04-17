import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <p><Link href="/login">Login</Link></p>
      <p><Link href="/signup">Signup</Link></p>
    </main>
  );
}
