"use client";

import React from "react";

export default function SocialProof() {
  return (
    <section className="relative w-full py-28 md:py-36 bg-[#0B0A08] text-[#F5F0E8] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Minimal Editorial Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.45em] text-[#C6A15B]">
            Maison Reputation
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#F5F0E8] font-light mt-3 tracking-tight">
            WORN BY <span className="italic text-[#C6A15B]">MOMENTS.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F0E8]/60 font-light mt-4 leading-relaxed">
            Chosen for intimate state occasions, red carpet premieres, and
            private family ceremonies across the globe.
          </p>
        </div>

        {/* The 3 Minimalist Brand Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="p-8 bg-[#12110E] border border-white/5 hover:border-[#C6A15B]/30 transition-colors duration-500 space-y-4">
            <span className="text-xs font-serif text-[#C6A15B] italic block">
              Pillar I
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] font-light tracking-wide">
              HANDCRAFTED
              <br />
              PRECISION
            </h3>
            <div className="w-10 h-[1px] bg-[#C6A15B]/40 my-3" />
            <p className="text-xs text-[#F5F0E8]/65 font-light leading-relaxed">
              Every curve, prong, and articulated link is shaped by hand in our
              private workshops. No mass production. No shortcuts.
            </p>
          </div>

          <div className="p-8 bg-[#12110E] border border-white/5 hover:border-[#C6A15B]/30 transition-colors duration-500 space-y-4">
            <span className="text-xs font-serif text-[#C6A15B] italic block">
              Pillar II
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] font-light tracking-wide">
              EXCEPTIONAL
              <br />
              MATERIALS
            </h3>
            <div className="w-10 h-[1px] bg-[#C6A15B]/40 my-3" />
            <p className="text-xs text-[#F5F0E8]/65 font-light leading-relaxed">
              Only D-Flawless diamonds, unheated Burmese rubies, Colombian
              emeralds, and recycled 18k noble alloys grace our atelier benches.
            </p>
          </div>

          <div className="p-8 bg-[#12110E] border border-white/5 hover:border-[#C6A15B]/30 transition-colors duration-500 space-y-4">
            <span className="text-xs font-serif text-[#C6A15B] italic block">
              Pillar III
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] font-light tracking-wide">
              TIMELESS
              <br />
              DESIGN
            </h3>
            <div className="w-10 h-[1px] bg-[#C6A15B]/40 my-3" />
            <p className="text-xs text-[#F5F0E8]/65 font-light leading-relaxed">
              Silhouettes rooted in classical proportion that remain as
              electrifying in fifty years as they are tonight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
