import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({
     adminusername: "",
      adminpassword: ""
     });
       const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  function updateForm(value) {
    return setForm((prev) =>{
   return{...prev,...value}
  });
}

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const newadmin = { ...form };

  try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newadmin),
      });
     // Check if response is OK
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Store token and admin data
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminData", JSON.stringify(data.admin));
        
        // Reset form
        setForm({ adminusername: "", adminpassword: "" });
        
        // Show success message
        window.alert(data.message || "Login successful!");
        
        // Navigate to customer payments
        navigate( "/viewscreen");
      } else {
        throw new Error(data.error || "Login failed");
      }

    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
      window.alert(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ marginTop: "150px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h3>Admin Login</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Enter Username</label>
          <input
            type="text"
            className="form-control"
            id="adminusername"
            value={form.adminusername}
            onChange={(e) => updateForm({ adminusername: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Enter Password</label>
          <input
            type="text"
            className="form-control"
            id="adminpassword"
            value={form.adminpassword}
            onChange={(e) => updateForm({ adminpassword: e.target.value })}
            required
          />
        </div>

        <br />
        <div className="form-group">
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>

      <div style={{ marginTop: "10px" }}>
        <Link to="/adminsignup" className="btn btn-secondary">
          Don’t Have An Account? Signup
        </Link>
      </div>
    </div>
  );
}
