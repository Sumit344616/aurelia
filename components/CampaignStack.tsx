"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STACK_PHOTOS = [
  {
    id: 1,
    title: "Campaign Look 01 — The Emerald Collar",
    image: "/images/hero-necklace-portrait.jpg",
    initialRotation: -2.5,
    subtitle: "Shot on 70mm Hasselblad in Paris",
  },
  {
    id: 2,
    title: "Campaign Look 02 — The Eternity Cascade",
    image: "/images/collection-eternity-necklace.jpg",
    initialRotation: 1.8,
    subtitle: "Archival Exhibition Specimen",
  },
  {
    id: 3,
    title: "Campaign Look 03 — Kinetic Chandeliers",
    image: "/images/collection-chandelier-earrings.jpg",
    initialRotation: -1.2,
    subtitle: "Suspended Platinum Architecture",
  },
  {
    id: 4,
    title: "Campaign Look 04 — The Serpentine Cuff",
    image: "/images/collection-cuff-bracelet.jpg",
    initialRotation: 2.2,
    subtitle: "Sculptural Form in 18k Satin Gold",
  },
];

export default function CampaignStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!containerRef.current || !pinStageRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: pinStageRef.current,
          anticipatePin: 1,
        },
      });

      // Animate cards 0, 1, 2 away one by one, leaving the final photograph
      photoRefs.current.forEach((el, index) => {
        if (!el || index === STACK_PHOTOS.length - 1) return;

        const dir = index % 2 === 0 ? -1 : 1;

        tl.to(
          el,
          {
            xPercent: dir * 130,
            yPercent: -20,
            rotation: dir * 18,
            opacity: 0,
            ease: "power2.inOut",
            duration: 1.5,
          },
          index * 1.5
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="campaign-stack"
      className="relative w-full h-[260vh] bg-[#090807] text-[#F5F0E8]"
    >
      <div
        ref={pinStageRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between py-12 px-6 md:px-16 bg-[#090807]"
      >
        {/* Top Header */}
        <div className="relative z-20 max-w-4xl mx-auto text-center pt-6">
          <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.4em] text-[#C6A15B]">
            Editorial Proof Table
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F0E8] font-light mt-2 tracking-tight">
            THE CAMPAIGN <span className="italic text-[#C6A15B]">PROOFS.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F0E8]/60 font-light mt-2">
            Scroll to cycle through the creative director&apos;s physical photographic prints.
          </p>
        </div>

        {/* Central Physical Photo Stack Canvas */}
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <div className="relative w-[85vw] sm:w-[55vw] md:w-[42vw] lg:w-[32vw] aspect-[3/4]">
            {STACK_PHOTOS.map((photo, index) => (
              <div
                key={photo.id}
                ref={(el) => {
                  photoRefs.current[index] = el;
                }}
                className="absolute inset-0 p-3 pb-8 sm:pb-10 bg-[#161513] border border-white/15 rounded-sm shadow-[0_30px_90px_rgba(0,0,0,0.95)] will-change-transform select-none"
                style={{
                  transform: `rotate(${photo.initialRotation}deg)`,
                  zIndex: STACK_PHOTOS.length - index,
                }}
              >
                {/* Image Canvas */}
                <div className="relative w-full h-full overflow-hidden bg-[#0B0A08]">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 85vw, 35vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/70 via-transparent to-transparent" />
                </div>

                {/* Physical Print Footer Caption */}
                <div className="pt-3 px-1 flex items-center justify-between">
                  <div>
                    <p className="font-serif text-sm sm:text-base text-[#F5F0E8] font-light">
                      {photo.title}
                    </p>
                    <span className="text-[9px] font-sans tracking-[0.2em] text-[#F5F0E8]/40 block">
                      {photo.subtitle}
                    </span>
                  </div>
                  <span className="text-[9px] font-sans tracking-[0.25em] text-[#C6A15B] uppercase">
                    0{photo.id} / 04
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Progress Cue */}
        <div className="relative z-20 flex items-center justify-between text-[10px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/40 border-t border-white/5 pt-4">
          <span>Darkroom Proof Sequence</span>
          <span className="text-[#C6A15B]">Scroll to Release Stack ↓</span>
        </div>
      </div>
    </section>
  );
}
