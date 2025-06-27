import React from "react";

const HowMuch = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg p-8 text-gray-700">
        <label htmlFor="goal" className="block mb-3">
          <span className="text-gray-700 font-bold">Goal</span>
          <input
            type="number"
            name="goal"
            id="goal"
            className="mt-1 block form-input w-full"
          />
        </label>
        <label htmlFor="date" className="block mb-3">
          <span className="text-gray-700 font-bold">Date</span>
          <input
            type="date"
            name="date"
            id="date"
            className="mt-1 block form-input w-full"
          />
        </label>
      </div>
    </div>
  );
};

export default HowMuch;
