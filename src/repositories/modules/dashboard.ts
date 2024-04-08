// ** Internal Imports
import AxiosFactory from "@/repositories/factory";

type DashboardProps = {
  start_date: string | null;
  end_date: string | null;
};

class DashboardModule extends AxiosFactory {
  async getReport(data: DashboardProps) {
    await this.csrf();

    return this.$axios.get("/api/dashboard", { params: data });
  }
}

export default DashboardModule;
