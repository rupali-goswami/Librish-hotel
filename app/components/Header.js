"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ LOGIN STATUS CHECK (NO REFRESH ISSUE)
  useEffect(() => {
    const checkSession = () => {
      setUserLoggedIn(!!localStorage.getItem("userSession"));
      setAdminLoggedIn(!!localStorage.getItem("adminSession"));
    };

    checkSession();

    // cross tab
    window.addEventListener("storage", checkSession);
    // same tab
    window.addEventListener("auth-change", checkSession);

    return () => {
      window.removeEventListener("storage", checkSession);
      window.removeEventListener("auth-change", checkSession);
    };
  }, []);

  // 👤 USER LOGOUT
  const userLogout = () => {
    localStorage.removeItem("userSession");
    window.dispatchEvent(new Event("auth-change"));
    router.replace("/login");
  };

  // 🔐 ADMIN LOGOUT
  const adminLogout = () => {
    localStorage.removeItem("adminSession");
    window.dispatchEvent(new Event("auth-change"));
    router.replace("/admin/login");
  };

  return (
    <header className="header">
      <div className="page_wrapper">

        {/* ☰ HAMBURGER */}
        <span
          className="humberger_icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 7H4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 12H4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 17H4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Menu
        </span>

        {/* LEFT MENU */}
        <nav className={`nav left_menu ${menuOpen ? "active" : ""}`}>
          <span className="close_icon" onClick={() => setMenuOpen(false)}>X</span>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/rooms">Rooms</Link>
        </nav>

        {/* LOGO */}
        <div className="main_logo">
          <Link href="/">
            <Image
              src="/hotel-the-librish.webp"
              alt="Librish Logo"
              width={220}
              height={129}
              priority
            />
          </Link>
        </div>

        {/* RIGHT MENU */}
        <nav className="nav right_menu">
          <Link href="/contact">Contact</Link>

          {/* 🔐 ADMIN */}
          {adminLoggedIn && (
            <button onClick={adminLogout} className="btn book-now">
              <span>Admin Logout</span>
              <Image src="/button-arrow.svg" width={16} height={16} alt="arrow" />
            </button>
          )}

          {/* 👤 USER */}
          {!adminLoggedIn && userLoggedIn && (
            <button onClick={userLogout} className="btn book-now">
              <span>Logout</span>
              <Image src="/button-arrow.svg" width={16} height={16} alt="arrow" />
            </button>
          )}

          {/* ❌ GUEST */}
          {!adminLoggedIn && !userLoggedIn && (
            <Link href="/login" className="btn book-now">
              <span>Login</span>
              <Image src="/button-arrow.svg" width={16} height={16} alt="arrow" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
