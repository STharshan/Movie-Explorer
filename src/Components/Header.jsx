import React from "react";
import { Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="container mx-auto px-4 py-5 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold uppercase">IJM</Link>
      <nav className="hidden md:flex gap-6 uppercase">
        {["Home", "About Us", "Training Academy", "Beauty Treatments", "Contact"].map((label) => (
          <Link key={label} to={label.toLowerCase().replace(/ /g, "-")} className="hover:text-opacity-80">
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex gap-4">
        <a href="#" aria-label="Instagram"><Instagram /></a>
        <a href="#" aria-label="Facebook"><Facebook /></a>
      </div>
    </header>
  );
}
