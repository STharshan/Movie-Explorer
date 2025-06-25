import React from "react";

 const galleryImages = [
    { src: "/image.png?width=300&height=400", alt: "Two women in a beauty salon" },
    { src: "/image1.png?width=300&height=400", alt: "Manicured nails with gold tips" },
    { src: "/image2.png?width=300&height=400", alt: "Close-up of eyelash extensions" },
    { src: "/image3.png?width=300&height=400", alt: "Before and after of lip filler treatment" },
  ];

export default function Gallery() {
  return (
    <section className="py-16">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {galleryImages.map((img, i) => (
          <img key={i} src={img.src} alt={img.alt} className="object-cover w-full h-full rounded-lg shadow-lg" loading="lazy" />
        ))}
      </div>
    </section>
  );
}
