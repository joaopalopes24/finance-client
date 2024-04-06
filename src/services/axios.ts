// ** External Imports
import axios from "axios";

// ** Internal Imports
import appConfig from "@/config/app";

const client = axios.create({
  baseURL: appConfig.apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default client;
