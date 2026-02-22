import rooms from "@/app/data/rooms.json";
import Link from "next/link";
import "@/app/components/booking-form.css";
import BookingClient from "./BookingClient";

type SearchParams = {
  roomId?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: string;
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  if (!params.roomId || !params.checkIn || !params.checkOut) {
    return <h2>❌ Invalid booking data</h2>;
  }

  const roomId = Number(params.roomId);
  const room = rooms.find((r) => r.roomId === roomId);
  if (!room) return <h2>❌ Room not found</h2>;

  const nights =
    (new Date(params.checkOut).getTime() -
      new Date(params.checkIn).getTime()) /
    (1000 * 60 * 60 * 24);

  if (nights <= 0) return <h2>❌ Invalid date selection</h2>;

  const totalPrice = room.price * nights;

  return (
    <>
      <div className="inner_main_section">
        <h1>Room Book</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li><Link href="/">Home</Link></li> | 
            <li>Room Book</li>
          </ol>
        </nav>
      </div>

      <section className="booking_page">
        <div className="page_wrapper">

          {/* SUMMARY — ALWAYS VISIBLE */}
          <div className="summary-box">
            <h2 className="title">{room.type} Room</h2>
            <ul className="list_data">
              <li>Room ID: {room.roomId}</li>
              <li>Guests: {params.adults ?? 1} Adult</li>
              <li>Nights: {nights}</li>
              <li>Check-in: {params.checkIn}</li>
              <li>Check-out: {params.checkOut}</li>
              <li>Price/Night: ₹{room.price}</li>
            </ul>
            <h3>Total: ₹{totalPrice}</h3>
          </div>

          {/* CLIENT SIDE LOGIN + FORM CONTROL */}
          <BookingClient
            roomId={room.roomId}
            checkIn={params.checkIn}
            checkOut={params.checkOut}
            total={totalPrice}
          />
        </div>
      </section>
    </>
  );
}
