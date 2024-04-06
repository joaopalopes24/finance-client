// ** Internal Imports
import client from "@/services/axios";
import AuthModule from "@/repositories/modules/auth";
import ProfileModule from "@/repositories/modules/profile";
import TwoFactorModule from "@/repositories/modules/two-factor";

type Modules = {
  auth: AuthModule;
  profile: ProfileModule;
  twoFactor: TwoFactorModule;
};

const api: Modules = {
  auth: new AuthModule(client),
  profile: new ProfileModule(client),
  twoFactor: new TwoFactorModule(client),
};

export default api;
