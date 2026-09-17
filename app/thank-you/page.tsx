import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

// Fallback success page for visitors whose browser submits the form without
// JavaScript (AJAX is the normal path). Also handy as an ad-conversion URL.
export const metadata: Metadata = {
  title: "Request Received | Beefcake Works LLC",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-50 px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-16 w-16 text-brand-500" aria-hidden />
        <h1 className="mt-4 text-3xl font-extrabold text-pine-900">
          Thank you! We&apos;ll call you within 30 minutes.
        </h1>
        <p className="mt-3 text-slate-600">
          Your repair request is in. Keep your phone nearby — a real person from
          our Tampa Bay team will reach out shortly.
        </p>
        <a href={BUSINESS.phoneHref} className="btn-primary mt-8 w-full">
          <Phone className="h-5 w-5" aria-hidden />
          Need It Now? Call {BUSINESS.phone}
        </a>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-semibold text-brand-600 underline underline-offset-4 hover:text-brand-700"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
