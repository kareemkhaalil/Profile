import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: 'admin',
          password: password 
        }),
        credentials: 'include'
      });

      if (response.ok) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
          variant: "default",
        });
        setLocation('/admin-dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4">
      <motion.div 
        className="bg-[#1E1E1E] rounded-xl p-8 w-full max-w-md shadow-xl border border-[#2D2D2D]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-poppins mb-2">Admin Dashboard</h1>
          <p className="text-[#B0B0B0]">Enter your password to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password" 
              className="w-full px-4 py-3 bg-[#121212] rounded-lg border border-[#2D2D2D] focus:border-[#00CCFF] focus:outline-none focus:ring-1 focus:ring-[#00CCFF] transition-colors"
              required
            />
          </div>
          
          <motion.button 
            type="submit" 
            className="w-full px-6 py-3 rounded-full bg-[#00CCFF] text-[#121212] font-medium hover:bg-[#33D6FF] transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>Logging In <i className="ri-loader-4-line ml-2 animate-spin"></i></>
            ) : (
              <>Login <i className="ri-login-box-line ml-2"></i></>
            )}
          </motion.button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-[#00CCFF] hover:underline">← Back to Website</a>
        </div>
      </motion.div>
    </div>
  );
}