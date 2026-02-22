import type { Metadata } from "next";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./components/common.css";

import { Marcellus, Jost } from "next/font/google";

export const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"], // only supported weight
  display: "swap",
});

export const jost = Jost({
  subsets: ["latin"],
  weight: ["400"], // only supported weight
  display: "swap",
});


export const metadata: Metadata = {
  title: "Hotel Librish",
  description: "A/C Rooms, Cafe & Banquet Hall - Your comfort is our priority. Experience luxury and tranquility at Hotel Librish.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`$ antialiased`}
      >
         <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
