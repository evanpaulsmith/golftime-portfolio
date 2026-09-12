"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function BookingPage() {
  const searchParams = useSearchParams();

  const course = searchParams.get("course");
  const time = searchParams.get("time");
  const price = searchParams.get("price");
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [players, setPlayers] = useState(1);
const [bookingComplete, setBookingComplete] = useState(false);


  useEffect(() => {
    if (course && time && price) {
      trackEvent("BOOKING_STARTED", {
        course: course,
        time: time,
        price: Number(price),
      });
    }
  }, [course, time, price]);

  function handleBookingSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    trackEvent("BOOKING_COMPLETED", {
      course: course,
      time: time,
      price: Number(price),
      name: name,
      email: email,
      players: players,
      totalPrice: Number(price) * players,
    });
  
    setBookingComplete(true);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Complete Booking</h1>

      <div className="mt-6 border p-4">
        <p>
          <strong>Course:</strong> {course}
        </p>

        <p>
          <strong>Tee Time:</strong> {time}
        </p>

        <p>
          <strong>Price:</strong> ${price} per player
        </p>
      </div>

      {!bookingComplete ? (
        <form onSubmit={handleBookingSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold">
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 border p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 border p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="players" className="block font-semibold">
              Number of Players
            </label>

            <input
              id="players"
              type="number"
              min="1"
              max="4"
              value={players}
              onChange={(event) => setPlayers(Number(event.target.value))}
              className="mt-2 border p-2"
            />
          </div>

          <button type="submit" className="border px-4 py-2">
            Complete Booking
          </button>
        </form>
      ) : (
        <div className="mt-6 border p-4">
          <h2 className="text-xl font-bold">Booking Complete</h2>
          <p className="mt-2">
            Your booking has been recorded for this demo.
          </p>
        </div>
      )}

      <div className="mt-6">
        <a className="underline" href="/search">
          Back to search
        </a>
      </div>
    </main>
  );
}