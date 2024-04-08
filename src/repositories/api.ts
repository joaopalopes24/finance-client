// ** Internal Imports
import client from "@/services/axios";
import AuthModule from "@/repositories/modules/auth";
import SearchModule from "@/repositories/modules/search";
import ProfileModule from "@/repositories/modules/profile";
import TwoFactorModule from "@/repositories/modules/two-factor";
import CostCenterModule from "@/repositories/modules/cost-center";
import TransactionModule from "@/repositories/modules/transaction";
import AccountPlanModule from "@/repositories/modules/account-plan";

type Modules = {
  auth: AuthModule;
  search: SearchModule;
  profile: ProfileModule;
  twoFactor: TwoFactorModule;
  costCenter: CostCenterModule;
  accountPlan: AccountPlanModule;
  transaction: TransactionModule;
};

const api: Modules = {
  auth: new AuthModule(client),
  search: new SearchModule(client),
  profile: new ProfileModule(client),
  twoFactor: new TwoFactorModule(client),
  costCenter: new CostCenterModule(client),
  accountPlan: new AccountPlanModule(client),
  transaction: new TransactionModule(client),
};

export default api;
