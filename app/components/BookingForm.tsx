"use client";
import { useState } from "react";

export type BookingFormData = {
    checkIn: string;
    checkOut: string;
    room: string;
    guests: number;
};

type Props = {
    onSubmitSuccess?: (data: BookingFormData) => void;
};

export default function BookingForm({ onSubmitSuccess }: Props) {
    const [form, setForm] = useState<BookingFormData>({
        checkIn: "",
        checkOut: "",
        room: "suite",
        guests: 1,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "guests" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("/api/check-availability", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (onSubmitSuccess) {
            onSubmitSuccess(form);
        }

        alert(data.message);
    };

    return (
        <div className="booking_form spacing_btw">
        <div className="page_wrapper">
        <form onSubmit={handleSubmit} className="booking-form">
            <div className="input_field">
                <label>Check In</label>
                <input type="date" name="checkIn" onChange={handleChange} required />
            </div>

            <div className="input_field">
                <label>Check Out</label>
                <input type="date" name="checkOut" onChange={handleChange} required />
            </div>

            <div className="input_field">
                <label>Room Type</label>
                <select name="room" onChange={handleChange}>
                    <option value="suite">Suite</option>
                    <option value="classic">Classic Room</option>
                    <option value="deluxe">Deluxe Room</option>
                </select>
            </div>

            <div className="input_field">
                <label>Number of Guests</label>
                 <select name="guests" onChange={handleChange}>
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                </select>
            </div>
            <button type="submit">Confirm Booking</button>
        </form>
        </div>
        </div>
    );
}
