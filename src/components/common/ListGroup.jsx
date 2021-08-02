import React from "react";

function ListGroup({ Genre, showGenre, handleListGroup }) {
  return (
    <ul className="list-group">
      <li
        className={`list-group-item ${
          showGenre === "All Genres" ? "active" : ""
        }`}
        onClick={() => handleListGroup("All Genres")}
      >
        All Genres
      </li>
      {Genre.map((genre) => {
        return (
          <li
            key={genre._id}
            className={`list-group-item ${
              showGenre === genre.name ? "active" : ""
            }`}
            onClick={() => handleListGroup(genre.name)}
          >
            {genre.name}
          </li>
        );
      })}
    </ul>
  );
}

export default ListGroup;
