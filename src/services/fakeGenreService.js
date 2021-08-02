export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
];

export function getGenres() {
  return genres.filter((g) => g.name);
}

export function getGenreName(id) {
  console.log(genres[0].name);
}

const Genre = {
  genres,
  getGenres,
};

export default Genre;
