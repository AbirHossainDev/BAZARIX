# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় নিত্যপণ্যের আজকের বাজারদর, দাম বৃদ্ধি-হ্রাস এবং ক্যাটাগরি অনুযায়ী পণ্যের মূল্য এক জায়গায় দেখার জন্য তৈরি একটি বাংলা ওয়েব অ্যাপ।

## ✨ প্রধান ফিচার
1. API থেকে পণ্য ও ক্যাটাগরির তথ্য দেখানো।
2. আজ দাম বেড়েছে ও কমেছে—এমন পণ্যের আলাদা তালিকা।
3. বাংলা সংখ্যায় মূল্য, একক ও শতকরা পরিবর্তন প্রদর্শন।
4. ক্যাটাগরি অনুযায়ী পণ্য দেখা এবং দাম কম/বেশি অনুযায়ী সাজানো।
5. Better Auth দিয়ে Email/Password authentication এবং Google/GitHub social login integration।
6. লগইন করা ব্যবহারকারীদের জন্য পণ্যের বিস্তারিত পেজ সুরক্ষিত রাখা।
7. প্রোফাইল দেখা ও নাম আপডেট করা।
8. Loading skeleton, toast notification এবং custom 404 page।
9. মোবাইল, ট্যাবলেট ও ডেস্কটপের জন্য responsive layout।

## 🧰 Technologies
- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Better Auth + MongoDB
- React Hot Toast
- Lucide React
- BazarDor Products/Categories API

## 🚀 Local Setup
1. Dependencies ইনস্টল করুন: `npm install`
2. `.env.example` কপি করে `.env.local` বানিয়ে নিজের credentials দিন। Secret বা database URI কখনও GitHub-এ commit করবেন না।
3. Development server চালান: `npm run dev`
4. ব্রাউজারে `http://localhost:3000` খুলুন।

## 🔐 Authentication Configuration
Email/password-এর জন্য MongoDB ও Better Auth environment variables প্রয়োজন। Google/GitHub login চালাতে `.env.local`-এ OAuth Client ID/Secret যোগ করে OAuth provider-এ `http://localhost:3000/api/auth/callback/google` এবং `http://localhost:3000/api/auth/callback/github` callback URL কনফিগার করুন। Production-এ deployed domain ব্যবহার করুন।

## 🌐 Deployment
Vercel-এ project import করে environment variables যোগ করুন এবং deploy করুন। Deployment-এর আগে `npm run build` ও `npm run lint` চালিয়ে যাচাই করুন।
