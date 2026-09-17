"use client";

import React from "react";
import BrandLogo from "./BrandLogo";

export default function BrandStory() {
  return (
    <section className="relative w-full py-28 md:py-40 bg-[#0B0A08] text-[#F5F0E8] overflow-hidden border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
        {/* Monogram Accent */}
        <BrandLogo variant="monogram" size="sm" className="mb-8" />

        <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.45em] text-[#C6A15B]">
          The Aurelia Philosophy
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F5F0E8] font-light mt-4 tracking-tight leading-tight">
          BEYOND <span className="italic text-[#C6A15B]">JEWELLERY.</span>
        </h2>

        {/* Concise Poetic Editorial Statement */}
        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F5F0E8]/90 font-light mt-10 max-w-3xl leading-relaxed italic">
          &ldquo;Jewellery is not simply worn.
          <br />
          It becomes part of the moments we keep,
          <br />
          the legacies we whisper, and the light
          <br />
          we pass into eternity.&rdquo;
        </blockquote>

        <p className="mt-8 text-xs sm:text-sm text-[#F5F0E8]/60 font-light max-w-xl leading-relaxed">
          Founded on the uncompromising pursuit of geological rarity, our maison
          bridges the royal heritage of Indian craftsmanship with the clean,
          sculptural clarity of modern European high design.
        </p>

        {/* Heritage Credentials */}
        <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full text-center">
          <div>
            <span className="font-serif text-2xl sm:text-3xl text-[#C6A15B] font-light block">
              100%
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/50 mt-1 block">
              Ethical Sourcing
            </span>
          </div>

          <div>
            <span className="font-serif text-2xl sm:text-3xl text-[#C6A15B] font-light block">
              D-IF
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/50 mt-1 block">
              Diamond Purity
            </span>
          </div>

          <div>
            <span className="font-serif text-2xl sm:text-3xl text-[#C6A15B] font-light block">
              240h
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/50 mt-1 block">
              Handcraft Per Piece
            </span>
          </div>

          <div>
            <span className="font-serif text-2xl sm:text-3xl text-[#C6A15B] font-light block">
              18K/Pt
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/50 mt-1 block">
              Noble Alloys Only
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
