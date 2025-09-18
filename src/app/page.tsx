import AppNav from "@/components/_core/AppNav";
import FaqSection from "@/views/home/FAQ";
import Footer from "@/views/home/Footer";
import FreeTrialSection from "@/views/home/FreeTrialSection";
import HeroSection from "@/views/home/HeroSection";
import Pricing from "@/views/home/Pricing";
import Testimonial from "@/views/home/Testimonial";
import ToolsUses from "@/views/home/ToolsUses";
import TrustedWorldwide from "@/views/home/TrustedWorldwide";
import WorkWithTool from "@/views/home/WorkWithTool";

export default function Home() {
  return (
    <div>
      <AppNav />
      <HeroSection />
      <WorkWithTool />
      <ToolsUses />
      <TrustedWorldwide />
      <Testimonial />
      <Pricing />
      <FaqSection />
      <FreeTrialSection />
      <Footer />
    </div>
  );
}
