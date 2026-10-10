"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AuthActions() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  async function handleSignOut() {
    try {
      const result = await signOut();
      if (result.error) { toast.error(result.error.message || "সাইন আউট করা যায়নি"); return; }
      toast.success("সফলভাবে সাইন আউট হয়েছে"); router.push("/"); router.refresh();
    } catch { toast.error("সাইন আউট করা যায়নি"); }
  }
  if (isPending) return <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-100" aria-label="অ্যাকাউন্ট লোড হচ্ছে" />;
  if (session) return <div className="flex items-center gap-2 sm:gap-3"><Link href="/profile" className="max-w-32 truncate rounded-lg px-3 py-2 text-sm font-semibold text-green-800 hover:bg-green-50">{session.user.name || "আমার প্রোফাইল"}</Link><button onClick={handleSignOut} className="rounded-lg border border-green-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-green-50">সাইন আউট</button></div>;
  return <div className="flex items-center gap-1 sm:gap-3"><Link href="/signin" className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700">সাইন ইন</Link><Link href="/signup" className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700 sm:px-5">সাইন আপ</Link></div>;
}
