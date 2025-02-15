import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

const AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://127.0.0.1:8000/api/",
});

export { AxiosInstance };
