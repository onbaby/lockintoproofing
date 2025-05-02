'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
      {/* Before Image (Bottom Layer) */}
      <div className="absolute inset-0">
        <Image
          src="/images/bathroom-remodel-before.jpg"
          alt="Before bathroom remodel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-semibold">
          BEFORE
        </div>
      </div>

      {/* After Image (Top Layer) */}
      <div 
        className="absolute inset-0"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image
          src="/images/bathroom-remodel-after.jpg"
          alt="After bathroom remodel"
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-semibold">
          AFTER
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={(e) => {
          const startX = e.clientX;
          const startPosition = sliderPosition;
          
          const handleMouseMove = (e: MouseEvent) => {
            const container = e.currentTarget?.parentElement;
            if (!container) return;
            
            const containerRect = container.getBoundingClientRect();
            const newPosition = Math.max(
              0,
              Math.min(
                100,
                startPosition + ((e.clientX - startX) / containerRect.width) * 100
              )
            );
            setSliderPosition(newPosition);
          };

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };

          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-5 h-5 text-gray-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </div>
      </div>
    </div>
  );
} 