import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole } from '@/types/farmer';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  register: (name: string, email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('crm_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, _password: string, role: UserRole) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: role === 'clerk' ? 'John Kiptoo' : 'David Langat',
      email,
      role,
    };
    setUser(newUser);
    localStorage.setItem('crm_user', JSON.stringify(newUser));
    return true;
  }, []);

  const register = useCallback((name: string, email: string, _password: string, role: UserRole) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      role,
    };
    setUser(newUser);
    localStorage.setItem('crm_user', JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('crm_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
