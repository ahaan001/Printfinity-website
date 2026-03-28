"use client";

import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

const PHOTOS = [
  { src: "/images/printed-dragon.jpg", alt: "Articulated dragon print" },
  { src: "/images/printed-keychain.jpg", alt: "Custom keychains" },
  { src: "/images/printed-knight.jpg", alt: "Knight figurine print" },
  { src: "/images/printed-cartoons.jpg", alt: "Cartoon figurines" },
  { src: "/images/printed-f1logo.jpg", alt: "F1 logo print" },
  { src: "/images/printed-cat.jpg", alt: "Cat figurine print" },
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
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-2xl bg-[#111D35] border border-white/5 overflow-hidden group cursor-pointer relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ scale: 1.03, borderColor: "rgba(59,130,246,0.4)" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
          See more of our work on Instagram.
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            "fqTqapC223Y",
            "wyDMsi77tZk",
            "54rNmKxEEDM",
          ].map((videoId, i) => (
            <motion.a
              key={videoId}
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-video rounded-2xl bg-[#1a0a0a] border border-white/5 overflow-hidden group cursor-pointer relative block"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, borderColor: "rgba(255,68,68,0.3)" }}
            >
              <Image
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={`Printfinity video ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#FF4444]/80 group-hover:bg-[#FF4444] transition-colors duration-300 flex items-center justify-center shadow-lg">
                  <Play size={20} className="text-white ml-0.5" fill="white" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

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
