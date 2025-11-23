import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import sunImg from "../assets/sun.jpg";
import cloudImg from "../assets/cloudy.jpg";
import stormImg from "../assets/thunderstorm.jpg";


const images = {
  sunny: sunImg,
  cloudy: cloudImg,
  stormy: stormImg,
};

export default function WeatherVisual({ status = "sunny" }) {
  const motionProps = {
    sunny: { animate: { y: [0, -12, 0] }, transition: { repeat: Infinity, duration: 5 } },
    cloudy: { animate: { x: [0, 20, -20, 0] }, transition: { repeat: Infinity, duration: 10 } },
    stormy: { animate: { rotate: [0, 2, -2, 0] }, transition: { repeat: Infinity, duration: 0.8 } },
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={status}
          src={images[status]}
          alt={status}
          className="w-40 h-40 opacity-95 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.9 }}
        />
      </AnimatePresence>

      <motion.div className="absolute z-10" {...motionProps[status]}>
        <img src={images[status]} alt="" className="w-28 h-28 opacity-70" />
      </motion.div>

      {status === "stormy" && (
        <motion.div
          className="absolute inset-0 bg-white z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.08, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.05, 1] }}
        />
      )}
    </div>
  );
}
