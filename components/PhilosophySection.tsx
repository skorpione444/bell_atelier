"use client";

import Section from "./Section";

export default function PhilosophySection() {
  return (
    <Section id="philosophy" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif uppercase text-5xl md:text-6xl lg:text-7xl text-charcoal mb-12 leading-tight">
          Philosophy
        </h2>
        <div className="space-y-6">
          <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed">
            {/* TODO: Replace with actual philosophy text */}
            At Bell Atelier, we believe in the convergence of heritage craftsmanship
            and contemporary design. Each boot is a testament to the artistry that
            defines the modern Western aesthetic—refined, intentional, and timeless.
          </p>
          <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed">
            {/* TODO: Replace with additional philosophy text */}
            Our vision extends beyond footwear. We create pieces that honor tradition
            while embracing innovation, designed for those who appreciate the subtle
            elegance of understated luxury.
          </p>
        </div>
      </div>
    </Section>
  );
}

