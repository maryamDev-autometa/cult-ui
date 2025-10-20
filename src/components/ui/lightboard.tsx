import React, { useEffect, useRef } from 'react';

interface LightboardProps {
  text: string;
  className?: string;
  color?: string;
  speed?: number;
  dotSize?: number;
  dotGap?: number;
}

export const Lightboard: React.FC<LightboardProps> = ({
  text,
  className = '',
  color = '#00ff00',
  speed = 2,
  dotSize = 4,
  dotGap = 6
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const height = 80;
    canvas.height = height;
    canvas.width = canvas.offsetWidth;

    let offset = canvas.width;
    const fontSize = 60;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background - check if dark mode is active
      const isDarkMode = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDarkMode ? '#030712' : '#000000'; // gray-950 for dark mode, black for light
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Measure text width
      ctx.font = `bold ${fontSize}px monospace`;
      const textWidth = ctx.measureText(text).width;

      // Draw LED dots for text
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.fillStyle = color;

      // Create LED dot effect
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Draw text off-screen to sample pixels
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      tempCanvas.width = canvas.width * 2;
      tempCanvas.height = canvas.height;
      tempCtx.font = `bold ${fontSize}px monospace`;
      tempCtx.fillStyle = '#ffffff';
      tempCtx.fillText(text, offset, fontSize);

      const tempImageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

      // Draw LED dots
      for (let y = 0; y < canvas.height; y += dotGap) {
        for (let x = 0; x < canvas.width; x += dotGap) {
          const index = (y * tempCanvas.width + x) * 4;
          const alpha = tempImageData.data[index + 3];

          if (alpha > 128) {
            // Draw LED dot
            ctx.beginPath();
            ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();

            // Add glow effect
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, dotSize);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
          }
        }
      }

      // Update position for marquee effect
      offset -= speed;
      if (offset < -textWidth) {
        offset = canvas.width;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [text, color, speed, dotSize, dotGap]);

  return (
    <div className={`relative overflow-hidden bg-black dark:bg-gray-950 rounded-lg transition-colors duration-300 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

export default Lightboard;
