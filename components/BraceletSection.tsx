"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BraceletSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const braceletImgRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      if (braceletImgRef.current) {
        gsap.to(braceletImgRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (detailPanelRef.current) {
        gsap.fromTo(
          detailPanelRef.current,
          { y: 50, opacity: 0 },
          {
            y: -20,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center+=20%",
              end: "center center",
              scrub: 1.0,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bracelets"
      className="relative w-full py-28 md:py-36 bg-[#0E0D0B] text-[#F5F0E8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Top Minimal Editorial Label */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8 mb-16 gap-6">
          <div>
            <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.4em] text-[#C6A15B]">
              The Bracelet Sequence
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl text-[#F5F0E8] font-light mt-2 tracking-tight">
              FLUIDITY IN <span className="italic text-[#C6A15B]">GOLD.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#F5F0E8]/60 font-light leading-relaxed">
            Forged like liquid architecture. Sinuous 18k yellow gold curves that
            hug the wrist with natural ergonomic intimacy.
          </p>
        </div>

        {/* Cinematic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Large Visual */}
          <div
            ref={braceletImgRef}
            className="lg:col-span-8 relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.85)] bg-[#141310] will-change-transform"
          >
            <Image
              src="/images/collection-cuff-bracelet.jpg"
              alt="Sculptural 18k Gold Cuff on Wrist"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/90 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                Sculptural Form No. 04
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] font-light mt-1">
                The Serpentine Wave Cuff
              </h3>
            </div>
          </div>

          {/* Side Editorial Detail Stack */}
          <div
            ref={detailPanelRef}
            className="lg:col-span-4 flex flex-col justify-between space-y-8 will-change-transform"
          >
            <div className="p-8 bg-[#12110E] border border-white/10 space-y-4">
              <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                Materiality & Finish
              </span>
              <h4 className="font-serif text-2xl text-[#F5F0E8] font-light">
                Brushed Satin & Micro-Pavé
              </h4>
              <p className="text-xs text-[#F5F0E8]/65 font-light leading-relaxed">
                Over 180 grams of solid hand-cast 18k gold alloy, hand-brushed with
                pumice stone to yield an understated matte luster that refuses
                to shout.
              </p>
            </div>

            <div className="p-8 bg-[#12110E] border border-white/10 space-y-4">
              <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                Concealed Engineering
              </span>
              <h4 className="font-serif text-2xl text-[#F5F0E8] font-light">
                Precision Tension Hinge
              </h4>
              <p className="text-xs text-[#F5F0E8]/65 font-light leading-relaxed">
                Invisible internal gold spring mechanism allowing the cuff to slide
                effortlessly onto the wrist and snap into secure alignment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
