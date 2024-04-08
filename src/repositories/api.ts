// ** Internal Imports
import client from "@/services/axios";
import AuthModule from "@/repositories/modules/auth";
import ProfileModule from "@/repositories/modules/profile";
import TwoFactorModule from "@/repositories/modules/two-factor";
import CostCenterModule from "@/repositories/modules/cost-center";

type Modules = {
  auth: AuthModule;
  profile: ProfileModule;
  twoFactor: TwoFactorModule;
  costCenter: CostCenterModule;
};

const api: Modules = {
  auth: new AuthModule(client),
  profile: new ProfileModule(client),
  twoFactor: new TwoFactorModule(client),
  costCenter: new CostCenterModule(client),
};

export default api;
