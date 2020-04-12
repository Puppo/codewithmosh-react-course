import httpService from "./httpService";

export function getGenres() {
  return httpService.get("http://localhost:3000/api/genres");
}
