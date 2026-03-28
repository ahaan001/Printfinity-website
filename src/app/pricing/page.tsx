"use client";

import { motion } from "framer-motion";
import { Info, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL, PRODUCT_CATALOG } from "@/lib/constants";
import { useModal } from "@/context/ModalContext";

export default function PricingPage() {
  const { openOrderModal } = useModal();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[Outfit] mb-4">
            Our Products
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3B82F6] to-[#C0C8D8] rounded-full mx-auto mb-4" />
          <p className="text-[#C0C8D8] max-w-xl mx-auto">
            Fixed prices, no surprises. Pick what you want and we'll handle the rest.
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {PRODUCT_CATALOG.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col hover:border-white/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(10,22,40,0.5)]"
            >
              <h3 className="text-white font-semibold font-[Outfit] mb-1 leading-tight">{product.name}</h3>
              <p className="text-[#C0C8D8] text-xs leading-relaxed mb-4 flex-1">{product.description}</p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white font-mono">₹{product.price}</span>
              </div>
              <Button
                variant="primary"
                size="md"
                className="w-full text-sm"
                onClick={() => openOrderModal("", product.id)}
              >
                Order Now
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Custom order card */}
        <motion.div
          className="bg-[#111D35] border border-[#C9A84C]/30 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 className="text-white font-semibold font-[Outfit] mb-1">Need something custom?</h3>
            <p className="text-[#C0C8D8] text-sm">Every quote is tailored to your project — size, material, color, quantity.</p>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Button variant="secondary" size="md" className="gap-2 whitespace-nowrap">
              <MessageCircle size={16} />
              Chat on WhatsApp
            </Button>
          </a>
        </motion.div>

        {/* Info note */}
        <motion.div
          className="flex items-start gap-3 bg-[#3B82F6]/5 border border-[#3B82F6]/20 rounded-2xl p-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Info size={18} className="text-[#3B82F6] mt-0.5 shrink-0" />
          <p className="text-[#C0C8D8] text-sm leading-relaxed">
            Prices shown are per unit. Final quotes account for quantity, color, and any special requirements.
            Max single-piece build: <span className="text-white font-mono">256mm × 256mm × 256mm</span>.
            Larger designs are split across multiple parts at no extra charge.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
