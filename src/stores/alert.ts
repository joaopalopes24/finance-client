// ** External Imports
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { find, reject, set, union } from "lodash";

// ** MUI Imports
import { AlertColor } from "@mui/material";

interface AlertStatic {
  message: string;
  visible: boolean;
  variant: AlertColor;
}
type AlertDynamic = AlertStatic & { id: string };

interface Alert {
  dynamic: AlertDynamic[];
  maxDynamicItems: number;
  static: AlertStatic | null;
  closeStatic: () => void;
  closeDynamic: (id: string) => void;
  openStatic: (message: string, variant?: AlertColor) => void;
  openDynamic: (message: string, variant?: AlertColor) => void;
}

function closeStatic(alert: AlertStatic | null): AlertStatic | null {
  if (!alert) return alert;

  return set(alert, "visible", false);
}

function openStatic(message: string, variant?: AlertColor): AlertStatic {
  return {
    visible: true,
    message: message,
    variant: variant || "success",
  };
}

const useAlert = create<Alert>()((set, get) => ({
  dynamic: [],
  static: null,
  maxDynamicItems: 3,

  openStatic: (message: string, variant?: AlertColor) => {
    set({ static: openStatic(message, variant) });
  },

  closeStatic: () => {
    set({ static: closeStatic(get().static) });
  },

  openDynamic: (message: string, variant?: AlertColor) => {
    const id = uuidv4();

    const dynamic = get().dynamic;

    if (dynamic.length >= get().maxDynamicItems) dynamic.shift();

    set({ dynamic: union(dynamic, [{ id, ...openStatic(message, variant) }]) });
  },

  closeDynamic: (id: string) => {
    const dynamic = get().dynamic;

    const alert = find(dynamic, { id });

    if (!alert) return;

    set({ dynamic: reject(dynamic, { id }) });
  },
}));

export default useAlert;
