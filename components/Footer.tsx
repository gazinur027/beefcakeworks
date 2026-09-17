import { BUSINESS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand-950 pb-28 pt-12 text-brand-100 sm:pb-12">
      {/* pb-28 leaves room for the fixed mobile Call Now button */}
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-lg font-extrabold text-cream-50">
              {BUSINESS.name}
            </p>
            <p className="mt-2 text-sm">
              Same-day appliance repair you can trust.
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300">
              {BUSINESS.licenseNote}
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cream-50">
              Service Area
            </p>
            <p className="mt-2 text-sm">{BUSINESS.serviceArea}</p>
            <p className="mt-1 text-sm text-brand-200">
              Tampa • St. Petersburg • Clearwater • Brandon &amp; surrounding
              areas
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cream-50">
              Contact
            </p>
            {/* TODO: Replace placeholders in lib/constants.ts with real phone & email */}
            <p className="mt-2 text-sm">
              <a href={BUSINESS.phoneHref} className="hover:text-brand-300">
                {BUSINESS.phone}
              </a>
            </p>
            <p className="text-sm">
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-brand-300">
                {BUSINESS.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
          © 2026 {BUSINESS.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
