"use client";

import React, { useState } from "react";

// --- Type Definitions ---
interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD format
  description: string;
  amount: number; // Negative for expenses, positive for income
}

interface MonthlySummary {
  income: number;
  totalSpent: number;
  remainingBudget: number;
}

// --- Helper Functions ---
const getDaysInMonth = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const getDailySpending = (
  transactions: Transaction[],
  date: string
): number => {
  return transactions
    .filter((tx) => tx.date === date && tx.amount < 0) // Only expenses for the given date
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
};

// Main App component
const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 5, 24)); // Set to June 24, 2025 for consistent mock data
  const [selectedDay, setSelectedDay] = useState<string>("2025-06-24"); // Currently selected day for transaction details

  // Mock Data
  const monthlyIncome: number = 4500.0;
  const allTransactions: Transaction[] = [
    { id: "t1", date: "2025-06-24", description: "Coffee", amount: -4.5 },
    { id: "t2", date: "2025-06-24", description: "Lunch", amount: -12.75 },
    { id: "t3", date: "2025-06-23", description: "Groceries", amount: -65.3 },
    { id: "t4", date: "2025-06-23", description: "Bus Fare", amount: -2.5 },
    { id: "t5", date: "2025-06-22", description: "Dinner Out", amount: -35.0 },
    {
      id: "t6",
      date: "2025-06-22",
      description: "Movie Ticket",
      amount: -15.0,
    },
    {
      id: "t7",
      date: "2025-06-21",
      description: "Rent Payment",
      amount: -1200.0,
    },
    { id: "t8", date: "2025-06-20", description: "Salary", amount: 2250.0 },
    {
      id: "t9",
      date: "2025-06-19",
      description: "Online Shopping",
      amount: -89.99,
    },
    {
      id: "t10",
      date: "2025-06-18",
      description: "Utilities Bill",
      amount: -80.0,
    },
    { id: "t11", date: "2025-06-24", description: "Parking", amount: -5.0 },
    {
      id: "t12",
      date: "2025-06-24",
      description: "Book Purchase",
      amount: -20.0,
    },
  ];

  // Filter transactions for the current month displayed in the calendar
  const currentMonthTransactions = allTransactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      txDate.getFullYear() === currentDate.getFullYear() &&
      txDate.getMonth() === currentDate.getMonth()
    );
  });

  // Calculate monthly summary
  const totalMonthlySpent = currentMonthTransactions
    .filter((tx) => tx.amount < 0)
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const monthlySummary: MonthlySummary = {
    income: monthlyIncome,
    totalSpent: totalMonthlySpent,
    remainingBudget: monthlyIncome - totalMonthlySpent,
  };

  // Get transactions for the selected day
  const transactionsForSelectedDay = allTransactions.filter(
    (tx) => tx.date === selectedDay
  );

  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay(); // 0 for Sunday, 1 for Monday etc.

  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const formattedMonthYear = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4 font-sans flex justify-center items-start">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 my-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 leading-tight">
          Daily Spending Tracker
        </h1>

        {/* Monthly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Monthly Income</h2>
            <p className="text-4xl font-bold">
              $
              {monthlySummary.income.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Total Spent (Month)</h2>
            <p className="text-4xl font-bold">
              $
              {monthlySummary.totalSpent.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div
            className={`p-6 rounded-xl shadow-lg ${
              monthlySummary.remainingBudget >= 0
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gradient-to-r from-orange-500 to-orange-600"
            } text-white`}
          >
            <h2 className="text-xl font-semibold mb-2">Remaining Budget</h2>
            <p className="text-4xl font-bold">
              $
              {monthlySummary.remainingBudget.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar View */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-full bg-blue-200 text-blue-800 hover:bg-blue-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                {formattedMonthYear}
              </h2>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-full bg-blue-200 text-blue-800 hover:bg-blue-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-medium text-gray-600 mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {/* Render empty cells for days before the 1st */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="p-2"></div>
              ))}
              {/* Render actual days */}
              {daysInMonth.map((day) => {
                const dayString = day.toISOString().split("T")[0];
                const dailySpent = getDailySpending(
                  currentMonthTransactions,
                  dayString
                );
                const isToday =
                  dayString === new Date().toISOString().split("T")[0]; // Check if it's the actual current date
                const isSelected = dayString === selectedDay;

                return (
                  <div
                    key={dayString}
                    className={`p-2 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-colors duration-200
                      ${
                        isSelected
                          ? "bg-blue-500 text-white shadow-lg"
                          : isToday
                          ? "bg-blue-100 text-blue-800 font-semibold"
                          : "bg-white text-gray-900 hover:bg-gray-100"
                      }
                      ${
                        dailySpent > 0 && !isSelected
                          ? "border border-red-300"
                          : ""
                      }
                    `}
                    onClick={() => setSelectedDay(dayString)}
                  >
                    <span
                      className={`text-lg ${
                        isSelected ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {day.getDate()}
                    </span>
                    {dailySpent > 0 && (
                      <span
                        className={`text-xs font-semibold ${
                          isSelected ? "text-blue-100" : "text-red-600"
                        }`}
                      >
                        -${dailySpent.toFixed(2)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Transactions List */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
              Transactions for{" "}
              {new Date(selectedDay).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h2>
            {transactionsForSelectedDay.length > 0 ? (
              <div className="space-y-3">
                {transactionsForSelectedDay.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {tx.description}
                      </p>
                      <p className="text-sm text-gray-500">{tx.date}</p>
                    </div>
                    <p
                      className={`font-bold text-lg ${
                        tx.amount < 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {tx.amount < 0 ? "-" : "+"}$
                      {Math.abs(tx.amount).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-lg mt-10">
                No transactions recorded for this day.
              </p>
            )}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-colors">
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
