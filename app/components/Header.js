"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="header">
      <div className="page_wrapper">
         <span
        className="humberger_icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
       <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 7L4 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M20 12L4 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M20 17L4 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
          Menu
      </span>

      <nav className={`nav left_menu ${menuOpen ? "active" : ""}`}>
        <span className="close_icon" onClick={() => setMenuOpen(false)}>X</span>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/rooms">Rooms</Link>
      </nav>




        <div className="main_logo">
          <Link href="/">
            <Image
              src="/logo-librish.webp"
              alt="Librish Logo"
              width={80}
              height={40}
              priority
            /></Link>
        </div>

        <nav className="nav right_menu">
          <Link href="/contact">Contact</Link>
          <Link href="/booking" className="btn book-now">
            <span>Book Now</span>
            <img src="/button-arrow.svg" width={16} height={16} loading="lazy" alt="arrow" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
