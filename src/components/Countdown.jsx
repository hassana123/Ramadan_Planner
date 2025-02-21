import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CountdownToRamadan = () => {
  const calculateTimeLeft = () => {
    const ramadanStart = new Date("2025-03-01T00:00:00"); // Ramadan Start Date
    const now = new Date();
    const difference = ramadanStart - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 text-center bg-white/90 rounded-2xl shadow-lg p-2"
    >
      <h2 className="text-2xl font-bold text-secondary-800 mb-4">
        Ramadan 2025 Countdown
      </h2>
      <p className="text-lg text-secondary-600 mb-4">
        The blessed month of Ramadan will begin on <b>March 1st, 2025</b>. 🌙
        <br />
        Prepare yourself for this special time of worship and reflection.
      </p>

      {/* Countdown Timer */}
      <div className="text-xl font-semibold  flex justify-center gap-2 lg:gap-4">
        <div className="p-3 bg-primary-900 text-white rounded-xl">
          <span>{timeLeft.days}</span> <br /> Days
        </div>
        <div className="p-3 bg-primary-900 text-white rounded-xl">
          <span>{timeLeft.hours}</span> <br /> Hours
        </div>
        <div className="p-3 bg-primary-900 text-white rounded-xl">
          <span>{timeLeft.minutes}</span> <br /> Minutes
        </div>
        <div className="p-3 bg-primary-900 text-white rounded-xl">
          <span>{timeLeft.seconds}</span> <br /> Seconds
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownToRamadan;
