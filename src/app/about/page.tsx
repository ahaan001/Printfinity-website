"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Leaf, Heart, ArrowRight, User } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useModal } from "@/context/ModalContext";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Every print is inspected before shipping. We don't compromise.",
  },
  {
    icon: MapPin,
    title: "Made in India",
    description: "Supporting local manufacturing with fast, reliable delivery nationwide.",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious",
    description: "We prioritize sustainable PLA and minimize material waste in every print.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Direct WhatsApp support, transparent pricing, and no hidden fees.",
  },
];

function FounderPhoto() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <User size={64} className="text-[#C0C8D8]/30" />
      </div>
    );
  }

  return (
    <Image
      src="/images/founder-face.jpg"
      alt="Keya Mehta, Founder of Printfinity"
      fill
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export default function AboutPage() {
  const { openOrderModal } = useModal();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white font-[Outfit] mb-4">
            About Printfinity
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3B82F6] to-[#C9A84C] rounded-full mx-auto mb-4" />
          <p className="text-[#C0C8D8] text-xl">
            Bringing ideas to life, one layer at a time.
          </p>
        </motion.div>

        {/* Who We Are */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-24">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white font-[Outfit] mb-6">Who We Are</h2>
            <div className="space-y-4 text-[#C0C8D8] leading-relaxed">
              <p>
                Printfinity brings ideas to life. We provide 3D printing services for a wide range of
                needs, whether you are developing a prototype, manufacturing custom components, or
                creating a truly unique product, we turn concepts into reality with precision and care.
              </p>
              <p>
                We work with supplied files, develop fully custom designs, and model products tailored
                to your specific requirements. In addition to bespoke printing services, we also offer
                a diverse range of ready-to-order 3D-printed products.
              </p>
              <p>
                Our aim is to support creativity, innovation, and the growth of ideas by making
                high-quality 3D printing accessible and reliable.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 aspect-video rounded-3xl overflow-hidden border border-white/10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <iframe
              src="https://www.youtube.com/embed/fqTqapC223Y"
              title="Printfinity workshop in action"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </div>

        {/* Founder Section */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white font-[Outfit] mb-10 text-center">
            The Story Behind Printfinity
          </h2>

          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Founder Photo */}
            <motion.div
              className="shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-[#C9A84C]/40 shadow-[0_0_40px_rgba(201,168,76,0.15)] relative bg-[#111D35]">
                <FounderPhoto />
              </div>
            </motion.div>

            {/* Founder Text */}
            <motion.div
              className="border-l-2 border-[#C9A84C]/50 pl-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">
                Founder
              </p>
              <h3 className="text-2xl font-bold text-white font-[Outfit] mb-6">Keya Mehta</h3>
              <div className="space-y-4 text-[#C0C8D8] leading-relaxed">
                <p>
                  Printfinity was founded by Keya Mehta, an innovator, maker, and problem-solver
                  driven by an obsession with turning ideas into tangible things.
                </p>
                <p>
                  It started with a spark: a 3D printing course that revealed the extraordinary
                  potential of additive manufacturing. What began as curiosity quickly became a craft, designing model after model, learning the science behind every layer, every material,
                  every setting. That journey led to investing in a professional FDM printer and
                  launching Printfinity with a clear mission: to make custom manufacturing accessible
                  to anyone with an idea.
                </p>
                <p>
                  Printfinity is built on the belief that great ideas deserve great execution, and
                  that the barrier between concept and creation should be as thin as a single printed
                  layer.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative rounded-3xl p-12 md:p-16 text-center border border-[#C9A84C]/20 bg-[#C9A84C]/5 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#C9A84C]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="text-[#C9A84C] text-6xl font-serif leading-none mb-4">"</div>
              <p className="text-xl md:text-2xl text-white font-[Outfit] font-medium leading-relaxed max-w-3xl mx-auto">
                Our mission is to democratize manufacturing, making custom 3D printing accessible,
                affordable, and exceptional for everyone in India.
              </p>
              <div className="mt-6 w-16 h-0.5 bg-[#C9A84C]/40 rounded-full mx-auto" />
            </div>
          </div>
        </motion.div>

        {/* Why Printfinity */}
        <div className="mb-24">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white font-[Outfit] mb-4">Why Printfinity?</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#3B82F6] to-[#C0C8D8] rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card hoverable className="p-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                      <Icon size={24} className="text-[#3B82F6]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white font-[Outfit] mb-2">{item.title}</h3>
                    <p className="text-[#C0C8D8] text-sm leading-relaxed">{item.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white font-[Outfit] mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-[#C0C8D8] mb-8">Join our growing community of makers across India.</p>
          <Button variant="primary" size="lg" onClick={() => openOrderModal()} className="gap-2">
            Get a Quote
            <ArrowRight size={20} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
