"use client";

import { useRef } from "react";
import Image from "next/image";
import "./components/home.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TestimonialSlider from "./components/TestimonialSlider";
import HeroController from "./components/HeroController";
import Link from "next/link";


export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null!);
  return (
    <main>
      <div className="hero_section">
       <HeroController />
        <div className="under_hero_section">
          <h2 className="tag_name">Luxury Hotel</h2>
          <div className="page_wrapper">
            <div>
              <h3> Enjoy Your Wonderful Holidays With A Great Luxury Experience!</h3>
              <h1>Most Relaxing Place</h1>
              <Link className="btn" href="#">Discover Rooms
                <img src="/button-arrow.svg" width={16} height={16} loading="lazy" alt="arrow" />
              </Link>
            </div>
           
          </div>

          
        </div>
      </div>


      <div className="about_section">
        <div className="page_wrapper">
          <div className="about_card">

            <div className="single_card">
              <div className="card_content">
                <span className="flaticon flaticon-pillow"></span>
                <h3>Cozy & Spacious Rooms</h3>
                <p>Our rooms are thoughtfully designed with modern amenities, comfortable bedding, and a relaxing ambiance to ensure a pleasant stay.</p>
              </div>
              <div className="card_image">
                <Image
                  src="/f-services.jpg"
                  alt="f-services"
                  width={600}
                  height={400}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="single_card">
              <div className="card_content">
                <span className="flaticon flaticon-special"></span>
                <h3>Ideal for Couples & Families</h3>
                <p>Hotel Librish is a perfect choice for couples and families, offering privacy, safety, and a welcoming environment.</p>
              </div>
              <div className="card_image">
                <Image
                  src="/01.webp"
                  alt="About Image"
                  width={600}
                  height={400}
                  loading="lazy"
                />
              </div>
            </div>

          </div>
          <div className="about_content">
            <h3 className="subtitle">About Us</h3>
            <h2 className="title">A Luxury Hotel with a Touch of Nature</h2>
            <p>
              Hotel Librish offers a peaceful and elegant stay experience in the heart of Surat, Gujarat.
              Surrounded by a calm atmosphere and designed with modern comfort in mind, our hotel is the perfect escape from the busy city life.
            </p>
            <p>Whether you are traveling for business or leisure, Hotel Librish ensures a relaxing stay with premium services, stylish interiors, and warm hospitality.</p>
            <Link className="btn inner_btn" href="#">About Us
              <img src="/button-arrow.svg" width={16} height={16} loading="lazy" alt="arrow" />
            </Link>
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

      <div className="ftco-intro">
        <div className="page_wrapper">
          <div className="ftco-intro-content">
            <h3 className="subtitle">Find Best Hotel For Leaving</h3>
            <h2 className="title">Find the Best Hotel in Your Next Vacation</h2>
          </div>
          <Link className="btn inner_btn" href="#">Book Now
            <img src="/button-arrow.svg" width={16} height={16} loading="lazy" alt="arrow" />
          </Link>
        </div>
      </div>

      <div className="our_room_section">
        <div className="page_wrapper">
          <h3 className="subtitle">Our Rooms</h3>
          <h2 className="title">Choose Your Comfortable Room</h2>

          <div className="room_cards">
            <div className="single_room_card">
              <div className="room_info">
                <h4>Suite Room</h4>
                <p>Spacious and elegant, our Suite Room is designed for guests who enjoy extra comfort and privacy. Featuring modern décor, a plush king-size bed, and a relaxing seating area.</p>
                <div className="price_per_night">
                  <span>$450 / Night</span>
                  <Link href="#" className="btn_book_now">Book Now</Link>
                </div>
              </div>
              <Image
                src="/room-1.webp"
                alt="room-1"
                width={600}
                height={400}
                loading="lazy"
              />
            </div>

            <div className="single_room_card">
              <div className="room_info">
                <h4>Family Room</h4>
                <p>Perfect for families or small groups, the Family Room offers ample space, comfort, and convenience. Enjoy a warm ambiance with thoughtfully arranged interiors.</p>
                <div className="price_per_night">
                  <span>$350 / Night</span>
                  <Link href="#" className="btn_book_now">Book Now</Link>
                </div>
              </div>
              <Image
                src="/room-1.webp"
                alt="room-1"
                width={600}
                height={400}
                loading="lazy"
              />
            </div>

            <div className="single_room_card">
              <div className="room_info">
                <h4>Deluxe Room</h4>
                <p>Our Deluxe Room blends style and comfort, making it ideal for business travelers and couples. Designed with modern furnishings and calming tones.</p>
                <div className="price_per_night">
                  <span>$300 / Night</span>
                  <Link href="#" className="btn_book_now">Book Now</Link>
                </div>
              </div>
              <Image
                src="/room-3.webp"
                alt="room-3"
                width={600}
                height={400}
                loading="lazy"
              />
            </div>
          </div>


        </div>
      </div>

      <div className="hotel_tour_section">
        <div className="page_wrapper">
          <h3 className="subtitle">Watch our luxurious hotel</h3>
          <h2 className="title">Take A Tour</h2>
          <Link className="youtube_icon" href="#"><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="30px" height="30px" viewBox="0 0 24 24"><path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"></path></svg></Link>
        </div>
      </div>

      <div className="testimonial_section">
        <div className="page_wrapper">
          <h3 className="subtitle">Testimonials</h3>
          <h2 className="title">What Our Guests Are Saying</h2>
          <TestimonialSlider />
       
      </div>
</div>

    </main>
  );
}
