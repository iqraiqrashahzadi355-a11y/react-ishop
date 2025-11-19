import React, { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // for success/error
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // reset previous message

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Save JWT token
        setMessageType("success");
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/admin"; // Redirect after short delay
        }, 1500);
      } else {
        setMessageType("error");
        setMessage(`❌ ${data.message || "Invalid credentials!"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessageType("error");
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
          Admin Login
        </h2>

        {/* Message box */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-white ${
              messageType === "success"
                ? "bg-blue-500" // success: lighter blue
                : "bg-blue-700" // error: darker blue
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
