import React from 'react';

interface LogoCarouselProps {
  logos: string[];
  className?: string;
  speed?: number;
}

export const LogoCarousel: React.FC<LogoCarouselProps> = ({
  logos,
  className = '',
  speed = 20
}) => {
  return (
    <div className={`relative overflow-hidden bg-transparent ${className}`}>
      <div
        className="flex animate-scroll"
        style={{
          animationDuration: `${speed}s`
        }}
      >
        {/* Duplicate logos for infinite scroll */}
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-8 flex items-center justify-center"
          >
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LogoCarousel;
