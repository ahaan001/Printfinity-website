"use client";

import { motion } from "framer-motion";
import { Images, MessageCircle } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/constants";

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[Outfit] mb-4">
            Pricing
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#C9A84C] to-[#3B82F6] rounded-full mx-auto mb-4" />
          <p className="text-[#C0C8D8] max-w-xl mx-auto">
            Simple, transparent pricing. Choose a gallery design or bring your own.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gallery Piece */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#111D35] border border-[#C9A84C]/40 rounded-2xl p-8 flex flex-col hover:border-[#C9A84C]/70 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(201,168,76,0.1)]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mb-5">
              <Images size={22} className="text-[#C9A84C]" />
            </div>
            <span className="text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-3">
              Fixed pricing
            </span>
            <h2 className="text-2xl font-bold text-white font-[Outfit] mb-3">
              Gallery Piece
            </h2>
            <p className="text-[#C0C8D8] leading-relaxed mb-8 flex-1">
              Browse our gallery for ready-to-print designs. Every model has a fixed price listed — no surprises, no back-and-forth.
            </p>
            <Link href="/gallery">
              <Button variant="primary" size="lg" className="w-full">
                View Gallery
              </Button>
            </Link>
          </motion.div>

          {/* Custom Piece */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#111D35] border border-[#3B82F6]/40 rounded-2xl p-8 flex flex-col hover:border-[#3B82F6]/70 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(59,130,246,0.1)]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-5">
              <MessageCircle size={22} className="text-[#3B82F6]" />
            </div>
            <span className="text-xs font-semibold tracking-widest text-[#3B82F6] uppercase mb-3">
              Quote on request
            </span>
            <h2 className="text-2xl font-bold text-white font-[Outfit] mb-3">
              Custom Piece
            </h2>
            <p className="text-[#C0C8D8] leading-relaxed mb-8 flex-1">
              Have your own design or something unique in mind? Send us your file or describe your idea and we'll quote you directly.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="w-full gap-2">
                <MessageCircle size={18} />
                Chat on WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
