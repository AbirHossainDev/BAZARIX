
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn.email({
                email,
                password,
            });

            if (result.error) {
                toast.error(result.error.message || "লগইন করা যায়নি।");
                return;
            }

            toast.success("সফলভাবে লগইন হয়েছে!");

            const callbackURL = searchParams.get("callbackURL");
            const safeURL =
                callbackURL?.startsWith("/") &&
                !callbackURL.startsWith("//")
                    ? callbackURL
                    : "/";

            router.replace(safeURL);
            router.refresh();
        } catch {
            toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignIn = async (provider: "google" | "github") => {
        try {
            const result = await signIn.social({ provider, callbackURL: searchParams.get("callbackURL") || "/" });
            if (result.error) toast.error(result.error.message || "সোশ্যাল লগইন করা যায়নি");
        } catch {
            toast.error("সোশ্যাল লগইন চালু করা যায়নি। OAuth কনফিগারেশন পরীক্ষা করুন।");
        }
    };

    return (
        <main className="flex min-h-[75vh] items-center justify-center bg-[#f7faf7] px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-lg sm:p-8">
                <div className="mb-7 text-center">
                    <div className="mb-3 text-4xl">🛒</div>
                    <h1 className="text-3xl font-bold text-green-800">
                        আবার স্বাগতম!
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        বাজার দর অ্যাকাউন্টে লগইন করুন
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            ইমেইল
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="আপনার ইমেইল লিখুন"
                            required
                            autoComplete="email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            পাসওয়ার্ড
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                            required
                            autoComplete="current-password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "লগইন হচ্ছে..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => handleSocialSignIn("google")} className="rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold hover:bg-gray-50">Google দিয়ে চালিয়ে যান</button>
                    <button type="button" onClick={() => handleSocialSignIn("github")} className="rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold hover:bg-gray-50">GitHub দিয়ে চালিয়ে যান</button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        Sign Up করুন
                    </Link>
                </p>

                <Link
                    href="/"
                    className="mt-5 block text-center text-sm text-gray-500 hover:text-green-700"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
}