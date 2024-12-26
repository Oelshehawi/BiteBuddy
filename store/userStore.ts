import { create } from 'zustand';
import { userStorage } from '../config/storage';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  bio: string;
  profileImage: string;
  favoriteCuisines: string[];
  dietaryPreferences: string[];
}

interface UserState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => {
    set({ user });
    if (user) {
      userStorage.set('user', JSON.stringify(user));
    } else {
      userStorage.delete('user');
    }
  },
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setIsLoading: (value) => set({ isLoading: value }),
  updateProfile: (updates) => {
    set((state) => {
      const newUser = state.user ? { ...state.user, ...updates } : null;
      if (newUser) {
        userStorage.set('user', JSON.stringify(newUser));
      }
      return { user: newUser };
    });
  },
  logout: () => {
    userStorage.delete('user');
    set({ user: null, isAuthenticated: false });
  },
})); 