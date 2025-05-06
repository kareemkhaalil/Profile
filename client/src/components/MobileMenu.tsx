import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const mobileMenu = document.getElementById('mobileMenu');
      if (isOpen && mobileMenu && !mobileMenu.contains(target) && !target.closest('#menuBtn')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // Close mobile menu when pressing escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <div id="mobileMenu" className={`mobile-menu fixed top-0 right-0 h-full w-4/5 max-w-xs bg-[#1E1E1E] z-50 p-8 flex flex-col ${isOpen ? 'open' : ''}`}>
      <div className="flex justify-end mb-8">
        <button 
          onClick={onClose}
          className="text-[#E0E0E0] text-2xl focus:outline-none"
        >
          <i className="ri-close-line"></i>
        </button>
      </div>
      <nav className="flex-1 flex flex-col space-y-6">
        <a href="#about" onClick={onClose} className="mobile-menu-item text-xl font-medium text-[#E0E0E0] hover:text-[#00CCFF] transition-colors">About</a>
        <a href="#portfolio" onClick={onClose} className="mobile-menu-item text-xl font-medium text-[#E0E0E0] hover:text-[#00CCFF] transition-colors">Portfolio</a>
        <a href="#skills" onClick={onClose} className="mobile-menu-item text-xl font-medium text-[#E0E0E0] hover:text-[#00CCFF] transition-colors">Skills</a>
        <a href="#contact" onClick={onClose} className="mobile-menu-item text-xl font-medium text-[#E0E0E0] hover:text-[#00CCFF] transition-colors">Contact</a>
        <a href="#" className="mobile-menu-item mt-8 px-4 py-3 rounded-full bg-[#00CCFF] text-[#121212] font-medium hover:bg-[#33D6FF] transition-colors flex items-center justify-center">
          <i className="ri-download-line mr-2"></i> Download Resume
        </a>
      </nav>
      <div className="mt-auto pt-8 border-t border-[#2D2D2D]">
        <div className="flex space-x-6 justify-center">
          <a href="#" className="text-[#B0B0B0] hover:text-[#00CCFF] text-xl transition-colors"><i className="ri-github-fill"></i></a>
          <a href="#" className="text-[#B0B0B0] hover:text-[#00CCFF] text-xl transition-colors"><i className="ri-linkedin-box-fill"></i></a>
          <a href="#" className="text-[#B0B0B0] hover:text-[#00CCFF] text-xl transition-colors"><i className="ri-twitter-fill"></i></a>
        </div>
      </div>
    </div>
  );
}
