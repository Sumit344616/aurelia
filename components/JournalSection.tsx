"use client";

import React from "react";
import Image from "next/image";

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  image: string;
}

const ARTICLES: Article[] = [
  {
    id: "01",
    title: "The Language of Diamonds: Deciphering Light and Internal Geometry",
    category: "Gemology Essay",
    readTime: "5 Min Read",
    summary:
      "Why brilliance is not merely a question of carat weight, but an equation of pavilion depth, light dispersion, and microscopic symmetry.",
    image: "/images/hero-crystalline-refraction.jpg",
  },
  {
    id: "02",
    title: "Behind the Craft: 400 Years of Place Vendôme & Rajputana Goldsmithing",
    category: "Atelier Chronicle",
    readTime: "7 Min Read",
    summary:
      "How ancient Kundan foil backing methods converge with contemporary Paris setting techniques to create modern heirlooms.",
    image: "/images/craft-atelier-hands.jpg",
  },
  {
    id: "03",
    title: "Why Gold Endures: The Alchemy of 18K Champagne Alloy",
    category: "Materiality",
    readTime: "4 Min Read",
    summary:
      "A deep exploration of our bespoke warm champagne gold alloy—softer than yellow gold, warmer than white gold, entirely timeless.",
    image: "/images/collection-cuff-bracelet.jpg",
  },
  {
    id: "04",
    title: "The Art of Giving: Curating Heirlooms for the Next Century",
    category: "High Jewellery Salon",
    readTime: "6 Min Read",
    summary:
      "A dialogue on how pieces are commissioned to celebrate watershed triumphs, birthrights, and unspoken devotions.",
    image: "/images/hero-necklace-portrait.jpg",
  },
];

export default function JournalSection() {
  return (
    <section
      id="journal"
      className="relative w-full py-28 md:py-40 bg-[#0E0D0B] text-[#F5F0E8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Top Editorial Label */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8 mb-16 gap-6">
          <div>
            <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.45em] text-[#C6A15B]">
              Editorial Gazette
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl text-[#F5F0E8] font-light mt-2 tracking-tight">
              THE <span className="italic text-[#C6A15B]">JOURNAL.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#F5F0E8]/60 font-light leading-relaxed">
            Essays on rare gemology, atelier heritage, and the cultural
            narratives woven into noble metals.
          </p>
        </div>

        {/* Magazine Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group cursor-pointer flex flex-col space-y-6"
            >
              {/* Image Container with Gentle Zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#141310] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-[#0B0A08]/80 backdrop-blur-sm px-3 py-1 border border-white/10 text-[9px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]">
                  {article.category}
                </div>
              </div>

              {/* Title & Excerpt */}
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-[10px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/40">
                  <span>Edition No. {article.id}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] font-light group-hover:text-[#C6A15B] transition-colors leading-tight">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#F5F0E8]/65 font-light line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs uppercase font-sans tracking-[0.25em] text-[#C6A15B]">
                  <span>Read Feature</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
