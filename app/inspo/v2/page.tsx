import React, { useState } from "react";

// --- Type Definitions ---
interface NavButtonProps {
  view: "dashboard" | "transactions" | "goals" | "monthly-budget"; // Added 'monthly-budget'
  label: string;
}

interface CardProps {
  title: string;
  value: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

interface ProgressRingProps {
  percentage: number;
  color: string;
}

interface Category {
  name: string;
  spent: number;
  budget: number;
  color: string;
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "expense" | "income";
}

interface Goal {
  id: number;
  name: string;
  target: number;
  saved: number;
  deadline: string;
}

interface GoalCardProps {
  goal: Goal;
}

// Main App component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "transactions" | "goals" | "monthly-budget"
  >("dashboard"); // State to manage current view

  const NavButton: React.FC<NavButtonProps> = ({ view, label }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`px-4 py-2 rounded-md transition-colors duration-200 ${
        currentView === view
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl p-6 md:p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Budgeting GUI Inspiration
        </h1>
        {/* Navigation */}
        <nav className="flex justify-center space-x-4 mb-8 flex-wrap">
          <NavButton view="dashboard" label="Dashboard Overview" />
          <NavButton view="transactions" label="Transaction-Centric" />
          <NavButton view="goals" label="Goal-Oriented" />
          <NavButton view="monthly-budget" label="Monthly Budget" />{" "}
          {/* New Button */}
        </nav>
        {/* Render current view */}
        {currentView === "dashboard" && <DashboardOverview />}
        {currentView === "transactions" && <TransactionCentric />}
        {currentView === "goals" && <GoalOriented />}
        {currentView === "monthly-budget" && <MonthlyBudget />}{" "}
        {/* Render New View */}
      </div>
    </div>
  );
};

// --- Version 1: Dashboard Overview ---
const DashboardOverview: React.FC = () => {
  const Card: React.FC<CardProps> = ({
    title,
    value,
    icon,
    bgColor,
    textColor,
  }) => (
    <div
      className={`p-5 rounded-lg shadow-md flex items-center space-x-4 ${bgColor} ${textColor}`}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  const ProgressRing: React.FC<ProgressRingProps> = ({ percentage, color }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-gray-300"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
          <circle
            className={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {percentage}%
        </div>
      </div>
    );
  };

  const categories: Category[] = [
    { name: "Housing", spent: 600, budget: 800, color: "bg-indigo-500" },
    { name: "Food", spent: 300, budget: 400, color: "bg-pink-500" },
    { name: "Transport", spent: 100, budget: 150, color: "bg-yellow-500" },
    { name: "Entertainment", spent: 40, budget: 100, color: "bg-green-500" },
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          title="Current Balance"
          value="$3,450.75"
          icon="💰"
          bgColor="bg-blue-100"
          textColor="text-blue-800"
        />
        <Card
          title="Monthly Income"
          value="$4,500.00"
          icon="💸"
          bgColor="bg-green-100"
          textColor="text-green-800"
        />
        <Card
          title="Monthly Expenses"
          value="$1,049.25"
          icon="📉"
          bgColor="bg-red-100"
          textColor="text-red-800"
        />
        <Card
          title="Savings Rate"
          value="32.8%"
          icon="📈"
          bgColor="bg-purple-100"
          textColor="text-purple-800"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Categories */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Spending by Category
          </h3>
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-gray-700 text-sm mb-1">
                  <span>{cat.name}</span>
                  <span>
                    ${cat.spent} / ${cat.budget}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${cat.color} h-2 rounded-full`}
                    style={{ width: `${(cat.spent / cat.budget) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Health Rings */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Financial Health
          </h3>
          <div className="flex justify-around w-full max-w-md">
            <div className="flex flex-col items-center">
              <ProgressRing percentage={75} color="text-green-500" />
              <p className="mt-2 text-gray-700">Budget Adherence</p>
            </div>
            <div className="flex flex-col items-center">
              <ProgressRing percentage={60} color="text-blue-500" />
              <p className="mt-2 text-gray-700">Debt to Income</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            These are mock metrics for demonstration purposes.
          </p>
        </div>
      </div>
    </section>
  );
};

// --- Version 2: Transaction-Centric ---
const TransactionCentric: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: 1,
      date: "2025-06-23",
      description: "Coffee Shop",
      category: "Food",
      amount: -5.5,
      type: "expense",
    },
    {
      id: 2,
      date: "2025-06-22",
      description: "Monthly Salary",
      category: "Income",
      amount: 2250.0,
      type: "income",
    },
    {
      id: 3,
      date: "2025-06-21",
      description: "Groceries",
      category: "Food",
      amount: -75.2,
      type: "expense",
    },
    {
      id: 4,
      date: "2025-06-21",
      description: "Bus Fare",
      category: "Transport",
      amount: -2.75,
      type: "expense",
    },
    {
      id: 5,
      date: "2025-06-20",
      description: "Internet Bill",
      category: "Utilities",
      amount: -60.0,
      type: "expense",
    },
    {
      id: 6,
      date: "2025-06-19",
      description: "Freelance Payment",
      category: "Income",
      amount: 500.0,
      type: "income",
    },
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Transaction-Centric View
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Recent Transactions
          </h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Add Transaction
            </button>
            <select className="p-2 border border-gray-300 rounded-md">
              <option>All Categories</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Utilities</option>
              <option>Income</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tx.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tx.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tx.category}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                      tx.type === "expense" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {tx.type === "expense" ? "-" : "+"}$
                    {Math.abs(tx.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Version 3: Goal-Oriented ---
const GoalOriented: React.FC = () => {
  const goals: Goal[] = [
    {
      id: 1,
      name: "New Car Down Payment",
      target: 5000,
      saved: 3200,
      deadline: "2026-03-01",
    },
    {
      id: 2,
      name: "Emergency Fund",
      target: 10000,
      saved: 7500,
      deadline: "2025-12-31",
    },
    {
      id: 3,
      name: "Vacation to Japan",
      target: 3000,
      saved: 1000,
      deadline: "2026-07-01",
    },
  ];

  const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
    const percentage = (goal.saved / goal.target) * 100;
    const remaining = goal.target - goal.saved;

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
          {goal.name}
        </h3>
        <p className="text-gray-600 mb-4">
          Target:{" "}
          <span className="font-bold">${goal.target.toLocaleString()}</span>
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-purple-500 h-3 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-700 mb-4">
          <span>
            Saved:{" "}
            <span className="font-medium">${goal.saved.toLocaleString()}</span>
          </span>
          <span>
            Progress:{" "}
            <span className="font-medium">{percentage.toFixed(1)}%</span>
          </span>
        </div>
        <p className="text-gray-600 text-sm">
          Remaining:{" "}
          <span className="font-bold">${remaining.toLocaleString()}</span>{" "}
          &bull; Deadline: {goal.deadline}
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">
            Edit
          </button>
          <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
            Contribute
          </button>
        </div>
      </div>
    );
  };

  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Goal-Oriented View
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-colors">
          Add New Goal
        </button>
      </div>
    </section>
  );
};

// --- Version 4: Monthly Budget Breakdown ---
const MonthlyBudget: React.FC = () => {
  const budgetCategories: Category[] = [
    { name: "Rent", spent: 800, budget: 800, color: "bg-red-500" },
    { name: "Groceries", spent: 280, budget: 350, color: "bg-green-500" },
    { name: "Dining Out", spent: 120, budget: 150, color: "bg-yellow-500" },
    { name: "Utilities", spent: 100, budget: 120, color: "bg-blue-500" },
    { name: "Transport", spent: 70, budget: 100, color: "bg-indigo-500" },
    { name: "Entertainment", spent: 50, budget: 100, color: "bg-purple-500" },
    { name: "Shopping", spent: 30, budget: 50, color: "bg-pink-500" },
    { name: "Savings", spent: 500, budget: 700, color: "bg-teal-500" },
  ];

  const totalBudget = budgetCategories.reduce(
    (acc, cat) => acc + cat.budget,
    0
  );
  const totalSpent = budgetCategories.reduce((acc, cat) => acc + cat.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  // Simple "mock" for a pie chart - in a real app, you'd use a charting library
  const PieChartSection: React.FC<{
    category: Category;
    totalSpent: number;
  }> = ({ category, totalSpent }) => {
    if (totalSpent === 0) return null; // Avoid division by zero
    const percentage = (category.spent / totalSpent) * 100;
    // For a real pie chart, you'd calculate angles. This is just a visual representation.
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
        <span className="text-gray-700">
          {category.name}: ${category.spent.toFixed(2)} ({percentage.toFixed(1)}
          %)
        </span>
      </div>
    );
  };

  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Monthly Budget Breakdown (July 2025)
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-lg text-gray-600">Total Budgeted</p>
            <p className="text-3xl font-bold text-blue-600">
              $
              {totalBudget.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-600">Total Spent</p>
            <p className="text-3xl font-bold text-red-600">
              $
              {totalSpent.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-600">Remaining</p>
            <p
              className={`text-3xl font-bold ${
                remainingBudget >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              $
              {remainingBudget.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual Budget Summary (Mock Pie Chart) */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Spending Distribution
          </h3>
          <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-semibold mb-4">
            {/* This would be a real pie chart in a production app */}
            <span className="text-sm">Mock Pie Chart</span>
          </div>
          <div className="space-y-2">
            {budgetCategories
              .filter((cat) => cat.spent > 0)
              .map((cat) => (
                <PieChartSection
                  key={cat.name}
                  category={cat}
                  totalSpent={totalSpent}
                />
              ))}
          </div>
        </div>

        {/* Detailed Category Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Detailed Categories
          </h3>
          <div className="space-y-4">
            {budgetCategories.map((cat) => (
              <div
                key={cat.name}
                className="border-b border-gray-200 pb-3 last:border-b-0"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                    <span className="text-lg font-medium text-gray-800">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    ${cat.spent.toFixed(2)} / ${cat.budget.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${cat.color} h-2 rounded-full`}
                    style={{ width: `${(cat.spent / cat.budget) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>
                    Spent: {((cat.spent / cat.budget) * 100).toFixed(1)}%
                  </span>
                  <span>Remaining: ${(cat.budget - cat.spent).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Adjust Budget
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
