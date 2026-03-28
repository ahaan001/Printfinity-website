export const SITE_CONFIG = {
  name: "Printfinity",
  tagline: "Precision. Crafted. Delivered.",
  description: "Turning concepts into reality with precision and care , premium 3D printing services in India",
  whatsappNumber: "919322277415",
  whatsappMessage: "Hi Printfinity! I'd like to inquire about 3D printing services.",
  instagramHandle: "@printfinity.store",
  instagramUrl: "https://www.instagram.com/printfinity.store",
  youtubeUrl: "https://www.youtube.com/@Printfinity",
  youtubeHandle: "@Printfinity",
  email: "hello@printfinity.in",
  currency: "₹",
  locale: "en-IN",
};

export const WHATSAPP_URL = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
];

export const PRODUCT_CATALOG = [
  { id: "twister-small", name: "Twister (Small)", price: 100, description: "Compact twist fidget toy, smooth action" },
  { id: "custom-keychain", name: "Custom Keychains", price: 200, description: "Personalized keychain printed to your design" },
  { id: "twister-large", name: "Twister (Large)", price: 250, description: "Full-size twist fidget toy with satisfying snap" },
  { id: "fidget-ball", name: "Transforming Fidget Ball", price: 200, description: "Ball that transforms into a star , mesmerising" },
  { id: "articulated-dragon", name: "Articulated Dragon / Shark", price: 200, description: "Flexible, fully articulated print-in-place figure" },
  { id: "hexagon-fidget", name: "Hexagon Fidget Toy", price: 200, description: "Satisfying hex grid fidget with interlocking pieces" },
  { id: "planter", name: "Planter", price: 1200, description: "Stylish plant pot with drainage, perfect for succulents" },
];
