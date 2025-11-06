import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    idNumber: "",
    accountNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
    // Clear errors when user starts typing
    if (errors.length > 0) setErrors([]);
    if (successMessage) setSuccessMessage("");
  }

  async function onSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);
    setSuccessMessage("");

    try {
      const response = await fetch("/api/customers/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username.trim(),
          fullName: form.fullName.trim(),
          idNumber: form.idNumber.trim(),
          accountNumber: form.accountNumber.trim(),
          password: form.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors or duplicate user errors
        if (data.errors && Array.isArray(data.errors)) {
          setErrors(data.errors);
        } else if (data.message) {
          setErrors([data.message]);
        } else {
          setErrors(["Signup failed. Please try again."]);
        }
        setIsSubmitting(false);
        return;
      }

      // Success case
      setSuccessMessage(data.message || "Registration successful!");
      
      // Reset form
      setForm({ 
        username: "", 
        fullName: "", 
        accountNumber: "", 
        idNumber: "", 
        password: "" 
      });

      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate("/viewscreen");
      }, 2000);
      
    } catch (error) {
      console.error("Signup error:", error);
      setErrors(["Network error. Please check your connection and try again."]);
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ marginTop: "250px", maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
      <h3 style={{ textAlign: "center" }}>Welcome To The International Payment Portal</h3>
      <p style={{ textAlign: "center", fontSize: "17pt" }}>Make secure international payments quickly and easily.</p>
      <p style={{ textAlign: "center", fontSize: "17pt" }}>Please enter your details to create an account</p>

      {/* Display success message */}
      {successMessage && (
        <div className="alert alert-success">
          <strong>Success!</strong> {successMessage}
        </div>
      )}

      {/* Display errors */}
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <strong>Please fix the following errors:</strong>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
            required
          />
          <small className="form-text text-muted">
            Must be 3-20 characters, alphanumeric, underscores, hyphens only
          </small>
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={form.fullName}
            onChange={(e) => updateForm({ fullName: e.target.value })}
            required
          />
          <small className="form-text text-muted">
            Must be 2-50 characters, letters, spaces, hyphens, apostrophes only
          </small>
        </div>

        <div className="form-group">
          <label>ID Number</label>
          <input
            type="text"
            className="form-control"
            value={form.idNumber}
            onChange={(e) => updateForm({ idNumber: e.target.value })}
            required
          />
          <small className="form-text text-muted">
            Must be 5-20 alphanumeric characters
          </small>
        </div>

        <div className="form-group">
          <label>Account Number</label>
          <input
            type="text"
            className="form-control"
            value={form.accountNumber}
            onChange={(e) => updateForm({ accountNumber: e.target.value })}
            required
          />
          <small className="form-text text-muted">
            Must be 8-20 alphanumeric characters
          </small>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
            required
          />
          <small className="form-text text-muted">
            Must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%?&)
          </small>
        </div>

        <br />

        <div className="form-group">
          <input
            type="submit"
            value={isSubmitting ? "Creating Account..." : "Signup"}
            className="btn btn-primary"
            style={{ marginRight: "10px" }}
            disabled={isSubmitting}
          />
          <Link to="/customerlogin">
            <button type="button" className="btn btn-secondary">
              Already Have An Account? Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}