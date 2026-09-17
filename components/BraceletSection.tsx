"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function BraceletSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const braceletImgRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headerRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(
          braceletImgRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          [card1Ref.current, card2Ref.current],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bracelets"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[960px] flex flex-col justify-center py-8 sm:py-12 lg:py-14 bg-[#0E0D0B] text-[#F5F0E8] overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center h-full">
        {/* Compact Editorial Header (Single-Screen Fit) */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-4 mb-6 sm:mb-8 gap-4 shrink-0"
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-[1px] bg-[#C6A15B]" />
              <span className="text-[9px] uppercase font-sans tracking-[0.35em] text-[#C6A15B]">
                The Bracelet Sequence
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] font-light tracking-tight leading-none">
              FLUIDITY IN <span className="italic text-[#C6A15B]">GOLD.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs text-[#F5F0E8]/60 font-light leading-relaxed">
            Forged like liquid architecture. Sinuous 18k yellow gold curves that
            hug the wrist with natural ergonomic intimacy.
          </p>
        </div>

        {/* Cinematic Grid Layout (Fits in Single Screen) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Main Visual: Cuff on Wrist */}
          <div
            ref={braceletImgRef}
            className="lg:col-span-7 xl:col-span-8 relative h-[360px] sm:h-[440px] lg:h-[480px] xl:h-[500px] overflow-hidden rounded-sm border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] bg-[#141310] group"
          >
            <Image
              src="/images/collection-cuff-bracelet.jpg"
              alt="Sculptural 18k Gold Cuff on Wrist"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/90 via-[#0B0A08]/20 to-transparent pointer-events-none" />
            
            {/* Top Spec Tag */}
            <div className="absolute top-5 left-6 right-6 flex items-center justify-between text-[9px] uppercase font-sans tracking-[0.3em] text-[#F5F0E8]/60 pointer-events-none">
              <span>Haute Joaillerie Manchette</span>
              <span className="text-[#C6A15B]">Edition Vendôme</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                Sculptural Form No. 04
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] font-light mt-0.5">
                The Serpentine Wave Cuff
              </h3>
              <p className="text-[11px] text-[#F5F0E8]/70 font-light mt-1 max-w-md">
                Hand-sculpted ergonomic curvature cast in solid 18k gold with hidden tension articulation.
              </p>
            </div>
          </div>

          {/* Side Editorial Detail Stack */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between gap-4 h-full">
            {/* Detail Card 1 */}
            <div
              ref={card1Ref}
              className="p-5 sm:p-6 bg-[#12110E] border border-white/10 rounded-sm shadow-lg space-y-2 hover:border-[#C6A15B]/40 transition-colors duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                  Materiality & Finish
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]/60" />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-[#F5F0E8] font-light">
                Brushed Satin & Micro-Pavé
              </h4>
              <p className="text-xs text-[#F5F0E8]/65 font-light leading-relaxed">
                Over 180 grams of solid hand-cast 18k gold alloy, hand-brushed with
                pumice stone to yield an understated matte luster that refuses
                to shout.
              </p>
            </div>

            {/* Detail Card 2 */}
            <div
              ref={card2Ref}
              className="p-5 sm:p-6 bg-[#12110E] border border-white/10 rounded-sm shadow-lg space-y-2 hover:border-[#C6A15B]/40 transition-colors duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                  Concealed Engineering
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]/60" />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-[#F5F0E8] font-light">
                Precision Tension Hinge
              </h4>
              <p className="text-xs text-[#F5F0E8]/65 font-light leading-relaxed">
                Invisible internal gold spring mechanism allowing the cuff to slide
                effortlessly onto the wrist and snap into secure, whisper-quiet alignment.
              </p>
            </div>

            {/* Micro Dossier Footer */}
            <div className="p-3 bg-[#161410] border border-[#C6A15B]/25 rounded-sm flex items-center justify-between text-[8.5px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]">
              <span>18K Noble Alloy · Place Vendôme</span>
              <span className="text-[#F5F0E8]/50">Atelier Hallmark</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
