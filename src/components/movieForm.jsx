import React from "react";
import queryString from "query-string";

function MovieForm({ location, history, match }) {
  const { id } = match.params;
  const { add, me } = queryString.parse(location.search);
  console.log({ location, history, match }, add, me);
  const handleSave = () => {
    history.replace("/movies");
  };
  return (
    <>
      <h1>Movie Form: {id}</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleSave()}
      >
        Save
      </button>
    </>
  );
}

export default MovieForm;
