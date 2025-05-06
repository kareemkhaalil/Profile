export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-[#2D2D2D]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#hero" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#00CCFF] flex items-center justify-center text-[#121212] font-bold font-poppins text-sm">J</div>
              <span className="text-lg font-semibold font-poppins tracking-wide text-[#E0E0E0]">John<span className="text-[#00CCFF]">Dev</span></span>
            </a>
          </div>
          
          <p className="text-[#B0B0B0] text-sm text-center md:text-right">
            &copy; {currentYear} John Developer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
