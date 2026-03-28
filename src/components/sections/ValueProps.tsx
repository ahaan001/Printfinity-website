"use client";

import { motion } from "framer-motion";
import { Layers, Clock, Palette, Shield, Star, Zap } from "lucide-react";
import Card from "@/components/ui/Card";

const props = [
  {
    icon: Layers,
    title: "Exceptional Quality",
    description:
      "Every print is precision-calibrated for dimensional accuracy, strong layer adhesion, and a clean surface finish , ready to use right out of the box.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Standard orders ship in 3–7 days. Need it faster? Our rush service gets you printed and dispatched within 48 hours. We respect your deadlines.",
  },
  {
    icon: Palette,
    title: "Custom & Ready-Made",
    description:
      "Choose from our curated gallery of ready-to-print models, or bring your own design. We handle STL, OBJ, and 3MF files with zero fuss.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description:
      "Every print is inspected before dispatch. Dimensional accuracy, layer adhesion, surface finish , we check it all so you receive exactly what you ordered.",
  },
  {
    icon: Star,
    title: "Premium Materials",
    description:
      "We stock food-safe PLA, engineering-grade PETG, and impact-resistant ABS. All filaments are sourced from verified suppliers for consistent, reliable results.",
  },
  {
    icon: Zap,
    title: "Pan-India Delivery",
    description:
      "Secure, padded packaging ships to every corner of India. Track your order in real-time and receive it safely, no matter where you are.",
  },
];

export default function ValueProps() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[Outfit] mb-4">
            Why Printfinity?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3B82F6] to-[#C0C8D8] rounded-full mx-auto mb-4" />
          <p className="text-[#C0C8D8] max-w-xl mx-auto">
            We obsess over every detail so your print comes out exactly as imagined.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.map((prop, i) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card hoverable className="p-8 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center mb-5">
                    <Icon size={24} className="text-[#3B82F6]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 font-[Outfit]">
                    {prop.title}
                  </h3>
                  <p className="text-[#C0C8D8] text-sm leading-relaxed">{prop.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
