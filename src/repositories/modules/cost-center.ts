// ** Internal Imports
import AxiosFactory from "@/repositories/factory";

// ** MUI Imports
import { GridSortDirection } from "@mui/x-data-grid";

type CostCenterProps = {
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

class CostCenterModule extends AxiosFactory {
  async getAll(data: PaginationProps) {
    await this.csrf();

    return this.$axios.get("/api/cost-centers", { params: data });
  }

  async getById(id: string) {
    await this.csrf();

    return this.$axios.get(`/api/cost-centers/${id}`);
  }

  async create(data: CostCenterProps) {
    await this.csrf();

    return this.$axios.post("/api/cost-centers", data);
  }

  async update(id: string, data: CostCenterProps) {
    await this.csrf();

    return this.$axios.put(`/api/cost-centers/${id}`, data);
  }

  async delete(id: string) {
    await this.csrf();

    return this.$axios.delete(`/api/cost-centers/${id}`);
  }
}

export default CostCenterModule;
