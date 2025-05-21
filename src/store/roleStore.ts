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
  setRoles: (roles) =>
    set({
      actualRoles: roles,
      viewAs: roles.includes("teacher") ? "teacher" : "student",
    }),
  switchView: () => {
    const { actualRoles, viewAs } = get();
    if (viewAs === "teacher" && actualRoles.includes("student")) {
      set({ viewAs: "student" });
    } else if (viewAs === "student" && actualRoles.includes("teacher")) {
      set({ viewAs: "teacher" });
    }
  },
}));
