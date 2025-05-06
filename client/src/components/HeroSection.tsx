import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const phrases = ['Mobile App Developer', 'Flutter Developer', 'UI/UX Enthusiast', 'Problem Solver'];
  const currentPhraseIndex = useRef(0);
  const currentCharIndex = useRef(0);
  const isDeleting = useRef(false);
  const typingSpeed = useRef(100);

  useEffect(() => {
    const typeEffect = () => {
      const currentPhrase = phrases[currentPhraseIndex.current];
      
      if (isDeleting.current) {
        setTypedText(currentPhrase.substring(0, currentCharIndex.current - 1));
        currentCharIndex.current--;
        typingSpeed.current = 50;
      } else {
        setTypedText(currentPhrase.substring(0, currentCharIndex.current + 1));
        currentCharIndex.current++;
        typingSpeed.current = 100;
      }
      
      if (!isDeleting.current && currentCharIndex.current === currentPhrase.length) {
        isDeleting.current = true;
        typingSpeed.current = 1500; // Pause at end of phrase
      } else if (isDeleting.current && currentCharIndex.current === 0) {
        isDeleting.current = false;
        currentPhraseIndex.current = (currentPhraseIndex.current + 1) % phrases.length;
        typingSpeed.current = 500; // Pause before starting new phrase
      }
      
      setTimeout(typeEffect, typingSpeed.current);
    };
    
    const typingTimeout = setTimeout(typeEffect, 1000);
    return () => clearTimeout(typingTimeout);
  }, [phrases]);

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 overflow-hidden relative">
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#00CCFF] mb-4 font-medium">Hello, I'm</p>
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6 text-[#E0E0E0]">John Developer</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#B0B0B0]">
              <span className="typing-text">{typedText}</span>
              <span className="animate-pulse">|</span>
            </h2>
            <p className="text-[#B0B0B0] text-lg mb-8 max-w-lg">
              Creating polished mobile experiences with Flutter and Dart.
              Transforming ideas into beautiful, functional apps that users love.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#portfolio" 
                className="px-6 py-3 rounded-full bg-[#00CCFF] text-[#121212] font-medium hover:bg-[#33D6FF] transition-all duration-300 transform hover:-translate-y-1"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-full bg-transparent border border-[#00CCFF] text-[#00CCFF] font-medium hover:bg-[#00CCFF]/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#0A2647] opacity-20 blur-xl animate-pulse-slow"></div>
              <img 
                src="https://pixabay.com/get/g2359d917fc772149c3372581478418dc15f862529fe7d315279a0289555070d9de5708dad4ca046ad53d0bcc2c47ee6f649e7fd7b4a27278d415e8f6f97dbcd4_1280.jpg" 
                alt="Mobile App Developer Portrait" 
                className="rounded-full w-64 h-64 object-cover border-4 border-[#00CCFF] animate-float" 
              />
            </div>
          </motion.div>
        </div>
        
        <div className="mt-20 flex items-center justify-center">
          <motion.a 
            href="#about" 
            className="text-[#B0B0B0] hover:text-[#00CCFF] flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <i className="ri-arrow-down-line text-2xl"></i>
          </motion.a>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#00CCFF] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0A2647] opacity-10 rounded-full blur-3xl"></div>
    </section>
  );
}
