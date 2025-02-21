import { motion } from "framer-motion";
import { MoonIcon, StarIcon } from "@heroicons/react/24/solid";
import { FaMosque, FaStarAndCrescent } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import { IoFlashlightOutline } from "react-icons/io5";

function Header({ currentDay, hasStarted }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center text-white relative max-w-screen-lg mx-auto px-4"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-10" />

      {/* Animated Icons */}
      <div className="relative">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-[15%] -top-8 sm:-top-12 sm:left-1/4"
        >
          <MoonIcon className="w-12 sm:w-16 h-12 sm:h-16 text-yellow-300 opacity-40" />
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mb-8">
          {/* Left Floating Lantern */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="lantern-glow"
          >
            <IoFlashlightOutline className="text-yellow-400 w-10 sm:w-12 h-10 sm:h-12" />
          </motion.div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
            Ramadan
            <span className="block text-3xl sm:text-4xl mt-2 font-arabic">
              رمضان كريم
            </span>
          </h1>

          {/* Right Floating Bulb */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="lantern-glow"
          >
            <GoLightBulb className="text-yellow-400 w-10 sm:w-12 h-10 sm:h-12" />
          </motion.div>
        </div>
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg sm:text-xl text-primary-200 mb-8 font-display"
      >
        Track your daily ibadah and make the most of this blessed month
      </motion.p>

      {/* Animated Day Counter */}
      {hasStarted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="inline-block px-6 justify-center sm:px-10 py-3 sm:py-4 glass-effect rounded-full decorative-border flex items-center gap-4"
        >
          <FaMosque className="text-yellow-300 w-6 sm:w-8 h-6 sm:h-8" />
          <span className="text-2xl sm:text-3xl font-display text-primary-100">
            Day {currentDay} of Ramadan
          </span>
          <FaStarAndCrescent className="text-yellow-300 w-6 sm:w-8 h-6 sm:h-8" />
        </motion.div>
      )}

      {/* Floating Star Icons */}
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute right-2 sm:right-5 top-8 sm:top-10"
      >
        <StarIcon className="w-8 sm:w-10 h-8 sm:h-10 text-yellow-300 opacity-50" />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, -15, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        className="absolute left-2 sm:left-5 top-12 sm:top-16"
      >
        <StarIcon className="w-8 sm:w-10 h-8 sm:h-10 text-yellow-300 opacity-50" />
      </motion.div>
    </motion.div>
  );
}

export default Header;
