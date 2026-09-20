"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrandLogo from "./BrandLogo";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);

  // Scene 01 Elements
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene1ImageRef = useRef<HTMLDivElement>(null);
  const scene1LightBeamRef = useRef<HTMLDivElement>(null);
  const scene1TextRef = useRef<HTMLDivElement>(null);

  // Canva-style text entrance refs
  const metaLineRef = useRef<HTMLDivElement>(null);
  const metaTextRef = useRef<HTMLSpanElement>(null);
  const brandTagRef = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  // Scene 02/03: The High Jewellery Archive Diptych (Unique, Non-repetitive!)
  const scene2DiptychRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const diptychTextRef = useRef<HTMLDivElement>(null);

  // Scene 04 & 05: Clean Velvet Obsidian & Philosophy Reveal
  const scene5TextRef = useRef<HTMLDivElement>(null);
  const scene5Word1Ref = useRef<HTMLDivElement>(null);
  const scene5Word2Ref = useRef<HTMLDivElement>(null);
  const scene5Word3Ref = useRef<HTMLDivElement>(null);

  // Scene 06: Monogram Closure & Cinematic Reveal
  const scene6LogoRef = useRef<HTMLDivElement>(null);
  const scene6AuraRef = useRef<HTMLDivElement>(null);
  const scene6MonogramRef = useRef<HTMLDivElement>(null);
  const scene6TitleRef = useRef<HTMLHeadingElement>(null);
  const scene6SubtitleRef = useRef<HTMLParagraphElement>(null);
  const scene6LineRef = useRef<HTMLDivElement>(null);
  const scene6HintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!pinStageRef.current || !containerRef.current) return;

      // =========================================================
      // 1. CANVA-STYLE ENTRANCE TIMELINE ON PAGE LOAD (Scene 01)
      // =========================================================
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Line draws in
      introTl.fromTo(
        metaLineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.0, delay: 0.2 }
      );

      // Metadata text fades and expands letter-spacing
      introTl.fromTo(
        metaTextRef.current,
        { opacity: 0, x: -15, filter: "blur(4px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8 },
        "-=0.6"
      );

      // Brand tag reveals
      introTl.fromTo(
        brandTagRef.current,
        { opacity: 0, y: 15, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
        "-=0.4"
      );

      // Title Line 1 "JEWELS OF" glides up from behind overflow mask
      introTl.fromTo(
        titleLine1Ref.current,
        { y: "115%", filter: "blur(12px)", opacity: 0 },
        { y: "0%", filter: "blur(0px)", opacity: 1, duration: 1.2 },
        "-=0.5"
      );

      // Title Line 2 "ETERNITY." glides up with animated gold shimmer
      introTl.fromTo(
        titleLine2Ref.current,
        { y: "115%", filter: "blur(12px)", opacity: 0 },
        { y: "0%", filter: "blur(0px)", opacity: 1, duration: 1.2 },
        "-=0.9"
      );

      // Description fades and rises
      introTl.fromTo(
        descRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.0 },
        "-=0.7"
      );

      // =========================================================
      // 2. PINNED SCROLLTRIGGER TIMELINE (280vh Scroll Journey)
      // =========================================================
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: pinStageRef.current,
          anticipatePin: 1,
        },
      });

      // SCENE 01 Fades Out as user scrolls
      scrollTl.to(
        scene1TextRef.current,
        {
          opacity: 0,
          y: -50,
          filter: "blur(8px)",
          ease: "power2.inOut",
          duration: 1.0,
        },
        0
      );

      scrollTl.to(
        scene1ImageRef.current,
        {
          scale: 1.15,
          x: "-4%",
          ease: "none",
          duration: 1.8,
        },
        0
      );

      // Light sweep across necklace
      scrollTl.fromTo(
        scene1LightBeamRef.current,
        { x: "-100%", opacity: 0 },
        { x: "150%", opacity: 0.45, ease: "power1.inOut", duration: 1.5 },
        0.2
      );

      // Transition from Scene 01 Model -> Scene 02/03: ARCHIVE & ATELIER DIPTYCH
      scrollTl.to(
        scene1Ref.current,
        {
          opacity: 0,
          filter: "blur(10px)",
          ease: "power2.inOut",
          duration: 1.4,
        },
        1.2
      );

      scrollTl.fromTo(
        scene2DiptychRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "power2.out", duration: 1.4 },
        1.4
      );

      // Subtle counter-movement between the two editorial panels
      scrollTl.fromTo(
        leftPanelRef.current,
        { y: 40, scale: 0.96 },
        { y: -20, scale: 1.02, ease: "none", duration: 2.8 },
        1.4
      );

      scrollTl.fromTo(
        rightPanelRef.current,
        { y: -30, scale: 0.98 },
        { y: 25, scale: 1.02, ease: "none", duration: 2.8 },
        1.4
      );

      scrollTl.fromTo(
        diptychTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 1.2 },
        1.8
      );

      // Transition from Diptych -> Scene 05: The Creed "CRAFTED TO BE REMEMBERED"
      scrollTl.to(
        scene2DiptychRef.current,
        {
          opacity: 0,
          scale: 1.1,
          filter: "blur(10px)",
          ease: "power2.in",
          duration: 1.4,
        },
        4.4
      );

      scrollTl.fromTo(
        scene5TextRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        4.6
      );

      scrollTl.fromTo(
        scene5Word1Ref.current,
        { y: "120%", filter: "blur(10px)", opacity: 0 },
        { y: "0%", filter: "blur(0px)", opacity: 1, duration: 1.2, ease: "power3.out" },
        4.8
      );

      scrollTl.fromTo(
        scene5Word2Ref.current,
        { y: "120%", filter: "blur(10px)", opacity: 0 },
        { y: "0%", filter: "blur(0px)", opacity: 1, duration: 1.2, ease: "power3.out" },
        5.0
      );

      scrollTl.fromTo(
        scene5Word3Ref.current,
        { y: "120%", filter: "blur(10px)", opacity: 0 },
        { y: "0%", filter: "blur(0px)", opacity: 1, duration: 1.2, ease: "power3.out" },
        5.2
      );

      // Scene 06: Monogram Closure with Cinematic Aura & Anamorphic Reveal
      scrollTl.to(
        scene5TextRef.current,
        {
          opacity: 0,
          filter: "blur(12px)",
          scale: 0.95,
          ease: "power2.inOut",
          duration: 1.0,
        },
        6.6
      );

      // Base container fade-in
      scrollTl.fromTo(
        scene6LogoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        6.8
      );

      // 1. Cinematic Radial Aura Bloom
      scrollTl.fromTo(
        scene6AuraRef.current,
        { scale: 0.35, opacity: 0 },
        { scale: 1.25, opacity: 0.75, ease: "power2.out", duration: 1.5 },
        7.0
      );

      // 2. Monogram Macro Reveal: Descends from macro scale into razor-sharp focus
      scrollTl.fromTo(
        scene6MonogramRef.current,
        { scale: 1.45, opacity: 0, filter: "blur(10px)", y: -25 },
        { scale: 1.0, opacity: 1, filter: "blur(0px)", y: 0, ease: "power3.out", duration: 1.4 },
        7.1
      );

      // 3. Title "AURELIA": Anamorphic letter-spacing expansion and rise
      scrollTl.fromTo(
        scene6TitleRef.current,
        { y: 35, opacity: 0, letterSpacing: "0.12em", filter: "blur(8px)" },
        { y: 0, opacity: 1, letterSpacing: "0.28em", filter: "blur(0px)", ease: "power3.out", duration: 1.4 },
        7.3
      );

      // 4. Subtitle "Jewels of Eternity": Gold tracking expansion
      scrollTl.fromTo(
        scene6SubtitleRef.current,
        { y: 20, opacity: 0, letterSpacing: "0.3em" },
        { y: 0, opacity: 1, letterSpacing: "0.5em", ease: "power2.out", duration: 1.2 },
        7.5
      );

      // 5. Divider Line draws outward from center with diamond accent
      scrollTl.fromTo(
        scene6LineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, ease: "power2.inOut", duration: 1.0 },
        7.7
      );

      // 6. Runway Invite: Gentle floating reveal
      scrollTl.fromTo(
        scene6HintRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.8 },
        7.9
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#070605]"
      id="hero"
    >
      <div
        ref={pinStageRef}
        className="relative w-full h-screen overflow-hidden bg-[#070605]"
      >
        {/* ==================================================== */}
        {/* SCENE 01: HIGH JEWELLERY CAMPAIGN PORTRAIT           */}
        {/* ==================================================== */}
        <div
          ref={scene1Ref}
          className="absolute inset-0 w-full h-full flex items-center justify-between z-10"
        >
          {/* Main Editorial Image Canvas */}
          <div
            ref={scene1ImageRef}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <Image
              src="/images/hero-necklace-portrait.jpg"
              alt="Aurelia High Jewellery Necklace Campaign"
              fill
              priority
              className="object-cover object-[70%_25%] md:object-[60%_20%]"
              sizes="100vw"
            />

            {/* Subtle Studio Lighting Vignette & Contrast Dissolve */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070605] via-[#070605]/55 to-transparent md:w-[68%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070605] via-transparent to-[#070605]/40" />

            {/* Animated Studio Light Beam Sweep Mask */}
            <div
              ref={scene1LightBeamRef}
              className="absolute inset-0 w-full h-full pointer-events-none opacity-0 will-change-transform"
              style={{
                background:
                  "linear-gradient(115deg, transparent 30%, rgba(198,161,91,0.22) 48%, rgba(255,255,255,0.35) 50%, rgba(198,161,91,0.22) 52%, transparent 70%)",
                mixBlendMode: "screen",
              }}
            />
          </div>

          {/* Scene 01 Typography Overlay (With Canva-Style Mask Wipes & Fades) */}
          <div
            ref={scene1TextRef}
            className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 flex flex-col justify-center h-full pt-16 sm:pt-20 pb-10 pointer-events-none"
          >
            <div className="my-auto">
              {/* Metadata with Drawing Line */}
              <div className="flex items-center gap-3 overflow-hidden">
                <div
                  ref={metaLineRef}
                  className="w-8 h-[1px] bg-[#C6A15B] will-change-transform"
                />
                <span
                  ref={metaTextRef}
                  className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.45em] text-[#C6A15B] will-change-transform"
                >
                  High Jewellery Collection 2026
                </span>
              </div>

              {/* Major Editorial Headline with Staggered Mask Reveals */}
              <div className="mt-8 md:mt-12 max-w-2xl">
                <div className="overflow-hidden mb-2">
                  <span
                    ref={brandTagRef}
                    className="block text-xs uppercase tracking-[0.45em] text-[#F5F0E8]/70 will-change-transform font-light"
                  >
                    Maison Aurelia
                  </span>
                </div>

                <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[#F5F0E8] font-light leading-[0.92] tracking-tight">
                  <div className="overflow-hidden py-1">
                    <div ref={titleLine1Ref} className="will-change-transform">
                      JEWELS OF
                    </div>
                  </div>

                  <div className="overflow-hidden py-1">
                    <div ref={titleLine2Ref} className="italic font-light will-change-transform">
                      <span className="animate-gold-shimmer inline-block">
                        ETERNITY.
                      </span>
                    </div>
                  </div>
                </h1>
              </div>

              <p
                ref={descRef}
                className="mt-6 md:mt-8 max-w-md text-sm md:text-base text-[#F5F0E8]/75 font-light leading-relaxed will-change-transform"
              >
                Sculpted from light and rare earth. An international high
                jewellery maison founded on timeless grace and modern Indian
                grandeur.
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* SCENE 02 & 03: THE ATELIER ARCHIVE & MASTERPIECE DIPTYCH */}
        {/* (Fresh, Unique, Non-Repetitive Luxury Section!)      */}
        {/* ==================================================== */}
        <div
          ref={scene2DiptychRef}
          className="absolute inset-0 w-full h-full flex flex-col justify-between py-10 px-6 md:px-16 z-20 opacity-0 pointer-events-none bg-[#070605]"
        >
          {/* Top Bar: Archival Reference */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#C6A15B]" />
              <span className="text-[10px] uppercase font-sans tracking-[0.35em] text-[#C6A15B]">
                Place Vendôme Archive · Act 02
              </span>
            </div>
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-white/40 hidden sm:block">
              Exhibition Piece No. 01 & Atelier Bench
            </span>
          </div>

          {/* Central Diptych Layout with Balanced Proportions */}
          <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-14 my-auto max-w-6xl mx-auto w-full">
            {/* Left Panel: The Eternity Necklace on Black Velvet */}
            <div
              ref={leftPanelRef}
              className="relative w-full lg:w-1/2 h-[34vh] sm:h-[42vh] lg:h-[50vh] max-h-[460px] overflow-hidden rounded-sm border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] bg-[#12110E] group will-change-transform"
            >
              <Image
                src="/images/collection-eternity-necklace.jpg"
                alt="The Eternity Necklace Masterpiece"
                fill
                className="object-cover object-top filter brightness-95 contrast-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070605]/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                  Exhibition Specimen
                </span>
                <p className="font-serif text-lg sm:text-xl text-[#F5F0E8] font-light">
                  The Eternity Collar
                </p>
                <p className="text-[11px] text-[#F5F0E8]/60 font-light mt-0.5">
                  Hand-articulated cascading pear diamonds in 18k white gold
                </p>
              </div>
            </div>

            {/* Right Panel: The Master Goldsmith at Place Vendôme */}
            <div
              ref={rightPanelRef}
              className="relative w-full lg:w-1/2 h-[34vh] sm:h-[42vh] lg:h-[50vh] max-h-[460px] overflow-hidden rounded-sm border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] bg-[#12110E] group will-change-transform"
            >
              <Image
                src="/images/craft-atelier-hands.jpg"
                alt="Master Goldsmith setting stones at Place Vendôme"
                fill
                className="object-cover object-center filter brightness-95 contrast-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070605]/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                  Atelier Bench · Paris
                </span>
                <p className="font-serif text-lg sm:text-xl text-[#F5F0E8] font-light">
                  The Art of the Setting
                </p>
                <p className="text-[11px] text-[#F5F0E8]/60 font-light mt-0.5">
                  Over 240 hours carved under 40x binocular magnification
                </p>
              </div>
            </div>
          </div>

          {/* Central Editorial Narrative Subtitle */}
          <div
            ref={diptychTextRef}
            className="text-center max-w-xl mx-auto py-2 will-change-transform"
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] font-light tracking-wide">
              WHERE LIGHT BECOMES <span className="italic text-[#C6A15B]">LEGACY.</span>
            </h3>
            <p className="text-xs text-[#F5F0E8]/60 font-light mt-1">
              From untreated geological rarity to timeless wearable architecture.
            </p>
          </div>
        </div>

        {/* ==================================================== */}
        {/* SCENE 05: CLEAN VELVET OBSIDIAN CREED                */}
        {/* ==================================================== */}
        <div
          ref={scene5TextRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none opacity-0 z-30 px-6 bg-[#070605]"
        >
          {/* Soft ambient golden dust aura */}
          <div className="absolute w-[60vw] h-[60vw] rounded-full bg-radial from-[#C6A15B]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

          <div className="text-center max-w-4xl space-y-6 relative z-10">
            <div className="flex items-center justify-center gap-4">
              <span className="w-10 h-[1px] bg-[#C6A15B]/60" />
              <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.5em] text-[#C6A15B]">
                The Aurelia Creed
              </span>
              <span className="w-10 h-[1px] bg-[#C6A15B]/60" />
            </div>

            {/* Mask-Revealed Staggered Headline on Deep Pure Obsidian */}
            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F5F0E8] font-light tracking-tight leading-[0.92]">
              <div className="overflow-hidden py-1">
                <div ref={scene5Word1Ref} className="will-change-transform">
                  CRAFTED
                </div>
              </div>
              <div className="overflow-hidden py-1">
                <div ref={scene5Word2Ref} className="will-change-transform">
                  TO BE
                </div>
              </div>
              <div className="overflow-hidden py-1">
                <div ref={scene5Word3Ref} className="italic will-change-transform">
                  <span className="animate-gold-shimmer inline-block">
                    REMEMBERED.
                  </span>
                </div>
              </div>
            </h2>

            <div className="pt-4 max-w-md mx-auto">
              <p className="text-[10px] md:text-xs font-light text-[#F5F0E8]/70 tracking-[0.35em] uppercase border-t border-white/10 pt-4">
                Beyond Ornament · Into Immortality
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* SCENE 06: MONOGRAM CLOSURE & HERO RELEASE (CINEMATIC) */}
        {/* ==================================================== */}
        <div
          ref={scene6LogoRef}
          className="absolute inset-0 w-full h-full bg-[#070605] flex flex-col items-center justify-center pointer-events-none opacity-0 z-40 px-6 overflow-hidden select-none"
        >
          {/* Cinematic Radial Aura Bloom */}
          <div
            ref={scene6AuraRef}
            className="absolute w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full pointer-events-none will-change-transform blur-2xl opacity-0"
            style={{
              background:
                "radial-gradient(circle, rgba(198,161,91,0.22) 0%, rgba(198,161,91,0.08) 45%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Monogram with Macro Descent Reveal */}
            <div ref={scene6MonogramRef} className="will-change-transform mb-6">
              <BrandLogo variant="monogram" size="lg" />
            </div>

            {/* Title with Anamorphic Letter-Spacing Expansion */}
            <h2
              ref={scene6TitleRef}
              className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F5F0E8] font-light uppercase tracking-[0.28em] will-change-transform"
            >
              Aurelia
            </h2>

            {/* Subtitle with Gold Tracking */}
            <p
              ref={scene6SubtitleRef}
              className="text-[11px] md:text-xs font-sans uppercase tracking-[0.5em] text-[#C6A15B] mt-4 will-change-transform"
            >
              Jewels of Eternity
            </p>

            {/* Center-Expanding Divider Line with Diamond Accent */}
            <div
              ref={scene6LineRef}
              className="flex items-center justify-center gap-3 my-7 will-change-transform"
            >
              <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C6A15B]/70" />
              <span className="text-[8px] text-[#C6A15B]">◆</span>
              <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C6A15B]/70" />
            </div>

            {/* Collection Runway Invite with Floating Arrow */}
            <div ref={scene6HintRef} className="will-change-transform">
              <span className="text-[11px] font-sans tracking-[0.35em] text-[#F5F0E8]/60 uppercase flex items-center gap-2">
                The Collection Runway Awaits
                <span className="inline-block animate-bounce text-[#C6A15B]">↓</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
