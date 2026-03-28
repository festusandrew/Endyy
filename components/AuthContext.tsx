import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiLogout, apiGetMe, BackendUser, getToken } from '../services/authAPI';

interface AuthContextType {
  user: BackendUser | null;
  loading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  refreshUser: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    
    try {
      const { user } = await apiGetMe();
      setUser(user);
    } catch {
      // Token invalid or expired
      setUser(null);
      apiLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    
    // In case we want to refresh after login from modal
    window.addEventListener('auth-updated', fetchUser);
    return () => {
      window.removeEventListener('auth-updated', fetchUser);
    };
  }, []);

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser: fetchUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
