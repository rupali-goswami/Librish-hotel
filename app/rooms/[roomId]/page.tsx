import BookingForm from "./BookingForm";

type Room = {
  maxAdults: number;
  maxChildren: number;
  roomId: number;
  type: string;
  price: number;
  availability: boolean;
  description: string;
};

export default async function SingleRoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params; // ✅ REQUIRED

  const res = await fetch(
    `http://localhost:3000/api/rooms/${roomId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <h2>Room not found</h2>;
  }

  const result = await res.json();
  const room: Room = result.data;

  return (
    <main>
          <div className="inner_main_section rooms_page">
        <h1>{room.type} - {room.roomId}</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li> |
             <li className="breadcrumb-item"><a href="/rooms">Rooms</a></li> |
            <li className="breadcrumb-item active" aria-current="page">{room.type} Rooms</li>
          </ol>
        </nav>
      </div>

<div className="page_wrapper single_room_page">
      <h2 className="title">{room.type} - {room.roomId}</h2>
      <br>

</br>
      <p>{room.description}</p>
      <br>

</br>
      <p><strong>Price:</strong> ₹{room.price} / Night</p>

<br>

</br>
<hr>
</hr>
       {/* ✅ Booking Form same page par */}
      <BookingForm roomId={room.roomId} price={room.price} maxAdults={room.maxAdults} maxChildren={room.maxChildren} />
   </div>
   
    </main>
  );
}
