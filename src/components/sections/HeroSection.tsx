"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";
import Link from "next/link";

const HeroModel = dynamic(() => import("@/components/three/HeroModel"), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection() {
  const { openOrderModal } = useModal();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D background */}
      <HeroModel />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 via-[#0A1628]/30 to-[#0A1628] pointer-events-none" />

      {/* Floating geometric shapes (CSS) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#3B82F6]/30"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
            Premium 3D Printing in India
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-[Outfit] tracking-tight leading-none mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Precision.{" "}
          <span className="bg-gradient-to-r from-[#C0C8D8] to-[#3B82F6] bg-clip-text text-transparent">
            Crafted.
          </span>{" "}
          Delivered.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-[#C0C8D8] max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Turning concepts into reality with precision and care, premium 3D printing services in India.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => openOrderModal()}
            className="w-full sm:w-auto"
          >
            Get a Quote
            <ArrowRight size={20} />
          </Button>
          <Link href="/gallery" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full">
              Explore Gallery
              <ChevronRight size={20} />
            </Button>
          </Link>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#C0C8D8]/30 flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-[#C0C8D8]/60" />
        </div>
      </motion.div>
    </section>
  );
}
