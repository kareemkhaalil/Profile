import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MobileMenu from '@/components/MobileMenu';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { checkSections } from '@/lib/utils';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initial check for sections in viewport
    checkSections();
    
    // Scroll event listener to animate sections
    window.addEventListener('scroll', checkSections);
    
    return () => {
      window.removeEventListener('scroll', checkSections);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Header toggleMobileMenu={toggleMobileMenu} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <SkillsSection />
        <ContactSection />
      </main>
      
      <Footer />
      <BackToTop />
    </>
  );
}
