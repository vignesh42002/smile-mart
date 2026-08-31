"use client";

import Image from "next/image";

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center">
      {/* Decorative background aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/40 via-pink-200/30 to-blue-200/40 rounded-3xl blur-2xl -z-10 transform scale-95" />

      {/* Main Illustration Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center p-2">
        <Image
          src="/hero-illustration.png"
          alt="Communicate, Collaborate, Create Illustration"
          width={800}
          height={600}
          priority
          className="w-full h-auto object-contain drop-shadow-xl hover:scale-[1.01] transition-transform duration-300"
        />
      </div>
    </div>
  );
}
