import HeroSection from "@/components/sections/HeroSection";
import InstagramFeed from "@/components/sections/InstagramFeed";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InstagramFeed />
      <ProcessTimeline />
      <Testimonials />
      <CTABanner />
    </>
  );
}
