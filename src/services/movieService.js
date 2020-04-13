import httpService from "./httpService";

const apiEndpoint = `/movies`;

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return httpService.get(apiEndpoint);
}

export function getMovie(id) {
  return httpService.get(movieUrl(id));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(movieUrl(movie._id), body);
  }
  return httpService.post(apiEndpoint, movie);
}

export function deleteMovie(id) {
  return httpService.delete(movieUrl(id));
}
