import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { PhoneCall } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBadges />
      <Services />
      <WhyChooseUs />
      <HowItWorks />

      {/* Main conversion section */}
      <section id="quote" className="scroll-mt-4 bg-brand-50 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-bold text-brand-700">
              <PhoneCall className="h-4 w-4" aria-hidden />
              Free Quote — No Obligation
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-pine-900 sm:text-4xl">
              Get Your Free Quote Today
            </h2>
            <p className="mx-auto mt-3 max-w-md text-lg text-slate-600">
              Fill out the form and we&apos;ll call you back within 30 minutes.
            </p>
          </div>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
