import {
  Refrigerator,
  WashingMachine,
  UtensilsCrossed,
  MonitorSmartphone,
  Beer,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: Refrigerator,
    name: "Refrigerator Repair",
    popular: true,
    blurb: "Not cooling? Leaking? Weird noises? We fix it fast.",
  },
  {
    icon: WashingMachine,
    name: "Dryer Repair",
    popular: true,
    blurb: "No heat, won't spin, or takes forever? Done today.",
  },
  {
    icon: UtensilsCrossed,
    name: "Dishwasher Repair",
    popular: false,
    blurb: "Leaking, not draining, or leaving spots? We've got you.",
  },
  {
    icon: MonitorSmartphone,
    name: "Microwave Repair",
    popular: false,
    blurb: "Dead display, no heat, or broken door? Quick fix.",
  },
  {
    icon: Beer,
    name: "Beverage Refrigerators",
    popular: false,
    blurb: "Wine coolers & beverage fridges back to ice-cold.",
  },
  {
    icon: Wrench,
    name: "Appliance Installation",
    popular: false,
    blurb: "New appliance? We'll install it right the first time.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-brand-50 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-pine-900 sm:text-4xl">
            We Repair All Major Appliances
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-slate-600">
            One call fixes it all — serving every city in the Tampa Bay area.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, name, popular, blurb }) => (
            <div
              key={name}
              className={`relative rounded-2xl bg-white p-6 shadow-card transition-transform hover:-translate-y-1 ${
                popular ? "ring-2 ring-brand-400" : ""
              }`}
            >
              {popular && (
                <span className="absolute -top-3 left-5 rounded-full bg-accent-700 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow">
                  Most Popular
                </span>
              )}
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-pine-900 text-brand-300">
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-pine-900">{name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{blurb}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TODO: Optionally add a real photo strip here — e.g. before/after repair shots from actual jobs */}
      </div>
    </section>
  );
}
