"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../components/forms.css";
import Image from "next/image";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      router.replace("/user"); // Redirect to user page or dashboard
    }
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        console.error("Invalid JSON:", text);
        data = {};
      }

      if (res.ok) {
        setMessage("Login successful!");

        const sessionData = {
          userId: data.user.id,      // 🔴 IMPORTANT (userId)
          email: data.user.email,
          name: data.user.name,
          expiresAt: Date.now() + 60 * 60 * 1000 // ⏱️ 1 hour
        };

        localStorage.setItem("userSession", JSON.stringify(sessionData));

        // Redirect to user page after successful login
        router.replace("/user");
      }
      else {
        setMessage(data.error || "Login failed");
      }

    } catch (err) {
      console.error("Network error:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <main>
      <div className="inner_main_section">
        <h1>User Login</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li> |
            <li className="breadcrumb-item active" aria-current="page">
              User Login
            </li>
          </ol>
        </nav>
      </div>

      <div className="form_flex">
        <div className="user__form">
          <div className="under_form">
            <h2 className="title">User Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button type="submit" className="btn inner_btn">Login</button>
            </form>
            {message && <p className="error_msg">{message}</p>}

            <div className="register_link">
              Don't have an account? 
              <div className="link" onClick={() => router.push("/register")}>Register</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
