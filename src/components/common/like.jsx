import React from "react";

function Like({ like }) {
  return (
    <i className={`fa fa-heart${like ? "" : "-o"}`} aria-hidden="true"></i>
  );
}

export default Like;
