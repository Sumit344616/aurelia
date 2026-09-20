"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  image: string;
}

const FEATURED_ARTICLES: Article[] = [
  {
    id: "01",
    title: "The Language of Diamonds: Deciphering Internal Facet Geometry",
    category: "Gemology Essay",
    readTime: "5 Min Read",
    summary:
      "Why brilliance is not merely a question of carat weight, but an exact equation of pavilion angles, internal light dispersion, and microscopic facet symmetry.",
    image: "/images/journal-diamond-geometry.jpg",
  },
  {
    id: "02",
    title: "Behind the Craft: 400 Years of Place Vendôme & Rajputana Goldsmithing",
    category: "Atelier Chronicle",
    readTime: "7 Min Read",
    summary:
      "How ancient Kundan pure gold foil backing methods converge with contemporary Paris micro-pavé setting techniques to create modern museum-grade heirlooms.",
    image: "/images/journal-craft-heritage.jpg",
  },
];

export default function JournalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
      ).fromTo(
        cardsRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journal"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[960px] flex flex-col justify-center py-6 sm:py-10 lg:py-12 bg-[#0E0D0B] text-[#F5F0E8] overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center h-full">
        {/* Top Editorial Header with ample navbar clearance */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-4 mb-6 sm:mb-8 gap-4 shrink-0 pt-2 sm:pt-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-[1px] bg-[#C6A15B]" />
              <span className="text-[9px] uppercase font-sans tracking-[0.4em] text-[#C6A15B]">
                Editorial Gazette
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] font-light tracking-tight leading-none">
              THE <span className="italic text-[#C6A15B]">JOURNAL.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs text-[#F5F0E8]/60 font-light leading-relaxed">
            Essays on rare gemology, atelier heritage, and the cultural narratives woven into noble metals.
          </p>
        </div>

        {/* Magazine Feature Diptych Grid (Fits Single Screen Perfectly) */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch flex-1 min-h-0"
        >
          {FEATURED_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group cursor-pointer rounded-sm border border-white/10 bg-[#12110E] hover:border-[#C6A15B]/50 transition-all duration-700 shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden"
            >
              {/* Image Container with Smooth Zoom */}
              <div className="relative h-[230px] sm:h-[280px] lg:h-[310px] w-full overflow-hidden bg-[#161513] shrink-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-95"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12110E] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A08]/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-[#0B0A08]/85 backdrop-blur-md px-3 py-1 border border-white/15 rounded-[1px] text-[9px] uppercase font-sans tracking-[0.25em] text-[#C6A15B] flex items-center gap-1.5">
                  <BookOpen className="w-2.5 h-2.5 text-[#C6A15B]" />
                  {article.category}
                </div>

                {/* Edition & Read Time Overlay */}
                <div className="absolute top-4 right-4 text-[9px] font-sans tracking-[0.2em] text-[#F5F0E8]/60 bg-[#0B0A08]/80 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded-[1px] flex items-center gap-1.5">
                  <Clock className="w-2.5 h-2.5 text-[#C6A15B]/70" />
                  {article.readTime}
                </div>
              </div>

              {/* Title, Excerpt & Action */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-3 bg-[#12110E]">
                <div className="space-y-2">
                  <div className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]/80">
                    Edition No. {article.id}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#F5F0E8] font-light group-hover:text-[#C6A15B] transition-colors duration-300 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#F5F0E8]/65 font-light leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                {/* Read Action Bar */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs uppercase font-sans tracking-[0.25em] text-[#C6A15B]">
                  <span className="text-[10px] tracking-[0.3em] font-medium">Read Full Feature</span>
                  <div className="w-7 h-7 rounded-full border border-[#C6A15B]/40 flex items-center justify-center transition-all duration-300 group-hover:border-[#C6A15B] group-hover:bg-[#C6A15B]/15">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
