// ** External Imports
import { find } from "lodash";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ** Internal Imports
import { MenuType } from "@/config/menu";

interface MenuItem {
  id: string;
  open: boolean;
}

interface Menu {
  visible: boolean;
  menu: MenuItem[];
  page: string | null;
  hidden: boolean | null;
  toggleVisible: () => void;
  setPage: (page?: string) => void;
  setHidden: (hidden: boolean) => void;
  checkLink: (item: MenuType) => boolean;
  setVisible: (visible: boolean) => void;
}

const useMenu = create<Menu>()(
  persist(
    (set, get) => ({
      menu: [],
      page: null,
      hidden: true,
      visible: false,

      setPage: (page?: string) => set({ page }),

      setHidden: (hidden: boolean) => set({ hidden }),

      setVisible: (visible: boolean) => set({ visible }),

      checkLink: (item: MenuType) => get().page === item.id,

      toggleVisible: () => set((state) => ({ visible: !state.visible })),
    }),
    {
      name: "menu",
      skipHydration: true,
      partialize: (state) => ({ menu: state.menu }),
    },
  ),
);

export default useMenu;
