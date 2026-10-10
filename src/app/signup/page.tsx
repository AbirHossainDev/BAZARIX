
"use client";

import { signIn, signUp } from "@/lib/auth-client";
import {
    FieldError,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleOnSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        try {
            const { error } = await signUp.email({
                name,
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
                return;
            }

            toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এবার সাইন ইন করুন।");
            router.replace("/signin");
        } catch {
            toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignIn = async (provider: "google" | "github") => {
        try {
            const result = await signIn.social({ provider, callbackURL: "/" });
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
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        বাজার দর-এর সঙ্গে যুক্ত হোন
                    </p>
                </div>

                <form onSubmit={handleOnSubmit} className="space-y-5">
                    <TextField
                        name="name"
                        isRequired
                        minLength={3}
                        className="w-full"
                    >
                        <Label className="mb-2 block text-sm font-semibold text-gray-700">
                            আপনার নাম
                        </Label>
                        <Input
                            placeholder="আপনার নাম লিখুন"
                            autoComplete="name"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                        />
                        <FieldError />
                    </TextField>

                    <TextField
                        name="email"
                        type="email"
                        isRequired
                        className="w-full"
                    >
                        <Label className="mb-2 block text-sm font-semibold text-gray-700">
                            ইমেইল
                        </Label>
                        <Input
                            placeholder="আপনার ইমেইল লিখুন"
                            autoComplete="email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                        />
                        <FieldError />
                    </TextField>

                    <TextField
                        name="password"
                        type="password"
                        isRequired
                        minLength={8}
                        validate={(value) => {
                            if (value.length < 8) {
                                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "কমপক্ষে একটি বড় ইংরেজি অক্ষর দিন";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "কমপক্ষে একটি সংখ্যা দিন";
                            }
                            return null;
                        }}
                        className="w-full"
                    >
                        <Label className="mb-2 block text-sm font-semibold text-gray-700">
                            পাসওয়ার্ড
                        </Label>
                        <Input
                            placeholder="কমপক্ষে ৮ অক্ষর লিখুন"
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                        />
                        <FieldError />
                    </TextField>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "Sign Up"}
                    </button>
                </form>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => handleSocialSignIn("google")} className="rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold hover:bg-gray-50">Google দিয়ে চালিয়ে যান</button>
                    <button type="button" onClick={() => handleSocialSignIn("github")} className="rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold hover:bg-gray-50">GitHub দিয়ে চালিয়ে যান</button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    আগে থেকেই অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        Sign In করুন
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
