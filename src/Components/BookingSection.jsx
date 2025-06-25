import React from "react";

export default function BookingSection() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-medium">Book A Course or Treatment</h2>
        <a href="https://bookings.gettimely.com/ijmbeautyaestheticstrainingacademyltd/book"
           target="_blank" rel="noopener noreferrer"
           className="mt-4 inline-block px-6 py-3 bg-brand text-white rounded">
          Book Now
        </a>
      </div>
    </section>
  );
}
