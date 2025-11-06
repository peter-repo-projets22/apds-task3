import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Viewscreen() {
  return (
    <div className="container" style={{ textAlign: "center", marginTop: "200px" }}>
      <h3>Please select an option to proceed</h3>

      <Link to="/signup">
        <button className="btn btn-primary">
         Add A Customer
        </button>
      </Link>
       <Link to="/posts">
        <button className="btn btn-primary">
         View Transactions
        </button>
      </Link>
    </div>
  );
}
