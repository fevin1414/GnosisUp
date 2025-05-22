import { create } from "zustand";

type UserRole = "teacher" | "student";

interface AuthState {
  userEmail: string | null;
  role: UserRole | null;
  setUser: (email: string, role: UserRole) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userEmail: null,
  role: null,
  setUser: (email: string, role: UserRole) => set({ userEmail: email, role }),
  clearUser: () => set({ userEmail: null, role: null }),
}));
