"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
export default function ProductAccessGuard({ children }: { children: React.ReactNode }) {
 const {data:session,isPending}=useSession(); const router=useRouter(); const pathname=usePathname();
 useEffect(()=>{if(!isPending&&!session){toast.error("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন");router.replace(`/signin?callbackURL=${encodeURIComponent(pathname)}`)}},[isPending,session,pathname,router]);
 if(isPending||!session)return <main className="flex min-h-[55vh] items-center justify-center bg-[#f7faf7] px-4"><div className="w-full max-w-3xl animate-pulse rounded-2xl border bg-white p-8"><div className="h-8 w-1/2 rounded bg-gray-200"/><div className="mt-4 h-4 w-4/5 rounded bg-gray-100"/><div className="mt-8 h-40 rounded-xl bg-gray-100"/></div></main>;
 return children;
}
