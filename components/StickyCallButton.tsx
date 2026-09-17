"use client";

import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

// Fixed "Call Now" bar pinned to the bottom of the screen on mobile.
// Hidden on md+ screens where the hero buttons are always visible.
export default function StickyCallButton() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-pine-900/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <a
        href={BUSINESS.phoneHref}
        className="btn-primary w-full text-lg"
        aria-label={`Call Beefcake Works now at ${BUSINESS.phone}`}
      >
        <Phone className="h-5 w-5" aria-hidden />
        Call Now — {BUSINESS.phone}
      </a>
    </div>
  );
}
