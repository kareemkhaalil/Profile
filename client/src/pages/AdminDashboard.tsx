import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

// Type definitions
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

interface Skill {
  name: string;
  percentage: number;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// Mock data - in a real app this would come from a database
import portfolioItems from '@/data/portfolioItems';
import { technicalSkills, softSkills } from '@/data/skills';
import contactMessages from '@/data/contactMessages';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
      variant: "default",
    });
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0]">
      {/* Header */}
      <header className="bg-[#1E1E1E] border-b border-[#2D2D2D] px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#00CCFF] flex items-center justify-center text-[#121212] font-bold">A</div>
            <span className="text-xl font-semibold">Admin Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-[#B0B0B0]">Welcome, Admin</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-[#2D2D2D] text-[#B0B0B0] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors"
            >
              <i className="ri-logout-box-line mr-2"></i>Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="w-full flex justify-center mb-8 p-1 bg-[#1E1E1E] rounded-lg">
            <TabsTrigger value="portfolio" className="flex-1 py-3">
              <i className="ri-gallery-line mr-2"></i>Portfolio
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex-1 py-3">
              <i className="ri-tools-line mr-2"></i>Skills
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex-1 py-3">
              <i className="ri-mail-line mr-2"></i>Messages
            </TabsTrigger>
            <TabsTrigger value="website" className="flex-1 py-3">
              <i className="ri-global-line mr-2"></i>Website
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1 py-3">
              <i className="ri-settings-line mr-2"></i>Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="mt-6">
            <PortfolioTab items={portfolioItems} />
          </TabsContent>
          
          <TabsContent value="skills" className="mt-6">
            <SkillsTab technicalSkills={technicalSkills} softSkills={softSkills} />
          </TabsContent>
          
          <TabsContent value="messages" className="mt-6">
            <MessagesTab messages={contactMessages} />
          </TabsContent>
          
          <TabsContent value="website" className="mt-6">
            <WebsiteManagementTab />
          </TabsContent>
          <TabsContent value="settings" className="mt-6">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Website Management Tab
function WebsiteManagementTab() {
  const { toast } = useToast();
  const [redirects, setRedirects] = useState([
    { from: '/blog', to: '/posts' },
    { from: '/about-us', to: '/about' }
  ]);
  
  const [meta, setMeta] = useState({
    title: "John Dev - Mobile App Developer",
    description: "Professional mobile app developer specializing in Flutter and Dart",
    keywords: "mobile app, flutter, dart, developer",
    ogImage: "https://example.com/og-image.jpg"
  });

  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Website settings have been updated successfully",
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Website Management</h2>
        <button 
          onClick={handleSaveChanges}
          className="px-4 py-2 rounded-full bg-[#00CCFF] text-[#121212] hover:bg-[#33D6FF] transition-colors"
        >
          <i className="ri-save-line mr-2"></i>Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* SEO Settings */}
        <div className="bg-[#1E1E1E] rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Meta Title</label>
              <input
                type="text"
                value={meta.title}
                onChange={(e) => setMeta({ ...meta, title: e.target.value })}
                className="w-full px-4 py-2 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <textarea
                value={meta.description}
                onChange={(e) => setMeta({ ...meta, description: e.target.value })}
                className="w-full px-4 py-2 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF]"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Keywords</label>
              <input
                type="text"
                value={meta.keywords}
                onChange={(e) => setMeta({ ...meta, keywords: e.target.value })}
                className="w-full px-4 py-2 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">OG Image URL</label>
              <input
                type="text"
                value={meta.ogImage}
                onChange={(e) => setMeta({ ...meta, ogImage: e.target.value })}
                className="w-full px-4 py-2 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF]"
              />
            </div>
          </div>
        </div>

        {/* URL Redirects */}
        <div className="bg-[#1E1E1E] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">URL Redirects</h3>
            <button 
              onClick={() => setRedirects([...redirects, { from: '', to: '' }])}
              className="px-3 py-1 rounded-full bg-[#2D2D2D] text-[#B0B0B0] hover:bg-[#00CCFF] hover:text-[#121212]"
            >
              <i className="ri-add-line mr-1"></i>Add Redirect
            </button>
          </div>
          
          <div className="space-y-3">
            {redirects.map((redirect, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={redirect.from}
                  onChange={(e) => {
                    const newRedirects = [...redirects];
                    newRedirects[index].from = e.target.value;
                    setRedirects(newRedirects);
                  }}
                  placeholder="From path"
                  className="flex-1 px-4 py-2 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF]"
                />
                <i className="ri-arrow-right-line text-[#B0B0B0]"></i>
                <input
                  type="text"
                  value={redirect.to}
                  onChange={(e) => {
                    const newRedirects = [...redirects];
                    newRedirects[index].to = e.target.value;
                    setRedirects(newRedirects);
                  }}
                  placeholder="To path"
                  className="flex-1 px-4 py-2 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF]"
                />
                <button
                  onClick={() => {
                    const newRedirects = redirects.filter((_, i) => i !== index);
                    setRedirects(newRedirects);
                  }}
                  className="p-2 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Portfolio Tab Component
function PortfolioTab({ items }: { items: PortfolioItem[] }) {
  const { toast } = useToast();
  const [projects, setProjects] = useState(items);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<PortfolioItem | null>(null);

  const handleEdit = async (id: number) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setCurrentProject(project);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleSaveProject = async (formData: any) => {
    try {
      const method = currentProject ? 'PUT' : 'POST';
      const url = currentProject ? `/api/portfolio/${currentProject.id}` : '/api/portfolio';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedProject = await response.json();
        if (currentProject) {
          setProjects(projects.map(p => p.id === currentProject.id ? savedProject : p));
        } else {
          setProjects([...projects, savedProject]);
        }
        setIsEditing(false);
        setCurrentProject(null);
        toast({
          title: "Success",
          description: "Project saved successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const handleAddProject = () => {
    setCurrentProject(null);
    setIsEditing(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Portfolio</h2>
        <button 
          onClick={handleAddProject}
          className="px-4 py-2 rounded-full bg-[#00CCFF] text-[#121212] hover:bg-[#33D6FF] transition-colors"
        >
          <i className="ri-add-line mr-2"></i>Add Project
        </button>
      </div>
      
      <div className="bg-[#1E1E1E] rounded-xl p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2D2D2D]">
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Image</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[#2D2D2D]">
                  <td className="py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 bg-[#0A2647] text-[#E0E0E0] rounded-full text-xs">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 rounded overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleEdit(item.id)}
                        className="p-2 rounded bg-[#00CCFF]/20 text-[#00CCFF] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// Skills Tab Component
function SkillsTab({ technicalSkills, softSkills }: { technicalSkills: Skill[], softSkills: Skill[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Skills</h2>
        <button className="px-4 py-2 rounded-full bg-[#00CCFF] text-[#121212] hover:bg-[#33D6FF] transition-colors">
          <i className="ri-add-line mr-2"></i>Add Skill
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1E1E1E] rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
          
          <div className="space-y-4">
            {technicalSkills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center p-3 hover:bg-[#2D2D2D] rounded-lg transition-colors">
                <div>
                  <h4 className="font-medium">{skill.name}</h4>
                  <div className="flex items-center mt-1">
                    <div className="w-32 h-2 bg-[#2D2D2D] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00CCFF] to-[#0A2647]" 
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-[#B0B0B0]">{skill.percentage}%</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 rounded bg-[#00CCFF]/20 text-[#00CCFF] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors">
                    <i className="ri-edit-line"></i>
                  </button>
                  <button className="p-1 rounded bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#1E1E1E] rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Additional Skills</h3>
          
          <div className="space-y-4">
            {softSkills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center p-3 hover:bg-[#2D2D2D] rounded-lg transition-colors">
                <div>
                  <h4 className="font-medium">{skill.name}</h4>
                  <div className="flex items-center mt-1">
                    <div className="w-32 h-2 bg-[#2D2D2D] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00CCFF] to-[#0A2647]" 
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-[#B0B0B0]">{skill.percentage}%</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 rounded bg-[#00CCFF]/20 text-[#00CCFF] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors">
                    <i className="ri-edit-line"></i>
                  </button>
                  <button className="p-1 rounded bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Messages Tab Component
function MessagesTab({ messages: initialMessages }: { messages: ContactMessage[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const { toast } = useToast();

  const handleDeleteMessage = async (id: number) => {
    try {
      const response = await fetch(`/api/contact-messages/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setMessages(messages.filter(m => m.id !== id));
        toast({
          title: "Success",
          description: "Message deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const handleReplyEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <span className="px-4 py-2 rounded-full bg-[#0A2647] text-[#E0E0E0]">
          {messages.length} Messages
        </span>
      </div>
      
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="bg-[#1E1E1E] rounded-xl p-6 hover:border-[#00CCFF] border border-transparent transition-colors">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{message.subject}</h3>
                <p className="text-[#B0B0B0] text-sm">From: {message.name} ({message.email})</p>
              </div>
              <span className="text-sm text-[#B0B0B0]">{new Date(message.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-[#E0E0E0] mb-4">{message.message}</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => handleReplyEmail(message.email)}
                className="px-4 py-2 rounded-full bg-[#2D2D2D] text-[#B0B0B0] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors">
                <i className="ri-mail-send-line mr-2"></i>Reply
              </button>
              <button 
                onClick={() => handleDeleteMessage(message.id)}
                className="px-4 py-2 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                <i className="ri-delete-bin-line mr-2"></i>Delete
              </button>
            </div>
          </div>
        ))}
        
        {messages.length === 0 && (
          <div className="bg-[#1E1E1E] rounded-xl p-8 text-center">
            <i className="ri-inbox-line text-5xl text-[#B0B0B0] mb-4 block"></i>
            <h3 className="text-xl font-semibold mb-2">No Messages</h3>
            <p className="text-[#B0B0B0]">You don't have any contact messages yet.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Settings Tab Component
function SettingsTab() {
  const [siteTitle, setSiteTitle] = useState('John Dev - Mobile App Developer');
  const [siteDescription, setSiteDescription] = useState('Professional mobile app developer specializing in Flutter and Dart.');
  const [primaryColor, setPrimaryColor] = useState('#00CCFF');
  const { toast } = useToast();
  
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const settingsData = {
        siteTitle,
        siteDescription,
        primaryColor,
        socialLinks: {
          github: e.currentTarget['github'].value,
          linkedin: e.currentTarget['linkedin'].value,
          twitter: e.currentTarget['twitter'].value,
        },
        contactInfo: {
          email: e.currentTarget['email'].value,
          phone: e.currentTarget['phone'].value,
          location: e.currentTarget['location'].value,
        }
      };

      const response = await fetch('/api/site-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsData),
      });

      if (response.ok) {
        toast({
          title: "Settings saved",
          description: "Your website settings have been updated",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Website Settings</h2>
        <p className="text-[#B0B0B0]">Customize your website's appearance and content</p>
      </div>
      
      <div className="bg-[#1E1E1E] rounded-xl p-6">
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="siteTitle" className="block text-sm font-medium mb-2">Site Title</label>
              <input 
                type="text" 
                id="siteTitle" 
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF] focus:outline-none focus:ring-1 focus:ring-[#00CCFF] transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="siteDesc" className="block text-sm font-medium mb-2">Site Description</label>
              <input 
                type="text" 
                id="siteDesc" 
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                className="w-full px-4 py-3 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF] focus:outline-none focus:ring-1 focus:ring-[#00CCFF] transition-colors"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="primaryColor" className="block text-sm font-medium mb-2">Primary Color</label>
            <div className="flex items-center space-x-4">
              <input 
                type="color" 
                id="primaryColor" 
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-12 h-12 p-1 bg-[#121212] rounded border border-[#2D2D2D] cursor-pointer"
              />
              <input 
                type="text" 
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-32 px-4 py-3 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF] focus:outline-none focus:ring-1 focus:ring-[#00CCFF] transition-colors"
              />
              <div className="flex-1">
                <div className="w-full h-10 rounded-lg" style={{ backgroundColor: primaryColor }}></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Social Media Links</label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-10 flex-shrink-0"><i className="ri-github-fill text-xl"></i></div>
                  <input 
                    type="text" 
                    placeholder="GitHub URL"
                    className="w-full px-4 py-2 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF] focus:outline-none focus:ring-1 focus:ring-[#00CCFF] transition-colors"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-10 flex-shrink-0"><i className="ri-linkedin-fill text-xl"></i></div>
                  <input 
                    type="text" 
                    placeholder="LinkedIn URL"
                    className="w-full px-4 py-2 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF] focus:outline-none focus:ring-1 focus:ring-[#00CCFF] transition-colors"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-10 flex-shrink-0"><i className="ri-twitter-fill text-xl"></i></div>
                  <input 
                    type="text" 
                    placeholder="Twitter URL"
                    className="w-full px-4 py-2 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF] focus:outline-none focus:ring-1 focus:ring-[#00CCFF] transition-colors"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Contact Information</label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-10 flex-shrink-0"><i className="ri-mail-line text-xl"></i></div>
                  <input 
                    type="email" 
                    placeholder="Email address"
                    className="w-full px-4 py-2 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF] focus:outline-none focus:ring-1 focus:ring-[#00CCFF] transition-colors"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-10 flex-shrink-0"><i className="ri-phone-line text-xl"></i></div>
                  <input 
                    type="text" 
                    placeholder="Phone number"
                    className="w-full px-4 py-2 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF] focus:outline-none focus:ring-1 focus:ring-[#00CCFF] transition-colors"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-10 flex-shrink-0"><i className="ri-map-pin-line text-xl"></i></div>
                  <input 
                    type="text" 
                    placeholder="Location"
                    className="w-full px-4 py-2 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF] focus:outline-none focus:ring-1 focus:ring-[#00CCFF] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-6 py-3 rounded-full bg-[#00CCFF] text-[#121212] font-medium hover:bg-[#33D6FF] transition-all duration-300 flex items-center"
            >
              Save Settings <i className="ri-save-line ml-2"></i>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}