import React from "react";
import Like from "./common/like";
import { Link } from "react-router-dom";
import auth from "../services/authService";

function MovieTable({ moviesToShow, onLike, onDelete, onSort }) {
  const user = auth.decode();
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
          <th scope="col"></th>
          {user && <th scope="col"></th>}
        </tr>
      </thead>
      <tbody>
        {moviesToShow.map((movie) => {
          const { title, genre, numberInStock, dailyRentalRate, like } = movie;
          return (
            <tr key={movie._id}>
              <td>
                {user && user.isAdmin ? (
                  <Link to={`/movies/${movie._id}`}>{title}</Link>
                ) : (
                  <p>{title}</p>
                )}
              </td>
              <td>{genre.name}</td>
              <td>{numberInStock}</td>
              <td>{dailyRentalRate}</td>
              <td onClick={() => onLike(movie._id)}>
                <Like like={like} />
              </td>
              {user && user.isAdmin && (
                <td>
                  <button
                    onClick={() => onDelete(movie._id)}
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default MovieTable;
