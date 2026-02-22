import rooms from "@/app/data/rooms.json";
import Link from "next/link";
import "@/app/components/availablerooms.css";
import Image from "next/image";

type SearchParams = {
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  children?: string;
};

export default async function AvailabilityPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { checkIn, checkOut, adults = "0", children = "0" } = params;

  if (!checkIn || !checkOut) {
    return <p>Invalid date selection</p>;
  }

  const requestedCheckIn = new Date(checkIn);
  const requestedCheckOut = new Date(checkOut);

  // 🔹 Fetch bookings from DB
  const res = await fetch("http://localhost:3000/api/book-room", {
    cache: "no-store",
  });

  const bookingResponse = await res.json();
  const bookings = bookingResponse?.data ?? [];

  // ✅ FILTER AVAILABLE ROOMS
  const availableRooms = rooms.filter((room) => {
    // 1️⃣ Capacity check
    if (
      Number(adults) > room.maxAdults ||
      Number(children) > room.maxChildren
    ) {
      return false;
    }

    // 2️⃣ Room-wise DB booking overlap check
    const isBooked = bookings.some((booking: any) => {
      // 🔥 VERY IMPORTANT (string vs number fix)
      if (Number(booking.roomId) !== room.roomId) {
        return false;
      }

      const bookingCheckIn = new Date(booking.checkIn);
      const bookingCheckOut = new Date(booking.checkOut);

      // Date overlap logic
      return (
        requestedCheckIn < bookingCheckOut &&
        requestedCheckOut > bookingCheckIn
      );
    });

    return !isBooked;
  });

  return (
    <>
      <div className="inner_main_section">
        <h1>Available Rooms</h1>
        <p className="check_rooms">
          {checkIn} → {checkOut}
        </p>
      </div>
<div className="available_rooms_wrapper">
      <div className="page_wrapper">
        {availableRooms.length === 0 && (
          <p style={{ color: "red" }}>No rooms available</p>
        )}

        {availableRooms.map((room) => (
          <div
            key={room.roomId}
            className="available_room_card"
          >
            <div className="list_under">
            <h2>
              {room.type} - Room #{room.roomId}
            </h2>
            <p>₹{room.price} / night</p>
            <p>
              Max Adults: {room.maxAdults} | Max Children: {room.maxChildren}
            </p>
           </div>
            <Link
              href={`/booking?roomId=${room.roomId}&checkIn=${checkIn}&checkOut=${checkOut}`}
            >
              <button className="btn inner_btn">Book Now
                <Image src="/button-arrow.svg" width="16" height="16" loading="lazy" alt="arrow"></Image>
              </button>
            </Link>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
