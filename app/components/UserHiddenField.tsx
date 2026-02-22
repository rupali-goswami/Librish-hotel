"use client";

import { useEffect, useState } from "react";

export default function UserSessionField() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (!session) return;

    const parsed = JSON.parse(session);

    // 👇 adjust key name if needed
    setUserId(parsed.userId || parsed._id || "");
  }, []);

  if (!userId) return null;

  return <input type="hidden" name="userId" value={userId} />;
}
