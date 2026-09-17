import Image from "next/image";
import { Phone, CalendarCheck, ShieldCheck } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-pine-900 text-cream-50">
      {/* TODO: Replace with an actual photo — technician repairing an appliance or a happy Tampa Bay customer */}
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=80"
        alt="Appliance repair technician at work"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />
      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-pine-950/85 via-pine-900/80 to-brand-900" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 pt-20 text-center sm:pt-28 md:pb-24">
        {/* Urgency pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-500/15 px-4 py-1.5 text-sm font-semibold text-accent-300 ring-1 ring-accent-400/40">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-400" />
          </span>
          Technicians available today in Tampa Bay
        </div>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Same-Day Appliance Repair in{" "}
          <span className="text-brand-300">Tampa Bay</span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg font-medium text-cream-100 sm:text-xl">
          Licensed &amp; Insured • Fast Response • Fair Prices
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <a href={BUSINESS.phoneHref} className="btn-primary w-full text-xl sm:w-auto">
            <Phone className="h-6 w-6" aria-hidden />
            Call Now
          </a>
          <a href="#quote" className="btn-secondary w-full sm:w-auto">
            <CalendarCheck className="h-6 w-6" aria-hidden />
            Book Online
          </a>
        </div>

        <p className="mt-6 inline-flex items-center gap-2 text-sm text-cream-200">
          <ShieldCheck className="h-4 w-4 text-brand-300" aria-hidden />
          Free quotes • No hidden fees • We call you back in 30 minutes
        </p>
      </div>
    </section>
  );
}
