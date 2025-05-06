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
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    setIsAuthenticated(authStatus === 'true');
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