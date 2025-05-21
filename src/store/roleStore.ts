import { create } from "zustand";

export type Role = "teacher" | "student";

interface RoleStore {
  actualRoles: Role[];
  viewAs: Role;
  setRoles: (roles: Role[]) => void;
  switchView: () => void;
}

export const useRoleStore = create<RoleStore>((set, get) => ({
  actualRoles: [],
  viewAs: "student",
  setRoles: (roles) => {
    const { actualRoles } = get();
    set((state) => ({
      actualRoles: roles,
      viewAs:
        actualRoles.length === 0
          ? roles.includes("teacher")
            ? "teacher"
            : "student"
          : state.viewAs,
    }));
  },
  switchView: () => {
    const { actualRoles, viewAs } = get();
    if (viewAs === "teacher" && actualRoles.includes("student")) {
      set({ viewAs: "student" });
    } else if (viewAs === "student" && actualRoles.includes("teacher")) {
      set({ viewAs: "teacher" });
    }
  },
}));
