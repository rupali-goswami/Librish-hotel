"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/app/components/dashboard.css";
import { useRouter } from "next/navigation";

type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const session = localStorage.getItem("adminSession");

    if (!session) {
      router.replace("/admin/login");
      return;
    }
  }, [router]);

  /* ================= DELETE CONTACT ================= */
  const deleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      const res = await fetch("/api/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Delete failed");

      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert("Failed to delete contact");
    }
  };

  /* ================= FETCH CONTACTS ================= */
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contact");
        const json = await res.json();

        if (!res.ok) throw new Error(json.message || "Failed to fetch");

        setContacts(json.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("adminSession");
    router.replace("/admin/login");
  };

  return (
    <>
      {/* ===== PAGE HEADER ===== */}
      <div className="inner_main_section">
        <h1>Admin Dashboard</h1>
        <div className="">
        <button onClick={logout} className="btn inner_btn">
          Logout
        </button>
        </div>
      </div>

      <div className="page_wrapper">
        {/* ===== DASHBOARD CARDS ===== */}
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Contacts</h3>
            <p className="count">{contacts.length}</p>
          </div>

          <div className="card">
            <h3>Bookings</h3>
            <Link href="/dashboard/bookdata">
              <button className="btn inner_btn">View Booking Data</button>
            </Link>
          </div>
        </div>

        {/* ===== CONTACT TABLE ===== */}
        <div className="dashboard">
          <h2 className="title">Contact Form List</h2>

          {loading && <p>Loading contacts…</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <div className="table-container">
              <table className="contact-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {contacts.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.message}</td>
                      <td>{new Date(c.timestamp).toLocaleString()}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteContact(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        No contacts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
