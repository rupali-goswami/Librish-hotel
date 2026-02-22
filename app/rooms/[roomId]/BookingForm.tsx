"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/components/booking-form.css";

type BookingFormProps = {
  roomId: string;
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
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // ❌ No DB / availability logic here

    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates");
      return;
    }

    if (adults > maxAdults || children > maxChildren) {
      setError("Guests exceed room capacity");
      return;
    }

    // ✅ Redirect ONLY
    router.push(
  `/availability?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`
);

  };

  return (
    <section className="booking_card">
      <h2>Book This Room</h2>

      <p className="price_rate">₹{price} / night</p>

      <div className="field">
        <label>Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Adults (max {maxAdults})</label>
        <input
          type="number"
          min={1}
          max={maxAdults}
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label>Children (max {maxChildren})</label>
        <input
          type="number"
          min={0}
          max={maxChildren}
          value={children}
          onChange={(e) => setChildren(Number(e.target.value))}
        />
      </div>

      <button onClick={handleSubmit} className="check_btn">
        Check Availability
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </section>
  );
}
