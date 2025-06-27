import React from "react";

// --- Type Definitions ---
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

// Main App component
const App: React.FC = () => {
  // Mock Data
  const currentBalance: number = 7250.5;
  const monthlyIncome: number = 4800.0;
  const monthlyExpenses: number = 2100.3;

  const budgetCategories: Category[] = [
    { name: "Housing", spent: 1000, budget: 1200, color: "bg-red-500" },
    { name: "Groceries", spent: 450, budget: 500, color: "bg-green-500" },
    { name: "Transportation", spent: 200, budget: 250, color: "bg-yellow-500" },
    { name: "Utilities", spent: 150, budget: 180, color: "bg-blue-500" },
    { name: "Entertainment", spent: 100, budget: 150, color: "bg-indigo-500" },
    { name: "Dining Out", spent: 80, budget: 100, color: "bg-purple-500" },
    { name: "Health", spent: 70, budget: 80, color: "bg-pink-500" },
    { name: "Savings", spent: 50, budget: 200, color: "bg-teal-500" },
  ];

  const recentTransactions: Transaction[] = [
    {
      id: 1,
      date: "2025-06-24",
      description: "Electric Bill",
      category: "Utilities",
      amount: -75.0,
      type: "expense",
    },
    {
      id: 2,
      date: "2025-06-23",
      description: "Grocery Store",
      category: "Groceries",
      amount: -55.2,
      type: "expense",
    },
    {
      id: 3,
      date: "2025-06-22",
      description: "Freelance Work",
      category: "Income",
      amount: 800.0,
      type: "income",
    },
    {
      id: 4,
      date: "2025-06-21",
      description: "Restaurant Dinner",
      category: "Dining Out",
      amount: -40.5,
      type: "expense",
    },
    {
      id: 5,
      date: "2025-06-20",
      description: "Bus Pass",
      category: "Transportation",
      amount: -2.75,
      type: "expense",
    },
  ];

  // Calculate totals for summary and chart
  const totalBudgeted = budgetCategories.reduce(
    (sum, cat) => sum + cat.budget,
    0
  );
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const monthlySavings = monthlyIncome - monthlyExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 my-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 leading-tight">
          My Financial Hub
        </h1>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold mb-2">Current Balance</h2>
            <p className="text-4xl font-bold">
              $
              {currentBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold mb-2">Monthly Income</h2>
            <p className="text-4xl font-bold">
              $
              {monthlyIncome.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
            <p className="text-4xl font-bold">
              $
              {monthlyExpenses.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        {/* Budget Overview and Spending Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
              Budget Overview
              <span className="ml-3 text-sm font-medium text-blue-600 px-3 py-1 rounded-full bg-blue-100">
                July 2025
              </span>
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg text-gray-700">
                <span>Budgeted:</span>
                <span className="font-semibold text-blue-700">
                  $
                  {totalBudgeted.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg text-gray-700">
                <span>Spent:</span>
                <span className="font-semibold text-red-700">
                  $
                  {totalSpent.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg text-gray-700">
                <span>Remaining:</span>
                <span
                  className={`font-bold ${
                    totalBudgeted - totalSpent >= 0
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  $
                  {(totalBudgeted - totalSpent).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg text-gray-700 pt-3 border-t border-gray-200 mt-4">
                <span>Monthly Savings:</span>
                <span
                  className={`font-bold ${
                    monthlySavings >= 0 ? "text-teal-700" : "text-red-700"
                  }`}
                >
                  $
                  {monthlySavings.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md">
              Adjust My Budget
            </button>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Spending Categories
            </h2>
            <div className="space-y-4">
              {budgetCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 font-medium">
                      {category.name}
                    </span>
                    <span className="text-gray-800 font-semibold">
                      ${category.spent.toFixed(2)} / $
                      {category.budget.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${category.color} h-3 rounded-full`}
                      style={{
                        width: `${(category.spent / category.budget) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Recent Activity
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {transaction.category}
                    </td>
                    <td
                      className={`px-4 py-3 whitespace-nowrap text-sm font-medium text-right ${
                        transaction.type === "expense"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {transaction.type === "expense" ? "-" : "+"}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <button className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors shadow-sm">
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
