"use client";

import { useEffect, useState } from "react";
import LoginOnly from "@/app/components/LoginOnly";
import UserHiddenField from "@/app/components/UserHiddenField";

type Props = {
  roomId: number;
  checkIn: string;
  checkOut: string;
  total: number;
};

export default function BookingClient({
  roomId,
  checkIn,
  checkOut,
  total,
}: Props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // ✅ 1. INITIAL CHECK (page load / back / refresh)
    const session = localStorage.getItem("userSession");
    setLoggedIn(!!session);
    setReady(true);

    // ✅ 2. CROSS TAB SYNC
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "userSession") {
        setLoggedIn(!!event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () =>
      window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ⛔ prevent flicker
  if (!ready) return null;

  return (
    <>
      {/* LOGIN UI — ONLY WHEN NOT LOGGED IN */}
      {!loggedIn && (
        <>
          <p style={{ color: "red", marginTop: 20 }}>
            Please login to complete your booking
          </p>
          <LoginOnly onSuccess={() => setLoggedIn(true)} />
        </>
      )}

      {/* BOOKING FORM */}
      <form
        action="/api/book-room"
        method="POST"
        className={`billing-form ${!loggedIn ? "disabled-form" : ""}`}
      >
        <input type="hidden" name="roomId" value={roomId} />
        <input type="hidden" name="checkIn" value={checkIn} />
        <input type="hidden" name="checkOut" value={checkOut} />
        <input type="hidden" name="total" value={total} />

        {loggedIn && <UserHiddenField />}

        <h2 className="title">Billing Information</h2>

        <fieldset disabled={!loggedIn}>
          <div className="field">
            <input name="firstName" placeholder="First Name" required />
          </div>
          <div className="field">
            <input name="lastName" placeholder="Last Name" required />
          </div>
          <div className="field">
            <input name="email" type="email" placeholder="Email" required />
          </div>
          <div className="field">
            <input name="phone" placeholder="Phone" required />
          </div>
          <div className="field">
            <input name="address" placeholder="Address" required />
          </div>
          <div className="field">
            <input name="city" placeholder="City" required />
          </div>
          <div className="field">
            <input name="state" placeholder="State" required />
          </div>
          <div className="field">
            <input name="zip" placeholder="Zip" required />
            <input name="country" defaultValue="India" />
          </div>
          <textarea
            className="field"
            name="specialRequest"
            placeholder="Special Requests"
          />
        </fieldset>

        <button className="btn inner_btn book-now" disabled={!loggedIn}>
          Confirm Reservation
        </button>
      </form>
    </>
  );
}
