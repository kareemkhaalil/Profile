import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface Skill {
  name: string;
  percentage: number;
}

interface TechItem {
  name: string;
  icon: string;
}

export default function SkillsSection() {
  const progressRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(progressRef, { once: true, amount: 0.2 });

  const coreSkills: Skill[] = [
    { name: "Flutter", percentage: 95 },
    { name: "Dart", percentage: 92 },
    { name: "Firebase", percentage: 88 },
    { name: "REST APIs", percentage: 90 },
    { name: "GraphQL", percentage: 82 }
  ];

  const additionalSkills: Skill[] = [
    { name: "UI/UX Design", percentage: 85 },
    { name: "State Management", percentage: 90 },
    { name: "CI/CD", percentage: 78 },
    { name: "App Performance", percentage: 88 },
    { name: "Animation", percentage: 86 }
  ];

  const technologies: TechItem[] = [
    { name: "Flutter", icon: "ri-flutter-fill" },
    { name: "Dart", icon: "ri-code-box-line" },
    { name: "Firebase", icon: "ri-firebase-line" },
    { name: "SQLite", icon: "ri-database-2-line" },
    { name: "Git/GitHub", icon: "ri-github-fill" },
    { name: "RESTful APIs", icon: "ri-api-line" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 section">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">My <span className="text-[#00CCFF]">Skills</span></h2>
          <div className="w-20 h-1 bg-[#00CCFF] mx-auto rounded-full mb-6"></div>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto">A comprehensive overview of my technical expertise and development capabilities.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16" ref={progressRef}>
          {/* Core Skills */}
          <div>
            <h3 className="text-xl font-semibold font-poppins mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-[#00CCFF]/20 flex items-center justify-center text-[#00CCFF] mr-3">
                <i className="ri-code-s-slash-line"></i>
              </span>
              Core Technologies
            </h3>
            
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {coreSkills.map((skill, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <Progress 
                    value={isInView ? skill.percentage : 0} 
                    className="h-[6px] bg-[#2D2D2D]"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Additional Skills */}
          <div>
            <h3 className="text-xl font-semibold font-poppins mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-[#00CCFF]/20 flex items-center justify-center text-[#00CCFF] mr-3">
                <i className="ri-tools-line"></i>
              </span>
              Additional Skills
            </h3>
            
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {additionalSkills.map((skill, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <Progress 
                    value={isInView ? skill.percentage : 0} 
                    className="h-[6px] bg-[#2D2D2D]"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Technologies */}
        <div className="mt-20">
          <h3 className="text-xl font-semibold font-poppins mb-8 text-center">Technologies I Work With</h3>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {technologies.map((tech, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center p-6 rounded-xl bg-[#2D2D2D] hover:bg-[#0A2647]/30 transition-colors"
                variants={itemVariants}
              >
                <div className="w-16 h-16 flex items-center justify-center text-[#00CCFF] text-3xl mb-4">
                  <i className={tech.icon}></i>
                </div>
                <span className="font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
