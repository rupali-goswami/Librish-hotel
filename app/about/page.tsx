import Image from 'next/image';
import "../components/about.css";

export default function About() {
  return (
    <main>
      <div className="inner_main_section">
        <h1>About Us</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li> |
            <li className="breadcrumb-item active" aria-current="page">About Us</li>
          </ol>
        </nav>
      </div>

      <div className="about_hotel_section">
        <div className="page_wrapper">
          <div className="about_image">
            <div className="about_image_inner">
              <Image
                src="/about1.webp"
                alt="f-services"
                width={600}
                height={400}
                loading="lazy"
              />
              <Image
                src="/about2.webp"
                alt="f-services"
                width={600}
                height={400}
                loading="lazy"
              />
            </div>
            <div className="about_image_inner">
              <Image
                src="/main_banner.webp"
                alt="f-services"
                width={600}
                height={400}
                loading="lazy"
              />
              <Image
                src="/about3.webp"
                alt="f-services"
                width={600}
                height={400}
                loading="lazy"
              />
            </div>
          </div>
          <div className="about_content">
            <h3 className="subtitle">About the Librish Hotel</h3>
            <h2 className="title">A Refined Stay, Designed for Comfort</h2>
            <p> Welcome to <strong>Librish Hotel</strong>, where elegance, comfort, and thoughtful hospitality come together to create an exceptional stay. Our hotel is designed for guests who value peace, privacy, and premium living in a refined environment.
            </p>
            <p>Located in a prime setting, <strong>Librish Hotel</strong> offers a perfect balance of modern design and warm service. Whether you are visiting for business or leisure, we ensure a relaxing and seamless experience from the moment you arrive.</p>
          </div>
        </div>
      </div>

      <div className='designed_rooms_section'>
        <div className='page_wrapper'>
          <h2 className='title'>Thoughtfully Designed Rooms</h2>
          <p>Our hotel features a selection of luxurious and superior rooms, each carefully designed to offer maximum comfort. Spacious interiors, premium bedding, and modern amenities provide the ideal space to relax, recharge, and feel at home.
          </p>
          <p>Every room is maintained with the highest standards of cleanliness and care, ensuring a calm and refreshing atmosphere throughout your stay.
          </p>

          <h2 className='title top_space'>Our Promise to You</h2>

          <p>At Librish Hotel, luxury is not just about appearance — it’s about experience. We focus on the small details that matter most, creating a welcoming space where guests can unwind, feel valued, and enjoy true comfort.
        </p>
        </div>
      </div>

      <div className='librish_services'>
        <div className='page_wrapper'>


          <div className='content_services'>
            <h3 className='subtitle'>Our Services</h3>
            <h2 className='title'>Exceptional Service & Amenities</h2>
            <p>We take pride in delivering attentive service and well-maintained facilities. From daily housekeeping to responsive room service, our team is dedicated to making your stay comfortable and worry-free.
            </p>
            <ul>
              <li>Comfortable, standard-sized premium beds</li>
              <li>Daily cleaning and hygienic maintenance</li>
              <li>Spacious, well-lit rooms</li>
              <li>Modern bathrooms and essential amenities</li>
              <li>Friendly and professional staff</li>
            </ul>
          </div>

          <div className='service_img'>
            <Image
              src="/about2.webp"
              alt="f-services"
              width={600}
              height={400}
              loading="lazy"
            />
          </div>

        </div>
      </div>

    </main >
  )
}