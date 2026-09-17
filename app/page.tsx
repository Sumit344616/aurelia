"use client";

import React, { useState } from "react";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CollectionRunway from "@/components/CollectionRunway";
import RingExperience from "@/components/RingExperience";
import NecklaceSection from "@/components/NecklaceSection";
import EarringSection from "@/components/EarringSection";
import BraceletSection from "@/components/BraceletSection";
import StoneStory from "@/components/StoneStory";
import CraftSection from "@/components/CraftSection";
import AtelierQuiet from "@/components/AtelierQuiet";
import BrandStory from "@/components/BrandStory";
import CampaignStack from "@/components/CampaignStack";
import SignaturePiece from "@/components/SignaturePiece";
import BridalSection from "@/components/BridalSection";
import SocialProof from "@/components/SocialProof";
import JournalSection from "@/components/JournalSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ConsultationDrawer from "@/components/ConsultationDrawer";

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [selectedPieceForConsultation, setSelectedPieceForConsultation] =
    useState<string>("");

  const handleOpenConsultation = (pieceName?: string) => {
    setSelectedPieceForConsultation(pieceName || "");
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      
      {/* Floating Transparent Luxury Header */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      <main className="relative w-full bg-[#0B0A08] text-[#F5F0E8] overflow-hidden">
        {/* The 7 Signature Moments & Continuous Visual Story */}
        <Hero />

        <CollectionRunway
          onSelectPiece={(name) => handleOpenConsultation(name)}
        />

        <RingExperience
          onEnquireRing={(details) =>
            handleOpenConsultation(details || "The Imperial Solitaire Ring")
          }
        />

        <NecklaceSection />

        <EarringSection />

        <BraceletSection />

        <StoneStory />

        <CraftSection />

        <AtelierQuiet />

        <BrandStory />

        <CampaignStack />

        <SignaturePiece
          onEnquire={(name) => handleOpenConsultation(name)}
        />

        <BridalSection />

        <SocialProof />

        <JournalSection />

        <FinalCTA onOpenConsultation={() => handleOpenConsultation()} />
      </main>

      <Footer />

      {/* Private Consultation Enquiry Drawer */}
      <ConsultationDrawer
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
        initialInterest={selectedPieceForConsultation}
      />
    </SmoothScroll>
  );
}
