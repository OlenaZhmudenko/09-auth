'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isChecking, setIsChecking] = useState(true);
  const { setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else {
          clearAuth();
        }
      } catch (error) {
        clearAuth();
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [setUser, clearAuth]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}