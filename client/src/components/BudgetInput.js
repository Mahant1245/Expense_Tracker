// src/components/BudgetInput.js
import React, { useState, useEffect } from "react";

export default function BudgetInput() {
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? Number(saved) : "";
  });

  useEffect(() => {
    if (budget === "") return;
    // keep input value synced but do not announce until user submits
  }, [budget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = Number(budget) || 0;
    localStorage.setItem("budget", num);
    // fire event to notify app to show popup and update theme
    window.dispatchEvent(new Event("budgetSet"));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 w-full max-w-sm mx-auto">
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Monthly Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Set Budget
        </button>
      </div>
    </form>
  );
}
