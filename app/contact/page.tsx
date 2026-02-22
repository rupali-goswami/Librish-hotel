"use client";

import { useState } from "react";
import "../components/contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitStatus(null); // Clear previous status on change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Message sent successfully!",
        });
        // Reset form
        setForm({
          name: "",
          email: "",
          subject: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Failed to send message",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="inner_main_section">
        <h1>Contact Us</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>{" "}
            |
            <li className="breadcrumb-item active" aria-current="page">
              Contact Us
            </li>
          </ol>
        </nav>
      </div>

      <div className="contact_section">
        <div className="page_wrapper">
          <div className="contact_form">
            <h3 className="subtitle">Send us an email</h3>
            <h2 className="title">Feel free to write</h2>
            {submitStatus && (
              <div className={`status-message ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Enter Subject"
                value={form.subject}
                onChange={handleChange}
                disabled={loading}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone"
                value={form.phone}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <textarea
                name="message"
                placeholder="Enter Message"
                value={form.message}
                onChange={handleChange}
                disabled={loading}
                rows={5}
              />

              <button
                type="submit"
                className="btn inner_btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          <div className="contact_content">
            <h3 className="subtitle">Need any help?</h3>
            <h2 className="title">Get in Touch with Librish Hotel</h2>
            <p>
              Have questions or need assistance? Reach out to us anytime—our
              team at Librish Hotel is here to help.
            </p>
            <div className="contact_info">
              <ul>
                <li>
                  <a href="tel:+911234567890">
                    <span>
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#f7c868"
                      >
                        <path d="M23.407 30.394c-2.431 0-8.341-3.109-13.303-9.783-4.641-6.242-6.898-10.751-6.898-13.785 0-2.389 1.65-3.529 2.536-4.142l0.219-0.153c0.979-0.7 2.502-0.927 3.086-0.927 1.024 0 1.455 0.599 1.716 1.121 0.222 0.442 2.061 4.39 2.247 4.881 0.286 0.755 0.192 1.855-0.692 2.488l-0.155 0.108c-0.439 0.304-1.255 0.869-1.368 1.557-0.055 0.334 0.057 0.684 0.342 1.068 1.423 1.918 5.968 7.55 6.787 8.314 0.642 0.6 1.455 0.685 2.009 0.218 0.573-0.483 0.828-0.768 0.83-0.772l0.059-0.057c0.048-0.041 0.496-0.396 1.228-0.396 0.528 0 1.065 0.182 1.596 0.541 1.378 0.931 4.487 3.011 4.487 3.011l0.050 0.038c0.398 0.341 0.973 1.323 0.302 2.601-0.695 1.327-2.85 4.066-5.079 4.066zM9.046 2.672c-0.505 0-1.746 0.213-2.466 0.728l-0.232 0.162c-0.827 0.572-2.076 1.435-2.076 3.265 0 2.797 2.188 7.098 6.687 13.149 4.914 6.609 10.532 9.353 12.447 9.353 1.629 0 3.497-2.276 4.135-3.494 0.392-0.748 0.071-1.17-0.040-1.284-0.36-0.241-3.164-2.117-4.453-2.988-0.351-0.238-0.688-0.358-0.999-0.358-0.283 0-0.469 0.1-0.532 0.14-0.104 0.111-0.39 0.405-0.899 0.833-0.951 0.801-2.398 0.704-3.424-0.254-0.923-0.862-5.585-6.666-6.916-8.459-0.46-0.62-0.641-1.252-0.538-1.877 0.187-1.133 1.245-1.866 1.813-2.26l0.142-0.099c0.508-0.363 0.4-1.020 0.316-1.242-0.157-0.414-1.973-4.322-2.203-4.781-0.188-0.376-0.336-0.533-0.764-0.533z" />
                      </svg>
                    </span>
                    <p>
                      <strong>Have any question?</strong>
                      +91 12345 67890
                    </p>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@librishhotel.com">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="18"
                        viewBox="0 0 27 18"
                        fill="none"
                      >
                        <path
                          d="M25.572 0H0V17.06H26.656V0H25.572ZM24.505 1.066L14.207 11.364C13.737 11.834 12.918 11.834 12.448 11.364L2.148 1.066H24.505ZM1.066 1.491L7.989 8.413L1.066 15.336V1.49V1.491ZM1.917 15.994L8.744 9.168L11.695 12.118C12.131 12.554 12.711 12.795 13.328 12.795C13.945 12.795 14.525 12.554 14.961 12.118L17.912 9.167L24.738 15.993H1.916L1.917 15.994ZM25.59 15.337L18.667 8.413L25.59 1.489V15.337Z"
                          fill="#F7C868"
                        />
                      </svg>
                    </span>
                    <p>
                      <strong>Write email</strong>
                      info@librishhotel.com
                    </p>
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.app.goo.gl/5RLX7PfWB3vsPPzo6"
                    target="_blank"
                  >
                    <span>
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#f7c868"
                      >
                        <path d="M16.001 1.072c5.291 0 9.596 4.305 9.596 9.597 0 1.683-0.446 3.341-1.29 4.799l-8.307 14.394-8.308-14.395c-0.843-1.456-1.289-3.115-1.289-4.798 0-5.292 4.305-9.597 9.597-9.597zM16.001 14.4c2.058 0 3.731-1.674 3.731-3.731s-1.674-3.731-3.731-3.731c-2.058 0-3.732 1.674-3.732 3.731s1.674 3.731 3.732 3.731zM16.001 0.006c-5.889 0-10.663 4.775-10.663 10.663 0 1.945 0.523 3.762 1.432 5.332l9.23 15.994 9.23-15.994c0.909-1.57 1.432-3.387 1.432-5.332 0-5.888-4.774-10.663-10.662-10.663v0zM16.001 13.334c-1.472 0-2.666-1.193-2.666-2.665 0-1.471 1.194-2.665 2.666-2.665s2.665 1.194 2.665 2.665c0 1.472-1.193 2.665-2.665 2.665v0z" />
                      </svg>
                    </span>
                    <p>
                      <strong>Visit anytime</strong>
                      2nd floor, Deepkamal Mall, Sarthana Jakat Naka, Nature Park
                      and Zoo, Nana Varachha, Surat, Gujarat 395006
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="map_contact">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1450.3417582275445!2d72.896996!3d21.2289395!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04feaa65d7c47%3A0x7235434b7af96296!2sHotel%20The%20Librish!5e1!3m2!1sen!2sin!4v1767332656156!5m2!1sen!2sin"
          width="100%"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  );
}
