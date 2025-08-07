'use client';

import React from 'react';

// ✅ 1. 타입 정의
interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

interface HeroSectionProps {
  slides: Slide[];
}

// ✅ 2. 컴포넌트 정의
export default function HeroSection({ slides }: HeroSectionProps) {
  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {slides.map((slide: Slide, index: number) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30" />
            <div className="relative h-full flex items-center justify-center text-center text-white">
              <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-5xl font-bold mb-6">{slide.title}</h2>
                <p className="text-xl opacity-90">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
