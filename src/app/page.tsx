import AppNav from "@/components/_core/AppNav";
import FaqSection from "@/pages/home/FAQ";
import Footer from "@/pages/home/Footer";
import FreeTrialSection from "@/pages/home/FreeTrialSection";
import HeroSection from "@/pages/home/HeroSection";
import Pricing from "@/pages/home/Pricing";
import Testimonial from "@/pages/home/Testimonial";
import ToolsUses from "@/pages/home/ToolsUses";
import TrustedWorldwide from "@/pages/home/TrustedWorldwide";
import WorkWithTool from "@/pages/home/WorkWithTool";

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
