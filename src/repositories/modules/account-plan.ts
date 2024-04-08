// ** Internal Imports
import AxiosFactory from "@/repositories/factory";

// ** MUI Imports
import { GridSortDirection } from "@mui/x-data-grid";

type AccountPlanProps = {
  name: string;
  status: boolean;
};

type PaginationProps = {
  page: number;
  limit: number;
  search: string;
  sort: GridSortDirection;
  field: string | undefined;
};

class AccountPlanModule extends AxiosFactory {
  async getAll(data: PaginationProps) {
    await this.csrf();

    return this.$axios.get("/api/account-plans", { params: data });
  }

  async getById(id: string) {
    await this.csrf();

    return this.$axios.get(`/api/account-plans/${id}`);
  }

  async create(data: AccountPlanProps) {
    await this.csrf();

    return this.$axios.post("/api/account-plans", data);
  }

  async update(id: string, data: AccountPlanProps) {
    await this.csrf();

    return this.$axios.put(`/api/account-plans/${id}`, data);
  }

  async delete(id: string) {
    await this.csrf();

    return this.$axios.delete(`/api/account-plans/${id}`);
  }
}

export default AccountPlanModule;
