// ** Internal Imports
import AxiosFactory from "@/repositories/factory";

class SearchModule extends AxiosFactory {
  async getCostCenters() {
    await this.csrf();

    return this.$axios.get("/api/search/cost-centers");
  }

  async getAccountPlans() {
    await this.csrf();

    return this.$axios.get("/api/search/account-plans");
  }
}

export default SearchModule;
