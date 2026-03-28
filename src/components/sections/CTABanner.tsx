"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";

export default function CTABanner() {
  const { openOrderModal } = useModal();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, #2A4A7F 0%, #111D35 50%, #0A1628 100%)",
            boxShadow: "0 20px 80px rgba(10,22,40,0.6)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #C0C8D8 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }} />
          </div>

          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#3B82F6]/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white font-[Outfit] mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to Bring Your Idea to Life?
            </motion.h2>
            <motion.p
              className="text-[#C0C8D8] text-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Get a free quote in under 2 minutes. No commitment, no fuss.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => openOrderModal()}
                className="shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              >
                Get a Quote
                <ArrowRight size={20} />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
