import { Zap, Tag, ShieldCheck, MapPin, ThumbsUp } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Same-Day Repair Available",
    text: "Broken fridge or dryer? We prioritize urgent calls and can often be there today.",
  },
  {
    icon: Tag,
    title: "Transparent Upfront Pricing",
    text: "You approve the price before we start. No surprises, no hidden fees — ever.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured Technicians",
    text: "Every tech is fully licensed and insured, so your home and appliances are protected.",
  },
  {
    icon: MapPin,
    title: "Local Tampa Bay Business",
    text: "We live and work here. Fast dispatch from Tampa to St. Pete to Clearwater and beyond.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    text: "If you're not happy, we're not done. We stand behind every repair we make.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-900 py-16 text-cream-50 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Why Tampa Bay Chooses Beefcake Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-brand-100">
            Straightforward service from neighbors who show up on time.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl bg-brand-800/60 p-6 ring-1 ring-white/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white shadow-cta">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-100">
                {text}
              </p>
            </div>
          ))}

          {/* Review highlight card */}
          <div className="flex flex-col justify-center rounded-2xl bg-accent-700 p-6 shadow-cta">
            {/* TODO: Replace with real customer reviews / Google rating.
                FTC endorsement rules: only publish genuine, verifiable reviews. */}
            <p className="text-4xl font-extrabold">★★★★★</p>
            <p className="mt-2 font-semibold">
              &ldquo;Fixed our fridge the same day we called. Honest guys!&rdquo;
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              — Real Tampa Bay customer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
