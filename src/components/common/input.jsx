import React from "react";

function Input({
  name,
  label,
  onChange,
  value,
  error,
  type,
  placeholder = "",
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e)}
        name={name}
        id={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
