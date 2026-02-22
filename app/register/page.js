"use client";
import { useState, useEffect } from "react";
import "../components/forms.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  // ✅ check login session on load
  useEffect(() => {
    const session = localStorage.getItem("userSession");

    if (session) {
      try {
        const parsed = JSON.parse(session);

        // optional expiry check
        if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
          router.replace("/user");
        } else {
          localStorage.removeItem("userSession");
        }
      } catch {
        localStorage.removeItem("userSession");
      }
    }
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Registered successfully!");
      setForm({ name: "", email: "", password: "" });

      // ✅ optional: auto redirect to login
      setTimeout(() => router.replace("/login"), 1200);
    } else {
      setMessage(data.error);
    }
  };

  return (
    <main>
      <div className="inner_main_section">
        <h1>Signup</h1>
      </div>

      <div className="form_flex">
        <div className="user__form">
          <div className="under_form">
            <h2 className="title">Register</h2>

            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

              <button type="submit" className="btn inner_btn">Register</button>
            </form>

            {message && <p>{message}</p>}

            <div className="register_link">
              Already have an account? <Link className="link" href="/login">Login Here</Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
