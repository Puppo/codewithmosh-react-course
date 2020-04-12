import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/genres`;

export function getGenres() {
  return httpService.get(apiEndpoint);
}
