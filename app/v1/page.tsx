"use client";

import React, { useState, useEffect } from "react";

// Define an interface for the Expense object to provide type safety
interface Expense {
  id: number;
  name: string;
  planned: number;
  actual: number;
}

// Main App component
const App: React.FC = () => {
  // State variables for monthly income, expenses, and commentary
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, name: "Groceries", planned: 300, actual: 250 },
    { id: 2, name: "Rent", planned: 1000, actual: 1000 },
    { id: 3, name: "Entertainment", planned: 150, actual: 200 },
  ]);
  const [commentary, setCommentary] = useState<string>(
    "Enter your financial details to see your budget summary."
  );
  // Theme state removed as per request, dark mode will be controlled by parent class

  // State variables for budget summary displays (string format for display)
  const [totalIncomeDisplay, setTotalIncomeDisplay] = useState<string>("$0.00");
  const [totalPlannedDisplay, setTotalPlannedDisplay] =
    useState<string>("$0.00");
  const [totalActualDisplay, setTotalActualDisplay] = useState<string>("$0.00");
  const [remainingBudgetDisplay, setRemainingBudgetDisplay] =
    useState<string>("$0.00");
  const [remainingBudgetClass, setRemainingBudgetClass] =
    useState<string>("text-blue-600");

  // Effect hook to recalculate budget whenever income or expenses change
  useEffect(() => {
    calculateBudget();
  }, [monthlyIncome, expenses]);

  // Function to calculate and update budget display
  const calculateBudget = (): void => {
    let totalPlanned: number = 0;
    let totalActual: number = 0;

    expenses.forEach((expense: Expense) => {
      totalPlanned += parseFloat(String(expense.planned)) || 0;
      totalActual += parseFloat(String(expense.actual)) || 0;
    });

    const remainingBudget: number = monthlyIncome - totalActual;

    setTotalIncomeDisplay(`$${monthlyIncome.toFixed(2)}`);
    setTotalPlannedDisplay(`$${totalPlanned.toFixed(2)}`);
    setTotalActualDisplay(`$${totalActual.toFixed(2)}`);
    setRemainingBudgetDisplay(`$${remainingBudget.toFixed(2)}`);

    // Update color based on remaining budget
    if (remainingBudget >= 0) {
      setRemainingBudgetClass("text-green-600");
    } else {
      setRemainingBudgetClass("text-red-600");
    }

    updateCommentary(remainingBudget, monthlyIncome, totalPlanned, totalActual);
  };

  // Function to update the commentary
  const updateCommentary = (
    remaining: number,
    income: number,
    planned: number,
    actual: number
  ): void => {
    let message: string = "";
    if (
      income === 0 &&
      actual === 0 &&
      planned === 0 &&
      expenses.length === 0
    ) {
      message =
        "Start by entering your monthly income and adding expense categories.";
    } else if (remaining >= 0) {
      message = "Your budget is looking healthy! Keep up the good work.";
    } else {
      message =
        "You are currently over budget. Consider adjusting your expenses.";
    }
    setCommentary(message);
  };

  // Handler for income input change
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMonthlyIncome(parseFloat(e.target.value) || 0);
  };

  // Handler for expense input changes (category name, planned, actual)
  const handleExpenseChange = (
    id: number,
    field: keyof Expense,
    value: string | number
  ): void => {
    setExpenses(
      (prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === id ? { ...expense, [field]: value } : expense
        ) as Expense[]
    );
  };

  // Function to add a new expense category
  const addCategory = (): void => {
    setExpenses((prevExpenses) => {
      const newId =
        prevExpenses.length > 0
          ? Math.max(...prevExpenses.map((e) => e.id)) + 1
          : 1;
      return [...prevExpenses, { id: newId, name: "", planned: 0, actual: 0 }];
    });
  };

  // Function to remove an expense category
  const removeCategory = (id: number): void => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 font-sans">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-5xl w-full flex flex-col lg:flex-row gap-8 transform transition-all duration-300">
        {/* Left Panel: Budget Input & Categories */}
        <div className="flex-1 space-y-7">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-6 leading-tight">
            Monthly Budget Tracker
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-300 text-center mb-8">
            Effortlessly track your income and expenses to take control of your
            financial journey.
          </p>

          {/* Monthly Income Input */}
          <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-xl shadow-lg text-white transform transition-all duration-300 hover:scale-[1.01] dark:from-green-700 dark:to-teal-800">
            <label
              htmlFor="monthlyIncome"
              className="block text-lg font-semibold mb-3"
            >
              Your Monthly Income:
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-white text-lg">$</span>
              </div>
              <input
                type="number"
                id="monthlyIncome"
                name="monthlyIncome"
                className="block w-full pl-10 pr-12 py-3 border-0 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-200 focus:ring-2 focus:ring-white focus:outline-none text-lg transition-colors duration-200 dark:bg-gray-700 dark:bg-opacity-50 dark:placeholder-gray-300"
                placeholder="5000"
                min="0"
                value={monthlyIncome}
                onChange={handleIncomeChange}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-gray-200 text-lg dark:text-gray-400">
                  USD
                </span>
              </div>
            </div>
          </div>

          {/* Expense Categories */}
          <div className="bg-white p-7 rounded-xl shadow-lg space-y-5 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Expense Categories
            </h2>
            <div id="expenseCategories" className="space-y-4">
              {expenses.map((expense: Expense) => (
                <div
                  key={expense.id}
                  className="expense-row grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-5 rounded-lg shadow-sm items-center border border-gray-100 transition-all duration-200 hover:shadow-md dark:bg-gray-700 dark:border-gray-600 dark:hover:shadow-lg"
                >
                  <div className="col-span-full md:col-span-1">
                    <label
                      htmlFor={`category-${expense.id}`}
                      className="block text-xs font-medium text-gray-500 mb-1 dark:text-gray-300"
                    >
                      Category Name
                    </label>
                    <input
                      type="text"
                      id={`category-${expense.id}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base outline-none transition-all duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      placeholder="Rent"
                      value={expense.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleExpenseChange(expense.id, "name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`planned-${expense.id}`}
                      className="block text-xs font-medium text-gray-500 mb-1 dark:text-gray-300"
                    >
                      Planned ($)
                    </label>
                    <input
                      type="number"
                      id={`planned-${expense.id}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base outline-none transition-all duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      placeholder="500"
                      min="0"
                      value={expense.planned}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleExpenseChange(
                          expense.id,
                          "planned",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`actual-${expense.id}`}
                      className="block text-xs font-medium text-gray-500 mb-1 dark:text-gray-300"
                    >
                      Actual ($)
                    </label>
                    <input
                      type="number"
                      id={`actual-${expense.id}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base outline-none transition-all duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      placeholder="480"
                      min="0"
                      value={expense.actual}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleExpenseChange(
                          expense.id,
                          "actual",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div className="col-span-full md:col-span-1 flex items-center justify-end">
                    <button
                      className="remove-category-btn text-red-500 hover:text-red-700 font-bold p-2 rounded-full transition duration-150 ease-in-out transform hover:scale-110"
                      onClick={() => removeCategory(expense.id)}
                      aria-label="Remove category"
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
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              id="addCategoryBtn"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:bg-indigo-700 dark:hover:bg-indigo-800"
              onClick={addCategory}
            >
              Add New Category +
            </button>
          </div>
        </div>

        {/* Right Panel: Budget Summary & Commentary */}
        <div className="flex-1 space-y-7">
          <div className="bg-purple-100 p-7 rounded-xl shadow-lg border border-purple-200 transform transition-all duration-300 hover:scale-[1.01] dark:bg-purple-900 dark:border-purple-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">
              Budget Summary
            </h2>
            <div className="space-y-4">
              <p className="flex justify-between items-center text-lg text-gray-700 dark:text-gray-300">
                Total Income:{" "}
                <span
                  id="totalIncomeDisplay"
                  className="font-bold text-green-700 text-xl dark:text-green-400"
                >
                  {totalIncomeDisplay}
                </span>
              </p>
              <p className="flex justify-between items-center text-lg text-gray-700 dark:text-gray-300">
                Total Planned Expenses:{" "}
                <span
                  id="totalPlannedDisplay"
                  className="font-bold text-red-700 text-xl dark:text-red-400"
                >
                  {totalPlannedDisplay}
                </span>
              </p>
              <p className="flex justify-between items-center text-lg text-gray-700 dark:text-gray-300">
                Total Actual Expenses:{" "}
                <span
                  id="totalActualDisplay"
                  className="font-bold text-red-700 text-xl dark:text-red-400"
                >
                  {totalActualDisplay}
                </span>
              </p>
              <div className="border-t border-gray-300 pt-4 mt-4 dark:border-gray-600">
                <p className="flex justify-between items-center text-xl font-extrabold text-gray-900 dark:text-white">
                  Remaining Budget:{" "}
                  <span
                    id="remainingBudgetDisplay"
                    className={`${remainingBudgetClass} transition-colors duration-300 text-2xl`}
                  >
                    {remainingBudgetDisplay}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Commentary Section */}
          <div
            id="commentaryBox"
            className="bg-yellow-50 p-7 rounded-xl shadow-lg text-center border-l-6 border-yellow-500 transform transition-all duration-300 hover:shadow-xl dark:bg-yellow-900 dark:border-yellow-700"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Budget Insights
            </h2>
            <p
              id="commentary"
              className="text-lg text-gray-700 italic leading-relaxed dark:text-gray-300"
            >
              {commentary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
import React from "react";
, useEffect, useState