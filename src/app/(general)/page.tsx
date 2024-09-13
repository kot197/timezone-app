import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full items-center justify-center font-mono text-sm lg:flex h-screen bg-hero-image bg-cover">
        <span className="text-center">Stay Connected, No Matter the Distance</span>
      </div>
    </main>
  );
}
