import Hero from "@/sections/Hero";
import Trust from "@/sections/Trust";
import FeatureGrid from "@/sections/FeatureGrid";
import Architecture from "@/sections/Architecture";
import Showcase from "@/sections/Showcase";
import Benchmarks from "@/sections/Benchmarks";
import Testimonials from "@/sections/Testimonials";
import CTASection from "@/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <FeatureGrid />
      <Architecture />
      <Showcase />
      <Benchmarks />
      <Testimonials />
      <CTASection />
    </>
  );
}
