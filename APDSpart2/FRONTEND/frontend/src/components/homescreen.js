import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomeScreen() {
  return (
    <div className="container" style={{ textAlign: "center", marginTop: "200px" }}>
      <h3>Welcome To The International Payment Portal</h3>
      <p>Make secure international payments quickly and easily.</p>

      <Link to="/customerlogin">
        <button className="btn btn-primary">
          Customer login
        </button>
      </Link>
       <Link to="/adminlogin">
        <button className="btn btn-primary">
          Admin Login
        </button>
      </Link>
    </div>
  );
}
