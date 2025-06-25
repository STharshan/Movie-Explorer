import React from "react";

export default function Hero() {
  return (
    <section className="relative text-center py-20 overflow-hidden bg-gradient-to-b from-brand-bg-start to-brand-bg-end">
      <div className="absolute inset-0 flex justify-start items-center opacity-20">
        <img src="/img/hero-decor.svg" alt="" className="w-96 h-96" />
      </div>
      <div className="relative z-10">
        <h1 className="text-5xl font-medium uppercase">IJM Beauty & Aesthetics Training Academy Ltd</h1>
        <p className="mt-4 text-xl font-light">Nottingham • Advanced Aesthetics • Beauty Treatments • ABT Accredited</p>
      </div>
    </section>
  );
}
