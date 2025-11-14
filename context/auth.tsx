// context/auth.tsx

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';


interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cek token / otentikasi awal
  useEffect(() => {
    const checkToken = async () => {
      try {
        // TODO: Tambahkan logika untuk:
        // - Membaca token dari AsyncStorage
        // - Validasi token ke server
        // - Restore user session jika ada
        
        // Simulasi penundaan (hapus di production)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking token:', error);
        setIsLoading(false);
      }
    };
    
    checkToken();
  }, []);

  const signIn = () => {
    setIsAuthenticated(true);
    // TODO: Simpan token dan user data di sini
    console.log('✅ User signed in successfully.');
  };

  const signOut = () => {
    setIsAuthenticated(false);
    // TODO: Hapus token dan user data di sini
    console.log('🚪 User signed out.');
  };

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, signIn, signOut }),
    [isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}