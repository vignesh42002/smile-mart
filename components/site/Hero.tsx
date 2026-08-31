import Link from "next/link";
import { Lock, Maximize2, Link2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeroIllustration } from "@/components/site/HeroIllustration";

export function Hero() {
  return (
    <section className="relative bg-white pt-8 pb-16 lg:py-20 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.1] mb-6">
              Communicate.
              <br />
              Collaborate. Create.
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-8 max-w-lg font-normal">
              WeDu provides an effective and powerful way to manage your projects
            </p>

            <div className="mb-14">
              <Link
                href="/business-opportunity"
                className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started
              </Link>
            </div>

            {/* Bottom Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white shadow-sm">
                  <Lock size={20} strokeWidth={2.2} />
                </div>
                <span className="text-sm font-bold text-black leading-tight">
                  Speed &amp; Security
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white shadow-sm">
                  <Maximize2 size={20} strokeWidth={2.2} />
                </div>
                <span className="text-sm font-bold text-black leading-tight">
                  Flexibility &amp; Scalability
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white shadow-sm">
                  <Link2 size={20} strokeWidth={2.2} />
                </div>
                <span className="text-sm font-bold text-black leading-tight">
                  Better Collaboration
                </span>
              </div>
            </div>
          </div>

          {/* Right Column Illustration */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <HeroIllustration />
          </div>
        </div>
      </Container>
    </section>
  );
}
