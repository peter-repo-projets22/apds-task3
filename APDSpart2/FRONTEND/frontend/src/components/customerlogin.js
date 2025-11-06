import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    accountNumber: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  const newcustomer = { ...form };
    try {
      const response = await fetch("/api/customers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newcustomer),
      });

      // Read body safely (handle non-JSON responses)
      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        // If response wasn't JSON, keep the raw text for an error message
        data = { message: text };
      }

      if (!response.ok) {
        // Use a helpful error message if available
        const errMsg = data.message || data.error || `HTTP error! status: ${response.status}`;
        throw new Error(errMsg);
      }

      // Successful login: expect token and user in response
      if (data && data.success) {
        if (data.token) localStorage.setItem("CustomerToken", data.token);
        // Backend returns `user` (not `newcustomer`). Store that.
        if (data.user) localStorage.setItem("customerData", JSON.stringify(data.user));

        setForm({ username: "", accountNumber: "", password: "" });
        // Optional friendly message
        // window.alert(data.message || "Login successful!");
        navigate("/customerpayments");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
      // keep alert if you like:
      window.alert(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ marginTop: "50px", maxWidth: "400px", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
      <h3 style={{ textAlign: "center" }}>Customer Login</h3>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Enter Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountNumber">Enter Account Number</label>
          <input
            type="text"
            className="form-control"
            id="accountNumber"
            value={form.accountNumber}
            onChange={(e) => updateForm({ accountNumber: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
            required
          />
        </div>

        <br />

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="form-group" style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <Link to="/signup">
            <button type="button" className="btn btn-secondary">
              Don't have an account? Signup
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
