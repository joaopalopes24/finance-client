// ** Internal Imports
import client from "@/services/axios";
import AuthModule from "@/repositories/modules/auth";
import ProfileModule from "@/repositories/modules/profile";
import TwoFactorModule from "@/repositories/modules/two-factor";
import CostCenterModule from "@/repositories/modules/cost-center";
import AccountPlanModule from "@/repositories/modules/account-plan";

type Modules = {
  auth: AuthModule;
  profile: ProfileModule;
  twoFactor: TwoFactorModule;
  costCenter: CostCenterModule;
  accountPlan: AccountPlanModule;
};

const api: Modules = {
  auth: new AuthModule(client),
  profile: new ProfileModule(client),
  twoFactor: new TwoFactorModule(client),
  costCenter: new CostCenterModule(client),
  accountPlan: new AccountPlanModule(client),
};

export default api;
