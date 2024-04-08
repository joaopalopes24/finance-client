// ** Internal Imports
import AxiosFactory from "@/repositories/factory";

// ** MUI Imports
import { GridSortDirection } from "@mui/x-data-grid";

type TransactionProps = {
  description: string;
  amount: number;
  date: string;
  operation: number;
  status: number;
  cost_center_id: number;
  account_plan_id: number;
};

type PaginationProps = {
  page: number;
  limit: number;
  search: string;
  sort: GridSortDirection;
  field: string | undefined;
};

class TransactionModule extends AxiosFactory {
  async getAll(data: PaginationProps) {
    await this.csrf();

    return this.$axios.get("/api/transactions", { params: data });
  }

  async getById(id: string) {
    await this.csrf();

    return this.$axios.get(`/api/transactions/${id}`);
  }

  async create(data: TransactionProps) {
    await this.csrf();

    return this.$axios.post("/api/transactions", data);
  }

  async update(id: string, data: TransactionProps) {
    await this.csrf();

    return this.$axios.put(`/api/transactions/${id}`, data);
  }

  async delete(id: string) {
    await this.csrf();

    return this.$axios.delete(`/api/transactions/${id}`);
  }
}

export default TransactionModule;
