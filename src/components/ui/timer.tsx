import React, { useState, useEffect } from 'react';

interface TimerProps {
  endDate: Date;
  className?: string;
  onExpire?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Timer: React.FC<TimerProps> = ({ endDate, className = '', onExpire }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +endDate - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        if (onExpire) onExpire();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onExpire]);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="bg-black dark:bg-white text-white dark:text-black rounded-lg p-4 min-w-[80px] text-center shadow-lg transition-colors">
          <span className="text-4xl font-bold font-display tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-white/20 to-transparent rounded-lg pointer-events-none"></div>
      </div>
      <span className="text-xs font-sans tracking-wider uppercase mt-2 text-gray-600 dark:text-gray-400">
        {label}
      </span>
    </div>
  );

  return (
    <div className={`flex gap-3 ${className}`}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="flex items-center pb-6 text-2xl font-bold text-black dark:text-white">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="flex items-center pb-6 text-2xl font-bold text-black dark:text-white">:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <div className="flex items-center pb-6 text-2xl font-bold text-black dark:text-white">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Timer;
