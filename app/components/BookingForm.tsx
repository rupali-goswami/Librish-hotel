"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type BookingFormProps = {
  roomId: number;
  price: number;
  maxAdults: number;
  maxChildren: number;
};

export default function BookingForm({
  roomId,
  price,
  maxAdults,
  maxChildren,
}: BookingFormProps) {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 🔥 very important

    if (!checkIn || !checkOut) {
      alert("Please select dates");
      return;
    }

    const url = `/availability?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`;

    console.log("REDIRECTING TO:", url); // 🔍 debug

    router.push(url);
  };

  return (
    <form>
      <h2>Book This Room</h2>

      <label>Check-in</label>
      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />

      <label>Check-out</label>
      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />

      <label>Adults</label>
      <input
        type="number"
        min={1}
        max={maxAdults}
        value={adults}
        onChange={(e) => setAdults(+e.target.value)}
      />

      <label>Children</label>
      <input
        type="number"
        min={0}
        max={maxChildren}
        value={children}
        onChange={(e) => setChildren(+e.target.value)}
      />

      {/* 🔴 IMPORTANT FIX */}
      <button type="button" onClick={handleRedirect}>
        Check Availability
      </button>
    </form>
  );
}
