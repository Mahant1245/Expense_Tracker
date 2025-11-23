// src/components/WeatherPopup.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import sunImg from "../assets/sun.jpg";
import cloudImg from "../assets/cloudy.jpg";
import stormImg from "../assets/thunderstorm.jpg";

const images = {
  sunny: sunImg,
  cloudy: cloudImg,
  stormy: stormImg,
};

export default function WeatherPopup({ triggerEventNames = ["budgetSet", "transactionAdded"] }) {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("sunny");

  useEffect(() => {
    const handler = () => {
      // compute status from localStorage (same logic as Graph)
      const budget = Number(localStorage.getItem("budget")) || 0;
      // use stored current transactions result (Graph reads from RTK), but we will compute using helper if available
      let total = 0;
      try {
        const raw = window.__latestTransactions || null; // fallback - we'll set it when RTK data is available
        if (raw) {
          total = raw.reduce((s, v) => s + (Number(v.amount) || 0), 0);
        }
      } catch (e) { total = 0; }

      let newStatus = "sunny";
      if (budget > 0) {
        const ratio = total / budget;
        if (ratio < 0.8) newStatus = "sunny";
        else if (ratio <= 1) newStatus = "cloudy";
        else newStatus = "stormy";
      }

      setStatus(newStatus);
      setVisible(true);

      // auto hide after 5s
      window.setTimeout(() => setVisible(false), 5000);
    };

    triggerEventNames.forEach((ev) => window.addEventListener(ev, handler));
    return () => triggerEventNames.forEach((ev) => window.removeEventListener(ev, handler));
  }, [triggerEventNames]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* dimmed overlay */}
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none" />

      {/* popup */}
      <motion.div
        className="relative z-60 pointer-events-auto flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ width: 360, height: 360, borderRadius: 18, overflow: "hidden", background: "rgba(255,255,255,0.03)" }}
      >
        <img src={images[status]} alt={status} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center", color: "#fff", fontWeight: 700 }}>
          {status === "sunny" && "Nice — you're under budget ☀️"}
          {status === "cloudy" && "Careful — you're nearing your budget ☁️"}
          {status === "stormy" && "Alert — you've exceeded your budget ⚡"}
        </div>
      </motion.div>
    </div>
  );
}
