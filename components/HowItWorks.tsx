import { CalendarCheck, Truck, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    step: "1",
    title: "Book Your Appointment",
    text: "Call us or fill out the quick form below — takes less than a minute.",
  },
  {
    icon: Truck,
    step: "2",
    title: "We Come to You",
    text: "Same-day service anywhere in Tampa Bay. We arrive on time, every time.",
  },
  {
    icon: PartyPopper,
    step: "3",
    title: "Get Back to Normal",
    text: "Fast, professional repair at a fair price — with workmanship guaranteed.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-pine-900 sm:text-4xl">
            How It Works — 3 Easy Steps
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {steps.map(({ icon: Icon, step, title, text }) => (
            <div key={step} className="relative flex flex-col items-center text-center">
              <div className="relative">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-4 ring-white">
                  <Icon className="h-9 w-9" aria-hidden />
                </span>
                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-pine-900 text-sm font-extrabold text-cream-100 shadow-cta">
                  {step}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-pine-900">{title}</h3>
              <p className="mt-2 max-w-xs text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#quote"
            className="btn-primary"
          >
            Get My Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
