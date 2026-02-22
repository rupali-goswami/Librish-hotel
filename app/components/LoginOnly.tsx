"use client";
import Link from "next/link";
import { useState } from "react";

type LoginOnlyProps = {
  onSuccess: () => void;   // ✅ function type
};

export default function LoginOnly({ onSuccess }: LoginOnlyProps) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem(
        "userSession",
        JSON.stringify({
          userId: data.user.id,
          email: data.user.email,
          name: data.user.name,
          expiresAt: Date.now() + 60 * 60 * 1000,
        })
      );

      onSuccess(); // ✅ no TS error now
    } else {
      setMessage(data.error || "Login failed");
    }
  };

  return (
    <div className="form_flex">
        <div className="user__form">
          <div className="under_form">
            <h2 className="title">User Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
</div>              <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
</div>
              <button type="submit" className="btn inner_btn">Login</button>
            </form>
            {message && <p className="error_msg">{message}</p>}

            <div className="register_link">
              Don't have an account? 
              <Link className="link" href="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
  );
}
