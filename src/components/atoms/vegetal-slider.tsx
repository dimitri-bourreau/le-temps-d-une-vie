'use client';

import { useState } from 'react';

interface VegetalSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const VegetalSlider = ({
  min,
  max,
  value,
  onChange,
  disabled = false,
}: VegetalSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full py-6">
      <svg
        viewBox="0 0 400 40"
        className="h-10 w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M 10 20 Q 50 18, 100 20 T 200 20 T 300 20 T 390 20"
          stroke="#8B7355"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className="opacity-60"
        />
        <path
          d="M 10 20 Q 50 18, 100 20 T 200 20 T 300 20 T 390 20"
          stroke="#6B8E5A"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${percentage * 3.8} 380`}
          className="transition-all duration-150"
        />
        {[0, 25, 50, 75, 100].map((tick) => {
          const tickX = 10 + tick * 3.8;
          return (
            <g key={tick}>
              <line
                x1={tickX}
                y1="28"
                x2={tickX}
                y2="34"
                stroke="#8B7355"
                strokeWidth="2"
                opacity="0.4"
              />
            </g>
          );
        })}
      </svg>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(parseInt(event.target.value, 10))}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        disabled={disabled}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        aria-label="Sélectionner un âge"
      />

      <div
        className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150"
        style={{ left: `${percentage}%` }}
      >
        <svg
          viewBox="0 0 24 32"
          className={`h-8 w-6 drop-shadow-md transition-transform ${isDragging ? 'scale-125' : ''}`}
        >
          <path
            d="M12 2 C6 2, 2 8, 2 14 C2 20, 6 26, 12 30 C18 26, 22 20, 22 14 C22 8, 18 2, 12 2 Z"
            fill="#7CB668"
            stroke="#5A8F4A"
            strokeWidth="1"
          />
          <path
            d="M12 6 L12 24"
            stroke="#5A8F4A"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <path
            d="M12 10 Q8 12, 7 16"
            stroke="#5A8F4A"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M12 14 Q16 16, 17 20"
            stroke="#5A8F4A"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
};
