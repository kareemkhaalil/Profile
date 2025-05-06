import { useState } from 'react';
import { motion } from 'framer-motion';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  links: {
    preview?: string;
    github?: string;
    appStore?: string;
    playStore?: string;
  };
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "ShopEase",
    description: "E-commerce mobile app with AR try-on features",
    image: "https://pixabay.com/get/g046f0eff84ce72880282600bccf695b6b78a2ac1249bdc044bf7bf0786258cb8605e76c9d9749a6e71f69c1f478bfe0130b268da72077979cc5f0d6910cb5e9b_1280.jpg",
    category: "E-Commerce",
    links: {
      preview: "#",
      github: "#",
      playStore: "#"
    }
  },
  {
    id: 2,
    title: "TaskFlow",
    description: "Productivity app with smart task management",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
    category: "Productivity",
    links: {
      preview: "#",
      github: "#",
      appStore: "#"
    }
  },
  {
    id: 3,
    title: "SocialConnect",
    description: "Social network with privacy-focused features",
    image: "https://pixabay.com/get/g67bd5ab349a064e7b4c13ce6c3487da8b35cf4ea612dc941525845a48f8aad606e1ce17e022e8fdd753f79d8adcf17a3cafe3e088f7b89153dbf352f90cbf8c4_1280.jpg",
    category: "Social",
    links: {
      preview: "#",
      github: "#",
      playStore: "#"
    }
  },
  {
    id: 4,
    title: "FitTrack",
    description: "Fitness app with personalized coaching",
    image: "https://images.unsplash.com/photo-1626197031507-c17099753214?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
    category: "Health",
    links: {
      preview: "#",
      github: "#",
      appStore: "#"
    }
  },
  {
    id: 5,
    title: "FoodJet",
    description: "Food delivery with real-time tracking",
    image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
    category: "E-Commerce",
    links: {
      preview: "#",
      github: "#",
      playStore: "#"
    }
  },
  {
    id: 6,
    title: "TravelEase",
    description: "Travel app with AI trip suggestions",
    image: "https://images.unsplash.com/photo-1585166059782-f28143545183?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
    category: "Travel",
    links: {
      preview: "#",
      github: "#",
      appStore: "#"
    }
  }
];

export default function PortfolioSection() {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];
  
  const filteredItems = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-[#1E1E1E] section">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">My <span className="text-[#00CCFF]">Portfolio</span></h2>
          <div className="w-20 h-1 bg-[#00CCFF] mx-auto rounded-full mb-6"></div>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto">Showcasing some of my recent mobile app development projects built with Flutter and Dart.</p>
        </div>
        
        {/* Portfolio Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <motion.button 
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full ${filter === category ? 'bg-[#0A2647] text-[#E0E0E0]' : 'bg-[#2D2D2D] text-[#B0B0B0]'} hover:bg-[#00CCFF] hover:text-[#121212] transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id}
              className="portfolio-item group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-xl overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold font-poppins text-[#E0E0E0] mb-2">{item.title}</h3>
                  <p className="text-[#B0B0B0] mb-4">{item.description}</p>
                  <div className="flex space-x-3">
                    {item.links.preview && (
                      <a href={item.links.preview} className="w-10 h-10 rounded-full bg-[#00CCFF]/20 flex items-center justify-center text-[#00CCFF] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors">
                        <i className="ri-link"></i>
                      </a>
                    )}
                    {item.links.github && (
                      <a href={item.links.github} className="w-10 h-10 rounded-full bg-[#00CCFF]/20 flex items-center justify-center text-[#00CCFF] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors">
                        <i className="ri-github-fill"></i>
                      </a>
                    )}
                    {item.links.playStore && (
                      <a href={item.links.playStore} className="w-10 h-10 rounded-full bg-[#00CCFF]/20 flex items-center justify-center text-[#00CCFF] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors">
                        <i className="ri-google-play-fill"></i>
                      </a>
                    )}
                    {item.links.appStore && (
                      <a href={item.links.appStore} className="w-10 h-10 rounded-full bg-[#00CCFF]/20 flex items-center justify-center text-[#00CCFF] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors">
                        <i className="ri-apple-fill"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.a 
            href="#" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-[#00CCFF]/20 text-[#00CCFF] font-medium hover:bg-[#00CCFF] hover:text-[#121212] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects <i className="ri-arrow-right-line ml-2"></i>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
