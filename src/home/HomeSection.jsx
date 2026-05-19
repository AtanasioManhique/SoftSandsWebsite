
import HeroSection from "./heroSection";
import DestinationSection from "./destinationSection";
import HowItWorks from "./howitWorks";
import Testimonials from "./testimonials";
import { CTABanner } from "./ctaandfooter";
import ExperienceSection from "./experienceSection";
import SectionBridge from "./sectionBridge";
import PartnersSection from "./partnersSection";
export default function HomeSection() {
  return (
    <div>
      
      <HeroSection />
      <SectionBridge />
      <ExperienceSection />
      <DestinationSection />
      <PartnersSection />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
    </div>
  );
}