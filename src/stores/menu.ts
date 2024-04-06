// ** External Imports
import { create } from "zustand";

// ** Internal Imports
import { MenuType } from "@/config/menu";

interface Menu {
  visible: boolean;
  page: string | null;
  hidden: boolean | null;
  toggleVisible: () => void;
  setPage: (page?: string) => void;
  setHidden: (hidden: boolean) => void;
  checkLink: (item: MenuType) => boolean;
  setVisible: (visible: boolean) => void;
}

const useMenu = create<Menu>()((set, get) => ({
  page: null,
  hidden: true,
  visible: false,

  setPage: (page?: string) => set({ page }),

  setHidden: (hidden: boolean) => set({ hidden }),

  setVisible: (visible: boolean) => set({ visible }),

  checkLink: (item: MenuType) => get().page === item.id,

  toggleVisible: () => set((state) => ({ visible: !state.visible })),
}));

export default useMenu;
