import Navbar from '../../components/landing/Navbar';
import HeroSection from '../../components/landing/HeroSection';
import FeaturesSection from '../../components/landing/FeaturesSection';
import HowItWorksSection from '../../components/landing/HowItWorksSection';
import PricingSection from '../../components/landing/PricingSection';
import TestimonialsSection from '../../components/landing/TestimonialsSection';
import FAQSection from '../../components/landing/FAQSection';
import CTASection from '../../components/landing/CTASection';
import Footer from '../../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen" style={{ background: '#080e1c' }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
