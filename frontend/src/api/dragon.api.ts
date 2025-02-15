import { AxiosInstance } from "utils/axios-instance";

export async function getDragons(): Promise<string[]> {
  return AxiosInstance.get("/dragon").then((response) => response.data);
}
