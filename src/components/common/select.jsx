import React from "react";

function Select({ name, label, options, handleChange, error }) {
  return (
    <div className="form-group">
      <label htmlFor="genre">{label}</label>
      <select
        id={name}
        name={name}
        className="form-control"
        onChange={handleChange}
      >
        <option value="" />
        {options.map((genre) => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Select;
