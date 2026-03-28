import HeroSection from "@/components/sections/HeroSection";
import InstagramFeed from "@/components/sections/InstagramFeed";
import ValueProps from "@/components/sections/ValueProps";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InstagramFeed />
      <ValueProps />
      <ProcessTimeline />
      <Testimonials />
      <CTABanner />
    </>
  );
}
