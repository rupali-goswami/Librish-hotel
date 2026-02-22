"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/app/components/user.css";
/* ===== TYPES ===== */
interface User {
  _id: string;
  name: string;
  email: string;
}

interface Booking {
  _id: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  total: string;
  status: string;
  createdAt: string;
}


export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      router.replace("/login");
      return;
    }

    const session = JSON.parse(sessionStr);

    if (!session.expiresAt || Date.now() > session.expiresAt) {
      localStorage.removeItem("userSession");
      router.replace("/login");
      return;
    }

    setUser({
      _id: session.userId,
      name: session.name,
      email: session.email,
    });

    fetch(`/api/user/bookings?userId=${session.userId}`)
      .then((res) => res.json())
      .then((bData) => {
        if (bData.success) setBookings(bData.bookings);
      })
      .finally(() => setLoading(false));
  }, [router]);

  const cancelBooking = async (bookingId: string) => {
  if (!confirm("Are you sure you want to cancel this booking?")) return;

  try {
    const res = await fetch("/api/user/cancel-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId,
        userId: user?._id,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Booking cancelled successfully");

      // 🔄 UI update without reload
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Something went wrong");
  }
};


  const logout = () => {
    localStorage.removeItem("userSession");
    router.replace("/login");
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading dashboard...</p>;

  if (!user) return null;

  return (
    
    <main className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="inner_main_section"> <h1>User Dashboard</h1> </div>
      <div className="page_wrapper">
        <div className="dashboard-container">
  <div className="dashboard-header">
    <h1 className="dashboard-title">User Dashboard</h1>
    <div>
    <button className="logout-button" onClick={logout}>Logout</button>
    </div>
  </div>
</div>



      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-8 content_space">
        {/* USER CARD */}
        <div className="bg-white rounded-xl shadow extra_space">
          <h2 className="">Profile</h2>
          <div className="">
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            {/* <p><b>User ID:</b> {user._id}</p> */}
          </div>
        </div>

        {/* BOOKINGS */}
        <div className="bg-white rounded-xl shadow p-6 extra_space">
          <h2 className="title_booking">My Bookings</h2>

          {bookings.length === 0 && (
            <p className="text-gray-500">No bookings found</p>
          )}

          <div className="responsive-grid">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="book-data-user"
              >
                <div className="flex-row-space">
                  <h3 className="font-semibold text-gray-800">
                    Room ID: {b.roomId}
                  </h3>
                  <div className="flex-btn">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      b.status === "confirmed"
                        ? "status-user bg-green-100 text-green-700"
                        : "status-user bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {b.status}
                  </span>

                  

                  {b.status === "confirmed" && (
  <button
    onClick={() => cancelBooking(b._id)}
    className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm"
  >
    Cancel Booking
  </button>
)}

{b.status?.toLowerCase() !== "cancelled" && (
  <button
    onClick={() => cancelBooking(b._id)}
    className="btn-red"
  >
    Cancel Booking
  </button>
)}
</div>
                </div>

                <p className="text-sm text-gray-600">
                  <b>Check In:</b> {b.checkIn}
                </p>
                <p className="text-sm text-gray-600">
                  <b>Check Out:</b> {b.checkOut}
                </p>

                <p className="mt-2 font-semibold text-gray-800">
                  Total: ₹{b.total}
                </p>

                <p className="small-text">
                  Booked on {new Date(b.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
