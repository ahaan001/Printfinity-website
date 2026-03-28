"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ImageOff } from "lucide-react";
import Card from "@/components/ui/Card";

const testimonials = [
  {
    quote:
      "The print quality exceeded my expectations. Smooth finish and perfect dimensions. I ordered a custom mechanical housing and it fit perfectly on the first try.",
    name: "Arjun M.",
    city: "Mumbai",
    stars: 5,
  },
  {
    quote:
      "Fast delivery and great communication throughout. I was kept in the loop at every stage. Will definitely order again — already placed my second order!",
    name: "Priya S.",
    city: "Bangalore",
    stars: 5,
  },
  {
    quote:
      "Custom figurine came out absolutely amazing. The detail on the face was incredible — better than I'd seen from much more expensive services. Truly premium work.",
    name: "Rohan K.",
    city: "Delhi",
    stars: 5,
  },
];

const printShowcase = [
  { src: "/images/printed-boat.jpg", label: "Printed Boat", gradient: "from-[#0d2040] to-[#1a3a6a]" },
  { src: "/images/printed-shark.jpg", label: "Printed Shark", gradient: "from-[#0d1a30] to-[#1a2a50]" },
  { src: "/images/printed-vase.jpg", label: "Printed Vase", gradient: "from-[#111D35] to-[#2A4A7F]" },
];

function PrintImage({ src, label, gradient }: { src: string; label: string; gradient: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <div className="text-center">
            <ImageOff size={28} className="text-[#C0C8D8]/30 mx-auto mb-2" />
            <p className="text-[#C0C8D8]/40 text-xs">Image coming soon</p>
          </div>
        </div>
      )}
      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-white text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
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
            What Our Customers Say
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#C9A84C] to-[#3B82F6] rounded-full mx-auto" />
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Card className="p-8 h-full relative border-l-2 border-l-[#C9A84C]">
                <Quote size={28} className="text-[#C9A84C]/40 mb-4" />
                <p className="text-[#E8ECF2] italic leading-relaxed mb-6 text-sm">
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold font-[Outfit]">{t.name}</p>
                    <p className="text-[#C0C8D8] text-xs">{t.city}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(t.stars)].map((_, s) => (
                      <Star key={s} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Print showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white font-[Outfit] text-center mb-6">
            From Our Print Bed
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {printShowcase.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <PrintImage {...item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
