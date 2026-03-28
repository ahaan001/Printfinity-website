"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Box, ExternalLink } from "lucide-react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import models from "@/data/models.json";

const CATEGORIES = ["All", ...Array.from(new Set(models.map(m => m.category)))];

const CATEGORY_GRADIENTS: Record<string, string> = {
  "Home Decor": "from-[#0f2922] to-[#065f46]",
  "Figurine": "from-[#2d1b4e] to-[#4c1d95]",
  "Mechanical Part": "from-[#111D35] to-[#1e3a8a]",
  "Art": "from-[#2d2000] to-[#78350f]",
  "Gadget": "from-[#1a2240] to-[#1e3a8a]",
  "Custom": "from-[#2d1a00] to-[#92400e]",
};

function getCategoryGradient(category: string): string {
  return CATEGORY_GRADIENTS[category] ?? "from-[#111D35] to-[#2A4A7F]";
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? models
    : models.filter(m => m.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[Outfit] mb-4">
            Model Gallery
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3B82F6] to-[#C0C8D8] rounded-full mx-auto mb-4" />
          <p className="text-[#C0C8D8] max-w-xl mx-auto">
            Browse our curated collection of ready-to-print 3D models. Click any model to view it interactively in 3D.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#3B82F6] text-white shadow-[0_0_16px_rgba(59,130,246,0.3)]"
                  : "bg-white/5 border border-white/10 text-[#C0C8D8] hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((model, i) => (
              <motion.div
                key={model.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link href={`/gallery/${model.id}`}>
                  <Card hoverable className="overflow-hidden group cursor-pointer">
                    {/* Thumbnail */}
                    <div className={`aspect-square bg-gradient-to-br ${getCategoryGradient(model.category)} flex items-center justify-center relative overflow-hidden`}>
                      {model.thumbnail ? (
                        <Image
                          src={model.thumbnail}
                          alt={model.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <>
                          <Box size={64} className="text-white/10" />
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                        </>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm font-medium bg-[#3B82F6]/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
                          {model.file ? "View in 3D" : "Order Now"}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white font-[Outfit] leading-tight">
                          {model.name}
                        </h3>
                        <ExternalLink size={14} className="text-[#C0C8D8]/40 shrink-0 mt-0.5" />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="default">{model.category}</Badge>
                        {model.price && (
                          <span className="text-[#C9A84C] text-xs font-mono font-bold">₹{model.price}</span>
                        )}
                      </div>
                      <p className="text-[#C0C8D8] text-xs leading-relaxed line-clamp-2">
                        {model.description}
                      </p>
                      <p className="text-[#C0C8D8]/40 text-xs mt-3">via {model.source}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Box size={48} className="text-[#C0C8D8]/20 mx-auto mb-4" />
            <p className="text-[#C0C8D8]">No models in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
