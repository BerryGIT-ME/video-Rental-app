import React from "react";

function SearchBox({ name, placeholder, onChange, value }) {
  return (
    <div className="form-group">
      <input
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        name={name}
        id={name}
        type="text"
        className="form-control"
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBox;
