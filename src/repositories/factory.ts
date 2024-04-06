// ** External Imports
import type { AxiosInstance } from "axios";

class AxiosFactory {
  protected $axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.$axios = axios;
  }

  async csrf() {
    return await this.$axios.get("/sanctum/csrf-cookie");
  }
}

export default AxiosFactory;
