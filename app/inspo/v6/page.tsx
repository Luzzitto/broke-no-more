"use client"; // This directive marks the component as a Client Component

import React, { useState, useMemo, useCallback } from "react";

// Define interfaces for type safety
interface Expense {
  id: string;
  name: string;
  type: "subscription" | "one-time";
  amount: number;
  date: string; // YYYY-MM-DD
}

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
}

interface MonthlySummary {
  monthYear: string; // e.g., "July 2025"
  startingBalance: number;
  totalIncome: number;
  totalExpenses: number;
  endingBalance: number;
  incomeEvents: { date: string; amount: number; description: string }[];
  expenseEvents: { date: string; amount: number; description: string }[];
}

// Helper function to get the number of days in a month
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the day of the week for the first day of the month
const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.
};

// Function to format a Date object to YYYY-MM-DD
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Main App Component
export default function App() {
  // State for core financial data
  const [initialBalance, setInitialBalance] = useState<number>(5000);
  const [incomeAmount, setIncomeAmount] = useState<number>(2000);
  const [incomeFrequency, setIncomeFrequency] = useState<
    "weekly" | "bi-weekly" | "monthly"
  >("monthly");
  const [weeklyPayday, setWeeklyPayday] = useState<number>(5); // 0=Sunday, 5=Friday
  const [biWeeklyLastPayDate, setBiWeeklyLastPayDate] = useState<string>(
    formatDate(new Date())
  ); // YYYY-MM-DD
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  // State for expense form
  const [newExpenseName, setNewExpenseName] = useState<string>("");
  const [newExpenseType, setNewExpenseType] = useState<
    "subscription" | "one-time"
  >("one-time");
  const [newExpenseAmount, setNewExpenseAmount] = useState<number>(0);
  const [newExpenseDate, setNewExpenseDate] = useState<string>(
    formatDate(new Date())
  );

  // State for goal form
  const [newGoalName, setNewGoalName] = useState<string>("");
  const [newGoalTargetAmount, setNewGoalTargetAmount] = useState<number>(0);

  // State for calendar navigation
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  // Function to calculate all income dates within a given period
  const calculateIncomeDates = useCallback(
    (
      startPeriod: Date,
      endPeriod: Date
    ): { date: string; amount: number }[] => {
      const incomes: { date: string; amount: number }[] = [];
      const currentDate = new Date(startPeriod);

      while (currentDate <= endPeriod) {
        let incomeDate: Date | null = null;

        if (incomeFrequency === "monthly") {
          // Monthly: end of the month
          incomeDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          );
        } else if (incomeFrequency === "weekly") {
          // Weekly: specific day of the week
          const dayOfWeek = currentDate.getDay();
          const daysUntilPayday = (weeklyPayday - dayOfWeek + 7) % 7;
          incomeDate = new Date(currentDate);
          incomeDate.setDate(currentDate.getDate() + daysUntilPayday);
          // If payday is in previous week but incomeDate ends up in current week, adjust
          if (
            incomeDate.getMonth() !== currentDate.getMonth() &&
            incomeDate > endPeriod
          ) {
            // This ensures we don't add income from the next month if current month is almost over
            incomeDate = null;
          }
        } else if (incomeFrequency === "bi-weekly") {
          // Bi-weekly: based on a reference date
          const lastPayDateObj = new Date(biWeeklyLastPayDate + "T00:00:00"); // Ensure UTC for consistent calc
          const diffDays = Math.floor(
            (currentDate.getTime() - lastPayDateObj.getTime()) /
              (1000 * 60 * 60 * 24)
          );
          if (diffDays % 14 === 0 && diffDays >= 0) {
            incomeDate = new Date(currentDate);
          } else {
            // Find the next bi-weekly date from currentDate
            const daysToNextBiWeekly = 14 - (diffDays % 14);
            if (daysToNextBiWeekly <= 14) {
              // Make sure it's a valid gap
              incomeDate = new Date(currentDate);
              incomeDate.setDate(currentDate.getDate() + daysToNextBiWeekly);
            }
          }
        }

        if (
          incomeDate &&
          incomeDate >= startPeriod &&
          incomeDate <= endPeriod
        ) {
          incomes.push({ date: formatDate(incomeDate), amount: incomeAmount });
        }

        // Advance currentDate by one day for precise weekly/bi-weekly checks
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return incomes;
    },
    [incomeAmount, incomeFrequency, weeklyPayday, biWeeklyLastPayDate]
  );

  // Calculate monthly summaries for visualization
  const monthlySummaries: MonthlySummary[] = useMemo(() => {
    const summaries: MonthlySummary[] = [];
    let currentBalance = initialBalance;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const today = new Date();

    // Generate summaries for past 3 months, current month, and next 6 months
    const startMonth = new Date(currentYear, currentMonth, 1);
    startMonth.setMonth(startMonth.getMonth() - 3); // Start 3 months before current view

    for (let i = 0; i < 10; i++) {
      // Generate 10 months of summaries
      const monthDate = new Date(
        startMonth.getFullYear(),
        startMonth.getMonth() + i,
        1
      );
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      const numDays = getDaysInMonth(year, month);
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month, numDays);

      let totalIncome = 0;
      let totalExpenses = 0;
      const incomeEvents: {
        date: string;
        amount: number;
        description: string;
      }[] = [];
      const expenseEvents: {
        date: string;
        amount: number;
        description: string;
      }[] = [];

      // Calculate income for this month
      const incomesForMonth = calculateIncomeDates(startOfMonth, endOfMonth);
      incomesForMonth.forEach((inc) => {
        totalIncome += inc.amount;
        incomeEvents.push({
          date: inc.date,
          amount: inc.amount,
          description: `Income`,
        });
      });

      // Calculate expenses for this month
      expenses.forEach((exp) => {
        const expDate = new Date(exp.date + "T00:00:00"); // Parse as local date
        if (expDate >= startOfMonth && expDate <= endOfMonth) {
          totalExpenses += exp.amount;
          expenseEvents.push({
            date: exp.date,
            amount: exp.amount,
            description: exp.name,
          });
        } else if (exp.type === "subscription") {
          // If a subscription, assume it repeats monthly on the date it was set or closest valid date
          const subDay = expDate.getDate();
          const effectiveSubDate = new Date(
            year,
            month,
            Math.min(subDay, numDays)
          );
          if (
            effectiveSubDate >= startOfMonth &&
            effectiveSubDate <= endOfMonth
          ) {
            totalExpenses += exp.amount;
            expenseEvents.push({
              date: formatDate(effectiveSubDate),
              amount: exp.amount,
              description: exp.name,
            });
          }
        }
      });

      const startingBalanceForMonth = currentBalance;
      currentBalance += totalIncome - totalExpenses;

      summaries.push({
        monthYear: monthDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        startingBalance: startingBalanceForMonth,
        totalIncome,
        totalExpenses,
        endingBalance: currentBalance,
        incomeEvents,
        expenseEvents,
      });
    }

    return summaries;
  }, [
    initialBalance,
    expenses,
    calculateIncomeDates,
    currentMonth,
    currentYear,
  ]);

  // Handle adding a new expense
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpenseName && newExpenseAmount > 0 && newExpenseDate) {
      setExpenses([
        ...expenses,
        {
          id: String(Date.now()),
          name: newExpenseName,
          type: newExpenseType,
          amount: newExpenseAmount,
          date: newExpenseDate,
        },
      ]);
      setNewExpenseName("");
      setNewExpenseAmount(0);
      setNewExpenseType("one-time");
      setNewExpenseDate(formatDate(new Date()));
    }
  };

  // Handle adding a new goal
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalName && newGoalTargetAmount > 0) {
      setGoals([
        ...goals,
        {
          id: String(Date.now()),
          name: newGoalName,
          targetAmount: newGoalTargetAmount,
          savedAmount: 0, // Initially saved amount is 0
        },
      ]);
      setNewGoalName("");
      setNewGoalTargetAmount(0);
    }
  };

  // Function to save money towards a goal (simple implementation)
  const saveToGoal = (goalId: string, amount: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              savedAmount: Math.min(
                goal.targetAmount,
                goal.savedAmount + amount
              ),
            }
          : goal
      )
    );
    // Deduct from current balance if implementing a true deduction
    // setInitialBalance(prev => prev - amount);
  };

  // Calendar navigation
  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  // Render calendar days
  const renderCalendarDays = useCallback(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth); // 0 = Sunday

    const days = [];
    const today = formatDate(new Date());

    // Fill leading empty days
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(
        <div
          key={`empty-start-${i}`}
          className="p-2 border border-gray-200 rounded-md bg-gray-50"
        ></div>
      );
    }

    // Get events for the currently viewed month
    const currentMonthSummary = monthlySummaries.find(
      (s) =>
        s.monthYear ===
        new Date(currentYear, currentMonth, 1).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
    );

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(new Date(currentYear, currentMonth, day));
      const isToday = dateString === today;

      // Filter events for the current day
      const dayIncomeEvents =
        currentMonthSummary?.incomeEvents.filter(
          (e) => e.date === dateString
        ) || [];
      const dayExpenseEvents =
        currentMonthSummary?.expenseEvents.filter(
          (e) => e.date === dateString
        ) || [];

      days.push(
        <div
          key={`day-${day}`}
          className={`p-2 border border-gray-200 rounded-md flex flex-col items-start min-h-[80px] text-sm ${
            isToday ? "bg-blue-100 border-blue-500" : "bg-white"
          }`}
        >
          <span
            className={`font-bold ${
              isToday ? "text-blue-700" : "text-gray-800"
            }`}
          >
            {day}
          </span>
          {dayIncomeEvents.map((event, idx) => (
            <div
              key={`income-${event.date}-${idx}`}
              className="text-green-600 text-xs mt-1"
            >
              +${event.amount.toFixed(2)} (Income)
            </div>
          ))}
          {dayExpenseEvents.map((event, idx) => (
            <div
              key={`expense-${event.date}-${idx}`}
              className="text-red-600 text-xs mt-1"
            >
              -${event.amount.toFixed(2)} ({event.description})
            </div>
          ))}
        </div>
      );
    }

    return days;
  }, [currentMonth, currentYear, monthlySummaries]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-inter text-gray-900">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-700">
          Budgeting Dashboard
        </h1>

        {/* Current Balance & Income Setup */}
        <section className="mb-12 p-6 bg-indigo-50 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Financial Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="initialBalance"
                className="block text-sm font-medium text-gray-700"
              >
                Initial Bank Balance
              </label>
              <input
                type="number"
                id="initialBalance"
                value={initialBalance}
                onChange={(e) => setInitialBalance(parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                min="0"
              />
            </div>
            <div>
              <label
                htmlFor="incomeAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Income Amount
              </label>
              <input
                type="number"
                id="incomeAmount"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                min="0"
              />
            </div>
            <div>
              <label
                htmlFor="incomeFrequency"
                className="block text-sm font-medium text-gray-700"
              >
                Income Frequency
              </label>
              <select
                id="incomeFrequency"
                value={incomeFrequency}
                onChange={(e) =>
                  setIncomeFrequency(e.target.value as typeof incomeFrequency)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              >
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly (End of Month)</option>
              </select>
            </div>

            {incomeFrequency === "weekly" && (
              <div>
                <label
                  htmlFor="weeklyPayday"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weekly Payday
                </label>
                <select
                  id="weeklyPayday"
                  value={weeklyPayday}
                  onChange={(e) => setWeeklyPayday(parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                >
                  <option value="0">Sunday</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                </select>
              </div>
            )}
            {incomeFrequency === "bi-weekly" && (
              <div>
                <label
                  htmlFor="biWeeklyLastPayDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last/Next Bi-weekly Paycheck Date
                </label>
                <input
                  type="date"
                  id="biWeeklyLastPayDate"
                  value={biWeeklyLastPayDate}
                  onChange={(e) => setBiWeeklyLastPayDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                />
              </div>
            )}
          </div>
        </section>

        {/* Expenses */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Manage Expenses
          </h2>
          <form
            onSubmit={handleAddExpense}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
          >
            <div>
              <label
                htmlFor="expenseName"
                className="block text-sm font-medium text-gray-700"
              >
                Expense Name
              </label>
              <input
                type="text"
                id="expenseName"
                value={newExpenseName}
                onChange={(e) => setNewExpenseName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                placeholder="e.g., Rent, Groceries, Netflix"
                required
              />
            </div>
            <div>
              <label
                htmlFor="expenseType"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id="expenseType"
                value={newExpenseType}
                onChange={(e) =>
                  setNewExpenseType(e.target.value as typeof newExpenseType)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              >
                <option value="one-time">One-time Payment</option>
                <option value="subscription">Subscription</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="expenseAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                id="expenseAmount"
                value={newExpenseAmount}
                onChange={(e) =>
                  setNewExpenseAmount(parseFloat(e.target.value))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                min="0"
                required
              />
            </div>
            <div>
              <label
                htmlFor="expenseDate"
                className="block text-sm font-medium text-gray-700"
              >
                Date (for one-time, or first bill for subscription)
              </label>
              <input
                type="date"
                id="expenseDate"
                value={newExpenseDate}
                onChange={(e) => setNewExpenseDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                required
              />
            </div>
            <div className="md:col-span-2 lg:col-span-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
              >
                Add Expense
              </button>
            </div>
          </form>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Your Expenses
            </h3>
            {expenses.length === 0 ? (
              <p className="text-gray-500">No expenses added yet.</p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expenses.map((exp) => (
                  <li
                    key={exp.id}
                    className="bg-gray-50 p-4 rounded-md shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {exp.name} -{" "}
                        <span className="text-gray-600">
                          (${exp.amount.toFixed(2)})
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        {exp.type} on {exp.date}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setExpenses(expenses.filter((e) => e.id !== exp.id))
                      }
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Monthly Visualization */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Monthly Financial Projections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthlySummaries.map((summary, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-md"
              >
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  {summary.monthYear}
                </h3>
                <p className="text-gray-700 mb-1">
                  Starting Balance:{" "}
                  <span className="font-bold text-blue-800">
                    ${summary.startingBalance.toFixed(2)}
                  </span>
                </p>
                <p className="text-gray-700 mb-1">
                  Total Income:{" "}
                  <span className="font-bold text-green-700">
                    +${summary.totalIncome.toFixed(2)}
                  </span>
                </p>
                <p className="text-gray-700 mb-3">
                  Total Expenses:{" "}
                  <span className="font-bold text-red-700">
                    -${summary.totalExpenses.toFixed(2)}
                  </span>
                </p>
                <p className="text-lg font-bold text-gray-800">
                  Ending Balance:{" "}
                  <span
                    className={`${
                      summary.endingBalance >= 0
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    ${summary.endingBalance.toFixed(2)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Calendar */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Calendar View
          </h2>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goToPreviousMonth}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              &lt; Previous
            </button>
            <h3 className="text-xl font-semibold text-gray-800">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <button
              onClick={goToNextMonth}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Next &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center font-semibold text-sm mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
        </section>

        {/* Goals */}
        <section className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">My Goals</h2>
          <form
            onSubmit={handleAddGoal}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
          >
            <div>
              <label
                htmlFor="goalName"
                className="block text-sm font-medium text-gray-700"
              >
                Goal Name
              </label>
              <input
                type="text"
                id="goalName"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                placeholder="e.g., New Laptop, Vacation Fund"
                required
              />
            </div>
            <div>
              <label
                htmlFor="goalTargetAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Target Amount
              </label>
              <input
                type="number"
                id="goalTargetAmount"
                value={newGoalTargetAmount}
                onChange={(e) =>
                  setNewGoalTargetAmount(parseFloat(e.target.value))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                min="0"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out w-full"
              >
                Add Goal
              </button>
            </div>
          </form>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Your Savings Goals
            </h3>
            {goals.length === 0 ? (
              <p className="text-gray-500">No goals set yet.</p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <li
                    key={goal.id}
                    className="bg-blue-50 p-4 rounded-md shadow-sm"
                  >
                    <p className="font-medium text-gray-900">{goal.name}</p>
                    <p className="text-sm text-gray-600">
                      Target: ${goal.targetAmount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Saved: ${goal.savedAmount.toFixed(2)}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${
                            (goal.savedAmount / goal.targetAmount) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-end mt-3">
                      <input
                        type="number"
                        placeholder="Add amount"
                        className="w-24 p-1 rounded-md border border-gray-300 text-sm mr-2"
                        onChange={(e) => {
                          const amount = parseFloat(e.target.value);
                          if (!isNaN(amount) && amount > 0) {
                            // This is just a visual input, for a real app, you'd deduct from balance
                          }
                        }}
                      />
                      <button
                        onClick={() =>
                          saveToGoal(
                            goal.id,
                            parseFloat(
                              prompt(
                                "Enter amount to save towards this goal:"
                              ) || "0"
                            )
                          )
                        }
                        className="px-4 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
                      >
                        Save
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
