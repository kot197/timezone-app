"use client"
import { useRouter } from "next/navigation";


// app/401/page.tsx
export default function Unauthorized() {
  const router = useRouter();

    return (
      <div className="h-screen w-full flex items-center flex-col justify-center text-center">
          <h1 className="text-4xl">401 - Not Authorized</h1>
          <p className="text-2xl mt-4">You are not authorized to access this page.</p>
          <button onClick={() => router.push('/')} className="mt-8 py-4 px-6 rounded-3xl bg-primary-500 hover:bg-primary-600 transition-all text-lg">Go Back To Home</button>
      </div>
    );
  }