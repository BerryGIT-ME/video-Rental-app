import Http from "./httpService";
import { apiEndpoint } from "../config.json";
const dbGenre = async () => {
  const response = await Http.get(`${apiEndpoint}/genres`);

  return response.data;
};

export const genres = dbGenre();

export async function getGenres() {
  const results = await genres.filter((g) => g.name);
  return results;
}

export async function getGenreName(id) {}

const Genre = {
  genre: genres,
  getGenres,
};

export default Genre;
