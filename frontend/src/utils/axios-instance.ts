import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export { AxiosInstance };
