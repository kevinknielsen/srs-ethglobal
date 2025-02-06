import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // ✅ Set the countdown target date to March 20, 2025
    const targetDate = new Date('2025-03-20T00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // ✅ If the timer reaches zero, stop the countdown
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
      <div className="bg-[#0D1021] rounded-xl p-3 border border-white/5">
        <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.days)}</div>
        <div className="text-xs text-white/40 uppercase">Days</div>
      </div>
      <div className="bg-[#0D1021] rounded-xl p-3 border border-white/5">
        <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.hours)}</div>
        <div className="text-xs text-white/40 uppercase">Hours</div>
      </div>
      <div className="bg-[#0D1021] rounded-xl p-3 border border-white/5">
        <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.minutes)}</div>
        <div className="text-xs text-white/40 uppercase">Minutes</div>
      </div>
      <div className="bg-[#0D1021] rounded-xl p-3 border border-white/5">
        <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.seconds)}</div>
        <div className="text-xs text-white/40 uppercase">Seconds</div>
      </div>
    </div>
  );
};

export default Timer;