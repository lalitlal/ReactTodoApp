import React from "react";
import tst_logo from "../images/tst_logo.jpg";
function User() {
  return (
    <div className="User">
      <div className="logo">
        <img src={tst_logo} alt="logo" />
      </div>
      <div className="info">
        <p>Lalit's React App</p>
      </div>
    </div>
  );
}

export default User;
