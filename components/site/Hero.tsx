import Link from "next/link";
import { ShoppingBag, TrendingUp, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeroIllustration } from "@/components/site/HeroIllustration";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-emerald-50/50 via-white to-white pt-8 pb-16 lg:py-20 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-xs font-bold text-emerald-800 w-fit mb-4">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Smile Mart India • Supermarket & Business Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] mb-6">
              Happiness in Every Home with <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Smile Mart</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl font-normal">
              Discover top-quality household items, essential products, and proven business opportunity packages designed to boost your income and grow your future.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-14">
              <Link
                href="/business-opportunity"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore Business Opportunity
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-900"
              >
                View Products
              </Link>
            </div>

            {/* Bottom Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shadow-xs">
                  <ShoppingBag size={20} strokeWidth={2.2} />
                </div>
                <span className="text-sm font-bold text-slate-800 leading-tight">
                  10+ Product Categories
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shadow-xs">
                  <TrendingUp size={20} strokeWidth={2.2} />
                </div>
                <span className="text-sm font-bold text-slate-800 leading-tight">
                  Proven Income Growth
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shadow-xs">
                  <ShieldCheck size={20} strokeWidth={2.2} />
                </div>
                <span className="text-sm font-bold text-slate-800 leading-tight">
                  100% Support & Guidance
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

