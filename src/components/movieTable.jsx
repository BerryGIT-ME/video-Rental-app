import React from "react";
import Like from "./common/like";
import { Link } from "react-router-dom";

function MovieTable({ moviesToShow, onLike, onDelete, onSort }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("title")} scope="col">
            Title
          </th>
          <th onClick={() => onSort("genre")} scope="col">
            Genre
          </th>
          <th onClick={() => onSort("numberInStock")} scope="col">
            Stock
          </th>
          <th onClick={() => onSort("dailyRentalRate")} scope="col">
            Rate
          </th>
          <th onClick={() => onSort()} scope="col"></th>
          <th onClick={() => onSort()} scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {moviesToShow.map((movie) => {
          const { title, genre, numberInStock, dailyRentalRate, like } = movie;
          return (
            <tr key={movie._id}>
              <td>
                <Link to={`/movies/${movie._id}`}>{title}</Link>
              </td>
              <td>{genre.name}</td>
              <td>{numberInStock}</td>
              <td>{dailyRentalRate}</td>
              <td onClick={() => onLike(movie._id)}>
                <Like like={like} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie._id)}
                  type="button"
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default MovieTable;
