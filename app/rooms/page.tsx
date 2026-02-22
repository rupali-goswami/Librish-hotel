import Image from 'next/image';
import "../components/home.css";
import "../components/rooms.css";
import Link from "next/link";

type Room = {
  roomId: number;
  type: string;
  price: number;
  availability: boolean;
  description: string;
};

export default async function Rooms() {
  const res = await fetch("http://localhost:3000/api/rooms", {
    cache: "no-store"
  });

  const result = await res.json();
  const rooms: Room[] = result.data;

  return (
    <main>
      <div className="inner_main_section rooms_page">
        <h1>Rooms</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li> |
            <li className="breadcrumb-item active" aria-current="page">Rooms</li>
          </ol>
        </nav>
      </div>



       <div className="our_room_section">
              <div className="page_wrapper">
                <h3 className="subtitle">Our Rooms</h3>
                <h2 className="title">Choose Your Comfortable Room</h2>
      
      <div className="room_cards">
  {rooms.map((room) => (
    <div className="single_room_card" key={room.roomId}>
      
      <div className="room_info">
        <h3>{room.roomId}</h3>
        <h4>{room.type} Room</h4>

        <p>{room.description}</p>

        <div className="price_per_night">
          <span>₹{room.price} / Night</span>

          <Link
            href={`/rooms/${room.roomId}`}
            className="btn_book_now"
          >
            Book Now
          </Link>
        </div>
      </div>

      <Link className="room_image" href={`/rooms/${room.roomId}`}>
        <Image
          src="/room-1.webp"
          alt={room.type}
          width={600}
          height={400}
          loading="lazy"
        />
      </Link>

    </div>
  ))}
</div>


      
      
              </div>
            </div>

              <div className="services_section">
        <div className="page_wrapper">
          <h3 className="subtitle">Our Services</h3>
          <h2 className="title">Experience Unmatched Comfort & Luxury</h2>
          <div className="services_card">

            <div className="single_service">
              <span className="flaticon flaticon-wifi-signal"></span>
              <div className="text">
                <h4>Free Wifi</h4>
              </div>
            </div>

            <div className="single_service">
              <span className="flaticon flaticon-online-booking"></span>
              <div className="text">
                <h4>Easy Booking</h4>
              </div>
            </div>

            <div className="single_service">
              <span className="flaticon flaticon-cooking"></span>
              <div className="text">
                <h4>Restaurant</h4>
              </div>
            </div>


            <div className="single_service">
              <span className="flaticon flaticon-cosmetics"></span>
              <div className="text">
                <h4>Beauty & Health</h4>
              </div>
            </div>


            <div className="single_service">
              <span className="flaticon flaticon-reception"></span>
              <div className="text">
                <h4>Help & Support</h4>
              </div>
            </div>


          </div>
        </div>
      </div>
      </main>
    );
}