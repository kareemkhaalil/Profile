declare module '@/data/portfolioItems' {
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
  
  const portfolioItems: PortfolioItem[];
  export default portfolioItems;
}

declare module '@/data/skills' {
  interface Skill {
    name: string;
    percentage: number;
  }

  interface TechItem {
    name: string;
    icon: string;
  }
  
  export const technicalSkills: Skill[];
  export const softSkills: Skill[];
  export const technologies: TechItem[];
}

declare module '@/data/contactMessages' {
  interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
  }
  
  const contactMessages: ContactMessage[];
  export default contactMessages;
}