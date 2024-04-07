// ** External Imports
import { set } from "lodash";
import { create } from "zustand";

// ** MUI Imports
import { AlertColor } from "@mui/material";

type AlertItem = null | {
  message: string;
  visible: boolean;
  variant: AlertColor;
};

interface Alert {
  alert: AlertItem;
  close: () => void;
  open: (message: string, variant?: AlertColor) => void;
}

function close(alert: AlertItem): AlertItem {
  if (!alert) return alert;

  return set(alert, "visible", false);
}

function open(message: string, variant?: AlertColor): AlertItem {
  return {
    visible: true,
    message: message,
    variant: variant || "success",
  };
}

const useAlert = create<Alert>()((set, get) => ({
  alert: null,

  open: (message: string, variant?: AlertColor) => {
    set({ alert: open(message, variant) });
  },

  close: () => {
    set({ alert: close(get().alert) });
  },
}));

export default useAlert;
