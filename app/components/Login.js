"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true)

    try {
      const res = await signIn("credentials", {
        redirect: false,
        adminName: adminName,
        adminPassword: adminPassword,
      });

      if (res.error) {
        console.log(res.error)
        setLoading(false)

        setError("Invalid credentials");
      } else {
        setError("");
        
        router.replace("/dashboard");
        
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "300px" }}>
        <h3 className="text-center mb-4">Admin Login</h3>
        <div className="form-group mb-3">
          <label htmlFor="adminName">Admin Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="adminName"
            placeholder="Enter admin name"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="adminPassword">Password</label>
          <input
            required
            type="password"
            className="form-control"
            id="adminPassword"
            placeholder="Enter password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </div>
         <button
      className="btn btn-primary w-100 mb-3"
      disabled={loading}
      onClick={handleLogin}
    >
      {loading ? 'Loading...' : 'Login'}
    </button>
        {error && <div className="text-danger text-center">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
