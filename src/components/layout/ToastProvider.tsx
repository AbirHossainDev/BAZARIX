"use client";
import { Toaster } from "react-hot-toast";
export default function ToastProvider() {
  return <Toaster position="top-right" toastOptions={{ duration: 3500, style: { border: "1px solid #dce6df", borderRadius: "12px", fontFamily: "var(--font-bengali), sans-serif" } }} />;
}
