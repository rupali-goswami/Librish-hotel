"use client";

import { useEffect, useState } from "react";

export default function BookingAuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loggedIn = document.cookie
      .split("; ")
      .some((c) => c.startsWith("user="));

    setIsLoggedIn(loggedIn);
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <>
      {!isLoggedIn && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          ⚠️ Please login to continue booking
        </p>
      )}

      {/* children ke andar form hoga */}
      <div style={{ opacity: isLoggedIn ? 1 : 0.6, pointerEvents: isLoggedIn ? "auto" : "none" }}>
        {children}
      </div>
    </>
  );
}
