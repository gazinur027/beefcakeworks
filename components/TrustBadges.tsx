import { ShieldCheck, Zap, Star, MapPin } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Zap, label: "Same-Day Service" },
  { icon: Star, label: "5-Star Rated" },
  { icon: MapPin, label: "Local Tampa Bay Business" },
];

export default function TrustBadges() {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 sm:grid-cols-4">
        {badges.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <span className="text-sm font-bold text-pine-900">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
