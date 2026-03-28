"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Upload, MessageCircle } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";
import { SITE_CONFIG, WHATSAPP_URL, PRODUCT_CATALOG } from "@/lib/constants";
import models from "@/data/models.json";

const STEPS = ["Contact", "Print Type", "Details", "Product", "Review"];

const COLORS = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Red", hex: "#D32F2F" },
  { name: "Blue", hex: "#1976D2" },
  { name: "Green", hex: "#388E3C" },
  { name: "Yellow", hex: "#FBC02D" },
  { name: "Orange", hex: "#F57C00" },
  { name: "Pink", hex: "#E91E63" },
  { name: "Grey", hex: "#9E9E9E" },
  { name: "Purple", hex: "#7B1FA2" },
];

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  city: string;
  print_type: string;
  selected_model: string;
  custom_description: string;
  uploaded_file_name: string;
  material: string;
  quantity: number;
  color_preference: string;
  desired_size: string;
  additional_notes: string;
  selected_product: string;
}

const EMPTY_FORM: FormData = {
  full_name: "",
  email: "",
  phone: "",
  city: "",
  print_type: "",
  selected_model: "",
  custom_description: "",
  uploaded_file_name: "",
  material: "PLA",
  quantity: 1,
  color_preference: "",
  desired_size: "",
  additional_notes: "",
  selected_product: "",
};

function InputField({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div>
      <label className="block text-sm text-[#C0C8D8] mb-1.5">{label}</label>
      <input
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#C0C8D8]/40 focus:outline-none focus:border-[#3B82F6] transition-colors duration-200 text-sm"
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function TextareaField({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <label className="block text-sm text-[#C0C8D8] mb-1.5">{label}</label>
      <textarea
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#C0C8D8]/40 focus:outline-none focus:border-[#3B82F6] transition-colors duration-200 text-sm resize-none"
        rows={3}
        {...props}
      />
    </div>
  );
}

export default function OrderModal() {
  const { isOrderModalOpen, closeOrderModal, preSelectedModel, preSelectedProduct } = useModal();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    if (isOrderModalOpen) {
      setStep(0);
      setSubmitted(false);
      setErrors({});
      setForm({
        ...EMPTY_FORM,
        selected_model: preSelectedModel,
        selected_product: preSelectedProduct,
        print_type: preSelectedModel ? "gallery" : "",
      });
    }
  }, [isOrderModalOpen, preSelectedModel, preSelectedProduct]);

  const set = (key: keyof FormData, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  function validateStep(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (step === 0) {
      if (!form.full_name.trim()) e.full_name = "Name is required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
      if (!form.phone.trim()) e.phone = "Phone is required";
      if (!form.city.trim()) e.city = "City is required";
    }
    if (step === 1) {
      if (!form.print_type) e.print_type = "Please select a print type";
    }
    if (step === 3) {
      if (!form.selected_product) e.selected_product = "Please select a product";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setOrderId(data.orderId);
        setSubmitted(true);
      }
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      isOpen={isOrderModalOpen}
      onClose={closeOrderModal}
      title={submitted ? "Order Submitted!" : "Get a Quote"}
      size="lg"
    >
      <div className="px-6 pb-8">
        {!submitted ? (
          <>
            {/* Progress bar */}
            <div className="py-5">
              <div className="flex items-center justify-between mb-3">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex items-center gap-1 flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          i < step
                            ? "bg-[#3B82F6] text-white"
                            : i === step
                            ? "bg-[#3B82F6]/30 border-2 border-[#3B82F6] text-[#3B82F6]"
                            : "bg-white/5 border border-white/10 text-[#C0C8D8]"
                        }`}
                      >
                        {i < step ? <Check size={12} /> : i + 1}
                      </div>
                      <span className="text-[10px] text-[#C0C8D8] hidden sm:block whitespace-nowrap">
                        {label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`h-px flex-1 mx-1 transition-all duration-300 ${i < step ? "bg-[#3B82F6]" : "bg-white/10"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {step === 0 && (
                  <div className="space-y-4">
                    <InputField label="Full Name" value={form.full_name} onChange={e => set("full_name", e.target.value)} placeholder="Rahul Sharma" error={errors.full_name} />
                    <InputField label="Email Address" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="rahul@example.com" error={errors.email} />
                    <div>
                      <label className="block text-sm text-[#C0C8D8] mb-1.5">Phone Number</label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-3 bg-white/5 border border-white/10 rounded-xl text-[#C0C8D8] text-sm">+91</div>
                        <input className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#C0C8D8]/40 focus:outline-none focus:border-[#3B82F6] transition-colors text-sm" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="98765 43210" type="tel" />
                      </div>
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <InputField label="City / Location" value={form.city} onChange={e => set("city", e.target.value)} placeholder="Mumbai" error={errors.city} />
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-3">
                    {errors.print_type && <p className="text-red-400 text-sm">{errors.print_type}</p>}
                    {[
                      { id: "custom", label: "Custom Design", desc: "Describe what you want and we'll work with your vision" },
                      { id: "gallery", label: "From Gallery", desc: "Pick a model from our curated gallery" },
                      { id: "upload", label: "Upload Your File", desc: "Send us your STL, OBJ, or 3MF file" },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => set("print_type", opt.id)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 ${form.print_type === opt.id ? "border-[#3B82F6] bg-[#3B82F6]/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                      >
                        <p className="text-white font-medium">{opt.label}</p>
                        <p className="text-[#C0C8D8] text-xs mt-0.5">{opt.desc}</p>
                      </button>
                    ))}

                    {form.print_type === "gallery" && (
                      <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] text-sm"
                        value={form.selected_model}
                        onChange={e => set("selected_model", e.target.value)}
                      >
                        <option value="" className="bg-[#111D35]">Select a model...</option>
                        {models.map(m => (
                          <option key={m.id} value={m.name} className="bg-[#111D35]">{m.name}</option>
                        ))}
                      </select>
                    )}

                    {form.print_type === "custom" && (
                      <TextareaField label="Describe your design" value={form.custom_description} onChange={e => set("custom_description", e.target.value)} placeholder="Describe what you'd like printed, including dimensions, style, and any references..." />
                    )}

                    {form.print_type === "upload" && (
                      <div className="border-2 border-dashed border-white/20 rounded-2xl p-6 text-center">
                        <Upload size={28} className="text-[#C0C8D8] mx-auto mb-2" />
                        <p className="text-[#C0C8D8] text-sm mb-3">Upload your 3D model file</p>
                        <input
                          type="file"
                          accept=".stl,.obj,.3mf"
                          onChange={e => set("uploaded_file_name", e.target.files?.[0]?.name || "")}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-white text-sm cursor-pointer hover:bg-white/20 transition-colors">
                          Choose File
                        </label>
                        {form.uploaded_file_name && (
                          <p className="text-[#3B82F6] text-xs mt-2">{form.uploaded_file_name}</p>
                        )}
                        <p className="text-[#C0C8D8]/50 text-xs mt-2">Accepts .stl, .obj, .3mf</p>
                      </div>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm text-[#C0C8D8] mb-2">Material</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["PLA", "ABS", "PETG"].map(m => (
                          <button key={m} onClick={() => set("material", m)}
                            className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${form.material === m ? "border-[#3B82F6] bg-[#3B82F6]/10 text-white" : "border-white/10 text-[#C0C8D8] hover:border-white/20"}`}>
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-[#C0C8D8] mb-2">Color</label>
                      <div className="flex flex-wrap gap-3">
                        {COLORS.map(color => (
                          <button
                            key={color.name}
                            title={color.name}
                            onClick={() => set("color_preference", color.name)}
                            className={`w-8 h-8 rounded-full transition-all duration-200 ${
                              form.color_preference === color.name
                                ? "ring-2 ring-offset-2 ring-[#3B82F6] ring-offset-[#111D35] scale-110"
                                : "hover:scale-105"
                            } ${color.name === "White" ? "border border-white/20" : ""}`}
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>
                      {form.color_preference && (
                        <p className="text-[#C0C8D8] text-xs mt-2">{form.color_preference} selected</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-[#C0C8D8] mb-1.5">Quantity</label>
                      <input type="number" min={1} value={form.quantity} onChange={e => set("quantity", parseInt(e.target.value) || 1)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] text-sm" />
                    </div>
                    <InputField label="Desired Size" value={form.desired_size} onChange={e => set("desired_size", e.target.value)} placeholder="e.g. 15cm tall, 10cm wide" />
                    <TextareaField label="Additional Notes" value={form.additional_notes} onChange={e => set("additional_notes", e.target.value)} placeholder="Any special requirements, references, or instructions..." />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-2">
                    {errors.selected_product && <p className="text-red-400 text-sm mb-2">{errors.selected_product}</p>}
                    {PRODUCT_CATALOG.map(product => (
                      <button
                        key={product.id}
                        onClick={() => set("selected_product", product.id)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 ${form.selected_product === product.id ? "border-[#3B82F6] bg-[#3B82F6]/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold font-[Outfit]">{product.name}</span>
                          <span className="text-[#C9A84C] font-bold font-mono text-sm">₹{product.price}</span>
                        </div>
                        <p className="text-[#C0C8D8] text-xs mt-0.5">{product.description}</p>
                      </button>
                    ))}
                    <button
                      onClick={() => set("selected_product", "custom")}
                      className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 ${form.selected_product === "custom" ? "border-[#3B82F6] bg-[#3B82F6]/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold font-[Outfit]">Custom / Other</span>
                        <span className="text-[#C0C8D8] text-xs">Quote on request</span>
                      </div>
                      <p className="text-[#C0C8D8] text-xs mt-0.5">Something unique — we'll quote you</p>
                    </button>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <p className="text-[#C0C8D8] text-sm mb-4">Please review your order details before submitting.</p>
                    <div className="bg-white/5 rounded-2xl p-5 space-y-3 text-sm">
                      {[
                        ["Name", form.full_name],
                        ["Email", form.email],
                        ["Phone", `+91 ${form.phone}`],
                        ["City", form.city],
                        ["Print Type", form.print_type],
                        form.selected_model && ["Model", form.selected_model],
                        form.custom_description && ["Description", form.custom_description],
                        form.uploaded_file_name && ["File", form.uploaded_file_name],
                        ["Material", form.material],
                        ["Quantity", String(form.quantity)],
                        form.color_preference && ["Color", form.color_preference],
                        form.desired_size && ["Size", form.desired_size],
                        form.additional_notes && ["Notes", form.additional_notes],
                        form.selected_product && ["Product", PRODUCT_CATALOG.find(p => p.id === form.selected_product)?.name ?? form.selected_product],
                      ].filter(Boolean).map(([label, value]) => (
                        <div key={label as string} className="flex gap-3">
                          <span className="text-[#C0C8D8] w-24 shrink-0">{label}:</span>
                          <span className="text-white">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-5 border-t border-white/10">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
                className="gap-1"
              >
                <ChevronLeft size={18} />
                Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button variant="primary" size="md" onClick={() => { if (validateStep()) setStep(s => s + 1); }} className="gap-1">
                  Next
                  <ChevronRight size={18} />
                </Button>
              ) : (
                <Button variant="primary" size="md" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Request"}
                </Button>
              )}
            </div>
          </>
        ) : (
          /* Success state */
          <motion.div
            className="py-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-[#3B82F6]/20 border-2 border-[#3B82F6] flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <Check size={36} className="text-[#3B82F6]" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white font-[Outfit] mb-2">Request Submitted!</h3>
            {orderId && (
              <p className="text-[#C0C8D8] text-sm mb-1">Order ID: <span className="text-white font-mono">#{orderId}</span></p>
            )}
            <p className="text-[#C0C8D8] mb-8">
              We'll review your request and get back to you within 24 hours with a quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="md" className="gap-2 w-full sm:w-auto">
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </Button>
              </a>
              <Button variant="secondary" size="md" onClick={closeOrderModal} className="w-full sm:w-auto">
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </Modal>
  );
}
