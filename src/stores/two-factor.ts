// ** External Imports
import { create } from "zustand";
import api from "@/repositories/api";
import { getDataKey } from "@/utils/helpers";

type TwoFactor = {
  enabled: boolean;
  confirmed: boolean;
  qrCode: string | null;
  recoveryCodes: string[];
  secretKey: string | null;
  enable: () => void;
  cancel: () => void;
  confirm: () => void;
  destroy: () => void;
  showQrCode: () => void;
  showSecretKey: () => void;
  hideRecoveryCodes: () => void;
  showRecoveryCodes: () => void;
  hasRecoveryCodes: () => boolean;
  setConfirmed: (confirmed: boolean) => void;
};

const useTwoFactor = create<TwoFactor>()((set, get) => ({
  qrCode: null,
  enabled: false,
  secretKey: null,
  confirmed: false,
  recoveryCodes: [],

  cancel: () => {
    set({ qrCode: null, secretKey: null, enabled: false });

    get().hideRecoveryCodes();
  },

  enable: () => {
    get().showQrCode();

    get().showSecretKey();

    set({ enabled: true });
  },

  confirm: () => {
    get().showRecoveryCodes();

    set({ qrCode: null, secretKey: null, enabled: false, confirmed: true });
  },

  destroy: () => {
    set({ enabled: false, confirmed: false });

    get().hideRecoveryCodes();
  },

  setConfirmed: (confirmed: boolean) => {
    set({ confirmed });
  },

  hasRecoveryCodes: () => {
    return get().recoveryCodes.length > 0;
  },

  showQrCode: () => {
    api.twoFactor.qrCodeTwoFactor().then((response) => {
      set({ qrCode: getDataKey(response, "svg") });
    });
  },

  showSecretKey: () => {
    api.twoFactor.secretKeyTwoFactor().then((response) => {
      set({ secretKey: getDataKey(response, "secretKey") });
    });
  },

  hideRecoveryCodes: () => {
    set({ recoveryCodes: [] });
  },

  showRecoveryCodes: () => {
    api.twoFactor.recoveryCodesTwoFactor().then((response) => {
      set({ recoveryCodes: getDataKey(response, "recoveryCodes") });
    });
  },
}));

export default useTwoFactor;
