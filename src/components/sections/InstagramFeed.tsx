"use client";

import { motion } from "framer-motion";
import { Camera, ExternalLink, Play } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const placeholderColors = [
  "from-[#1a2a4a] to-[#2A4A7F]",
  "from-[#111D35] to-[#1a3060]",
  "from-[#0d1f3c] to-[#2A4A7F]",
  "from-[#1a2a4a] to-[#111D35]",
  "from-[#0A1628] to-[#2A4A7F]",
  "from-[#111D35] to-[#0A1628]",
];

export default function InstagramFeed() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111D35]/30">
      <div className="max-w-7xl mx-auto">
        {/* Instagram */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <ExternalLink size={24} className="text-[#C0C8D8]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-[Outfit]">
              Follow Our Work
            </h2>
          </div>
          <p className="text-[#3B82F6] font-medium">{SITE_CONFIG.instagramHandle}</p>
        </motion.div>

        <motion.a
          href={SITE_CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {placeholderColors.map((gradient, i) => (
              <motion.div
                key={i}
                className={`aspect-square rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center border border-white/5 overflow-hidden group cursor-pointer`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ scale: 1.03, borderColor: "rgba(59,130,246,0.4)" }}
              >
                <div className="flex flex-col items-center gap-2 text-[#C0C8D8]/40 group-hover:text-[#C0C8D8]/70 transition-colors duration-300">
                  <Camera size={28} />
                  <span className="text-xs">Coming Soon</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.a>

        <motion.p
          className="text-center text-[#C0C8D8] text-sm mt-6 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Real posts coming soon — follow us on Instagram!
        </motion.p>

        {/* YouTube */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Play size={24} className="text-[#FF4444]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-[Outfit]">
              Watch Us Print
            </h2>
          </div>
          <p className="text-[#C0C8D8] font-medium">{SITE_CONFIG.youtubeHandle}</p>
        </motion.div>

        <motion.a
          href={SITE_CONFIG.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="aspect-video rounded-2xl bg-gradient-to-br from-[#1a0a0a] to-[#3a0a0a] flex flex-col items-center justify-center border border-white/5 group cursor-pointer overflow-hidden relative"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(255,68,68,0.3)" }}
              >
                <div className="w-12 h-12 rounded-full bg-[#FF4444]/20 border border-[#FF4444]/30 flex items-center justify-center mb-3 group-hover:bg-[#FF4444]/30 transition-colors duration-300">
                  <Play size={20} className="text-[#FF4444] ml-0.5" />
                </div>
                <span className="text-[#C0C8D8]/50 text-xs group-hover:text-[#C0C8D8]/70 transition-colors duration-300">Video coming soon</span>
              </motion.div>
            ))}
          </div>
        </motion.a>

        <motion.p
          className="text-center text-[#C0C8D8] text-sm mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Subscribe for behind-the-scenes content, timelapse prints, and new model reveals.
        </motion.p>
      </div>
    </section>
  );
}
