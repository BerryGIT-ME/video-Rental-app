import React from "react";

function ListGroup({ Genre, showGenre, handleListGroup }) {
  return (
    <ul className="list-group">
      <li
        className={`list-group-item ${showGenre}`}
        onClick={() => handleListGroup("All Genres")}
      >
        All Genres
      </li>
      {Genre.map((genreType) => {
        return (
          <li
            key={genreType._id}
            className="list-group-item"
            onClick={() => handleListGroup(genreType.name)}
          >
            {genreType.name}
          </li>
        );
      })}
    </ul>
  );
}

export default ListGroup;
