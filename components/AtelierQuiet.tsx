"use client";

import React from "react";
import Image from "next/image";

export default function AtelierQuiet() {
  return (
    <section className="relative w-full min-h-[85vh] bg-[#070605] text-[#F5F0E8] flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
      {/* Background Breathing Photograph */}
      <div className="relative w-full max-w-4xl aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-sm border border-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.98)]">
        <div className="relative w-full h-full animate-breathe will-change-transform">
          <Image
            src="/images/craft-atelier-hands.jpg"
            alt="Handmade with patience and reverence"
            fill
            className="object-cover object-center filter grayscale brightness-50 contrast-125"
            sizes="(max-width: 1024px) 100vw, 85vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070605] via-transparent to-[#070605]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070605] via-transparent to-[#070605]" />
        </div>

        {/* Minimal Centered Quiet Statement */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
          <span className="w-12 h-[1px] bg-[#C6A15B]/50 mb-6" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] font-light tracking-[0.15em] uppercase leading-tight">
            MADE BY HAND.
            <br />
            <span className="italic text-[#C6A15B] font-light">
              MADE TO LAST.
            </span>
          </h2>
          <p className="text-[10px] md:text-xs uppercase font-sans tracking-[0.4em] text-[#F5F0E8]/40 mt-6">
            Silence in the Atelier · Reverence in the Stone
          </p>
        </div>
      </div>
    </section>
  );
}
