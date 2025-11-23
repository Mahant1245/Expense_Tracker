// src/components/ThemeManager.js
import React, { useEffect } from "react";

function setBodyTheme(name) {
  document.body.classList.remove("theme-sunny", "theme-cloudy", "theme-stormy");
  if (name) document.body.classList.add(name);
}

export default function ThemeManager() {
  useEffect(() => {
    const recomputeAndApply = () => {
      const budget = Number(localStorage.getItem("budget")) || 0;
      // use window.__latestTransactions if available
      let total = 0;
      try {
        const raw = window.__latestTransactions || [];
        total = raw.reduce((s, v) => s + (Number(v.amount) || 0), 0);
      } catch (e) {
        total = 0;
      }

      let theme = "theme-sunny";
      if (budget > 0) {
        const r = total / budget;
        if (r < 0.8) theme = "theme-sunny";
        else if (r <= 1) theme = "theme-cloudy";
        else theme = "theme-stormy";
      }
      setBodyTheme(theme);
    };

    // initial apply
    recomputeAndApply();

    // listen for the events
    const onBudget = () => recomputeAndApply();
    const onTx = () => recomputeAndApply();

    window.addEventListener("budgetSet", onBudget);
    window.addEventListener("transactionAdded", onTx);

    return () => {
      window.removeEventListener("budgetSet", onBudget);
      window.removeEventListener("transactionAdded", onTx);
    };
  }, []);

  return null; // invisible manager
}
