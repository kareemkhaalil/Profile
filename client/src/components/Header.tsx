import { useState, useEffect } from 'react';
import { Link } from 'wouter';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

export default function Header({ toggleMobileMenu }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 ${isScrolled ? 'bg-[#121212]/90 backdrop-blur-sm' : 'bg-transparent'} transition-all duration-300`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#hero" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-[#00CCFF] flex items-center justify-center text-[#121212] font-bold font-poppins text-xl">J</div>
          <span className="text-xl font-semibold font-poppins tracking-wide text-[#E0E0E0]">John<span className="text-[#00CCFF]">Dev</span></span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-[#B0B0B0] hover:text-[#00CCFF] transition-colors duration-300">About</a>
          <a href="#portfolio" className="text-[#B0B0B0] hover:text-[#00CCFF] transition-colors duration-300">Portfolio</a>
          <a href="#skills" className="text-[#B0B0B0] hover:text-[#00CCFF] transition-colors duration-300">Skills</a>
          <a href="#contact" className="text-[#B0B0B0] hover:text-[#00CCFF] transition-colors duration-300">Contact</a>
          <a href="#" className="px-4 py-2 rounded-full bg-[#00CCFF] text-[#121212] font-medium hover:bg-[#33D6FF] transition-colors duration-300">Resume</a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-[#E0E0E0] text-2xl focus:outline-none"
        >
          <i className="ri-menu-line"></i>
        </button>
      </div>
    </header>
  );
}
