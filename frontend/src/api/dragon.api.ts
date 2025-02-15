import { Dragon, DragonFightRequest } from "@types";
import { AxiosInstance } from "utils/axios-instance";

export async function getDragons(): Promise<Dragon[]> {
  return AxiosInstance.get("/dragon").then((response) => response.data);
}

export async function postFightDragons(
  data: DragonFightRequest
): Promise<Dragon[]> {
  return AxiosInstance.post("/dragon/fight", data).then(
    (response) => response.data
  );
}
