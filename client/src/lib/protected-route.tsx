import { useState, useEffect } from 'react';
import { Route, Redirect } from 'wouter';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({
  path,
  component: Component,
  adminPassword = "admin123" // Simple password protection for demo purposes
}: {
  path: string;
  component: React.ComponentType;
  adminPassword?: string;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    fetch('/api/user', {
      credentials: 'include'
    })
    .then(res => {
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('isAdminAuthenticated');
      }
    })
    .catch(() => {
      setIsAuthenticated(false);
      localStorage.removeItem('isAdminAuthenticated');
    });
  }, []);

  if (isAuthenticated === null) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-[#00CCFF]" />
        </div>
      </Route>
    );
  }

  return (
    <Route path={path}>
      {isAuthenticated ? (
        <Component />
      ) : (
        <Redirect to="/admin-login" />
      )}
    </Route>
  );
}