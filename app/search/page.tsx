"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";


export default function SearchPage() {
    const router = useRouter();
  
    const [location, setLocation] = useState("");
    const [searchedLocation, setSearchedLocation] = useState("");


  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    trackEvent("SEARCH_SUBMITTED", {
        location: location,
      });
  
      setSearchedLocation(location);
    }
  
    function handleTeeTimeSelect(
      course: string,
      time: string,
      price: number
    ) {
      trackEvent("TEE_TIME_SELECTED", {
        course: course,
        time: time,
        price: price,
      });
      router.push(
        `/booking?course=${encodeURIComponent(course)}&time=${encodeURIComponent(
          time
        )}&price=${price}`
      );
    }
  

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Search Tee Times</h1>

      <p className="mt-4">
        Enter a location to search for available tee times.
      </p>

      <form onSubmit={handleSearch} className="mt-6">
        <label htmlFor="location" className="block font-semibold">
          Location
        </label>

        <input
          id="location"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Greensboro, GA"
          className="mt-2 border p-2"
        />

        <button
          type="submit"
          className="ml-2 border px-4 py-2"
        >
          Search
        </button>
      </form>

      {searchedLocation && (
        <section className="mt-8">
          <h2 className="text-xl font-bold">
            Results for {searchedLocation}
          </h2>

          <div className="mt-4 border p-4">
            <h3 className="font-semibold">Lake Oconee Golf Club</h3>
            <p>10:30 AM</p>
            <p>$55 per player</p>

            <button
  className="mt-3 border px-4 py-2"
  onClick={() =>
    handleTeeTimeSelect(
      "Lake Oconee Golf Club",
      "10:30 AM",
      55
    )
  }
>
  Select Tee Time
</button>
          </div>

          <div className="mt-4 border p-4">
            <h3 className="font-semibold">Greensboro Country Club</h3>
            <p>11:15 AM</p>
            <p>$48 per player</p>

            <button
  className="mt-3 border px-4 py-2"
  onClick={() =>
    handleTeeTimeSelect(
      "Greensboro Country Club",
      "11:15 AM",
      48
    )
  }
>
  Select Tee Time
</button>
          </div>
        </section>
      )}

      <div className="mt-8">
        <a className="underline" href="/">
          Back to home
        </a>
      </div>
    </main>
  );
}