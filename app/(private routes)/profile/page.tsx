'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';
import { getMe } from '@/lib/api/clientApi';
import css from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUser();
  }, [setUser]);

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <img
            src={user?.avatar || "https://ac.goit.global/fullstack/react/static/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <span><strong>Username:</strong> {user?.username}</span>
          </div>
          <div className={css.usernameWrapper}>
            <span><strong>Email:</strong> {user?.email}</span>
          </div>
        </div>
      </div>
    </main>
  );
}