import * as genresAPI from "./genreService";
import Http from "./httpService";
import { apiEndpoint } from "../config.json";

function movieUrl(movieId) {
  if (movieId) return `${apiEndpoint}/movies/${movieId}`;
  return `${apiEndpoint}/movies`;
}
const moviesFromDb = async () => {
  const response = await Http.get(movieUrl());
  return response.data;
};

export async function getMovies() {
  const movies = await moviesFromDb();
  return movies;
}

export async function getMovie(id) {
  const movies = await moviesFromDb();
  return movies.find((m) => m._id.toString() === id.toString());
}

export async function saveMovie(movie) {
  const movies = await moviesFromDb();
  let movieInDb;

  if (movie._id) {
    movieInDb = movies.find((m) => m._id === movie._id) || {};
  } else {
    movieInDb = {};
  }

  const genres = await genresAPI.genres;
  const genre = genres.find((g) => g._id === movie.genreId);

  movieInDb.title = movie.title;
  movieInDb.genreId = genre._id;
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  if (movieInDb._id) {
    // update
    const { title, genreId, numberInStock, dailyRentalRate, _id } = movieInDb;
    const body = { title, numberInStock, dailyRentalRate, genreId };
    console.log("update", body);
    return Http.put(`${movieUrl()}/${_id}`, body);
  } else {
    // save new movie
    console.log("new", movieInDb);
    return Http.post(movieUrl(), movieInDb);
  }
}

export async function deleteMovie(id) {
  return Http.delete(movieUrl(id));
}

export function getMovieToShow(movieList = [], moviePerPage, pageNo = 1) {
  let { start, end } = getStart_EndIndex(moviePerPage, pageNo);
  let maxIndex = movieList.length - 1;
  if (start > maxIndex) {
    start = maxIndex - (moviePerPage - 1);
    return movieList.slice(start);
  }
  if (end > maxIndex) {
    return movieList.slice(start);
  }
  return movieList.slice(start, end);
}

function getStart_EndIndex(moviePerPage, pageNo = 1) {
  let start = pageNo === 1 ? 0 : (pageNo - 1) * moviePerPage;
  let end = pageNo === 1 ? moviePerPage : pageNo * moviePerPage;
  return { start, end };
}
