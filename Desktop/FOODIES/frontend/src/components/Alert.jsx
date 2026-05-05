import React from "react";

function Alert({ type = "info", children }) {
  return <div className={`alert ${type}`}>{children}</div>;
}

export default Alert;
