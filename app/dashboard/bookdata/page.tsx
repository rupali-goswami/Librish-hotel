"use client";

import { useEffect, useState } from "react";
import "@/app/components/dashboard.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Booking {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  total: string;
  status: string;
  createdAt: string;
}

export default function BookDataPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("adminSession");

    if (!session) {
      router.replace("/admin/login");
    }
  }, [router]);

  const fetchBookings = async () => {
    const res = await fetch("/api/adminbookingdata");
    const json = await res.json();
    setBookings(json.data);
    setLoading(false);
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Delete this booking?")) return;

    await fetch("/api/adminbookingdata", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    
    <div>
        <div className="inner_main_section">
        <h1>Booking Data</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li> |
            <li className="breadcrumb-item active" aria-current="page">
              Booking Data
            </li>
          </ol>
        </nav>
      </div>
      <div className="dashboard">
      <h2 className="title">📋 Booking List (Admin)</h2>

      <table className="contact-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Guest</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Room</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, i) => (
            <tr key={b._id}>
              <td>{i + 1}</td>
              <td>{b.firstName} {b.lastName}</td>
              <td>{b.email}</td>
              <td>{b.phone}</td>
              <td>{b.roomId}</td>
              <td>{b.checkIn}</td>
              <td>{b.checkOut}</td>
              <td>₹{b.total}</td>
              <td>
                <span style={{ color: b.status === "pending" ? "orange" : "green" }}>
                  {b.status}
                </span>
              </td>
              <td>{new Date(b.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => deleteBooking(b._id)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
