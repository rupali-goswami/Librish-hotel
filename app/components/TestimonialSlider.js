"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const TestimonialSlider = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={3}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      loop={true}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }}
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="single_testimonial_card">
          <div className="testi_wrap">
            <Image src="/testi-thumb2.webp" alt="testi" width={50} height={50} />
            <div className="testi_info">
              <h4>Vaishali Sharma.</h4>
              <h5>Indore (M.P.)</h5>
            </div>
          </div>
          <div className="testi_content">
            <p>
              "My stay at Hotel Librish was absolutely wonderful! The staff were
              incredibly friendly and attentive, making me feel right at home."
            </p>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="single_testimonial_card">
          <div className="testi_wrap">
            <Image src="/testi-thumb2.webp" alt="testi" width={50} height={50} />
            <div className="testi_info">
              <h4>Rupal Tyagi.</h4>
              <h5>Surat (Gujarat)</h5>
            </div>
          </div>
          <div className="testi_content">
            <p>
              "Hotel Librish exceeded all my expectations! Elegant ambiance,
              top-notch service, and perfect location."
            </p>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <div className="single_testimonial_card">
          <div className="testi_wrap">
            <Image src="/testi-thumb2.webp" alt="testi" width={50} height={50} />
            <div className="testi_info">
              <h4>Neha Jaiswal.</h4>
              <h5>Indore (M.P.)</h5>
            </div>
          </div>
          <div className="testi_content">
            <p>
              "Amazing experience! Cozy rooms, peaceful atmosphere, and
              delicious food. Will definitely come back."
            </p>
          </div>
        </div>
      </SwiperSlide>

       {/* Slide 1 */}
      <SwiperSlide>
        <div className="single_testimonial_card">
          <div className="testi_wrap">
            <Image src="/testi-thumb2.webp" alt="testi" width={50} height={50} />
            <div className="testi_info">
              <h4>Vaishali Sharma.</h4>
              <h5>Indore (M.P.)</h5>
            </div>
          </div>
          <div className="testi_content">
            <p>
              "My stay at Hotel Librish was absolutely wonderful! The staff were
              incredibly friendly and attentive, making me feel right at home."
            </p>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="single_testimonial_card">
          <div className="testi_wrap">
            <Image src="/testi-thumb2.webp" alt="testi" width={50} height={50} />
            <div className="testi_info">
              <h4>Rupal Tyagi.</h4>
              <h5>Surat (Gujarat)</h5>
            </div>
          </div>
          <div className="testi_content">
            <p>
              "Hotel Librish exceeded all my expectations! Elegant ambiance,
              top-notch service, and perfect location."
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default TestimonialSlider;
