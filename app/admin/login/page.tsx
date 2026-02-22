"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/components/dashboard.css";
import "@/app/components/forms.css";
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // already logged in → dashboard
  useEffect(() => {
    const session = localStorage.getItem("adminSession");
    if (session) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    localStorage.setItem(
      "adminSession",
      JSON.stringify({
        id: data.admin.id,
        email: data.admin.email,
        loggedIn: true,
      })
    );

    router.push("/dashboard");
  };

  return (
    <>
      <div className="inner_main_section">
        <h1>Admin Login</h1>
      </div>

    <div className="form_flex">
        <div className="user__form">
          <div className="under_form">
            <h2 className="title">Admin Login</h2>
      <form className="login-box" onSubmit={handleLogin}>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Admin ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn inner_btn">Login</button>
      </form>
    </div>
    </div>
    </div>
        </>
  );
}
