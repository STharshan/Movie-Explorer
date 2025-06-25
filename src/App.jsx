import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Gallery from "./Components/Gallery";
import BookingSection from "./Components/BookingSection";
import Footer from "./Components/Footer";
// import pages...

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<><Hero /><BookingSection /><Gallery /></>} />
        {/* Add <About />, <Training />, etc. */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
