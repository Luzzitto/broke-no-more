import React from "react";

// --- Type Definitions ---
interface BudgetSummaryProps {
  label: string;
  value: number;
  isPositive?: boolean;
  isNegative?: boolean;
}

interface CategoryProgressProps {
  name: string;
  spent: number;
  budget: number;
  color: string;
}

interface QuickActionProps {
  label: string;
  icon: string;
  bgColor: string;
}

// Helper component for displaying financial summaries
const BudgetSummaryCard: React.FC<BudgetSummaryProps> = ({
  label,
  value,
  isPositive,
  isNegative,
}) => {
  const valueColorClass = isPositive
    ? "text-green-600"
    : isNegative
    ? "text-red-600"
    : "text-gray-800";

  const formattedValue = `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;

  return (
    <div className="bg-white p-5 rounded-lg shadow-md flex-1 text-center border border-gray-100">
      <h3 className="text-lg font-medium text-gray-600 mb-2">{label}</h3>
      <p className={`text-3xl font-bold ${valueColorClass}`}>
        {formattedValue}
      </p>
    </div>
  );
};

// Helper component for category progress bars
const CategoryProgressBar: React.FC<CategoryProgressProps> = ({
  name,
  spent,
  budget,
  color,
}) => {
  const percentage = (spent / budget) * 100;
  const progressColor = percentage > 100 ? "bg-red-500" : color; // Over budget turns red
  const remaining = budget - spent;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-700 font-medium">{name}</span>
        <span className="text-gray-800 font-semibold">
          ${spent.toFixed(2)} / ${budget.toFixed(2)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${progressColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${Math.min(percentage, 100)}%` }} // Cap at 100% for visual sanity, but show actual overspending in text
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Progress: {percentage.toFixed(1)}%</span>
        <span>
          Remaining:{" "}
          <span className={remaining < 0 ? "text-red-500" : "text-gray-500"}>
            ${remaining.toFixed(2)}
          </span>
        </span>
      </div>
    </div>
  );
};

// Helper component for quick action buttons
const QuickActionButton: React.FC<QuickActionProps> = ({
  label,
  icon,
  bgColor,
}) => (
  <button
    className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md ${bgColor} text-white hover:opacity-90 transition-opacity duration-200 flex-1`}
  >
    <span className="text-3xl mb-2">{icon}</span>
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

// Main App component
const App: React.FC = () => {
  // Mock Data
  const currentBalance: number = 6890.75;
  const monthlyIncome: number = 4200.0;
  const monthlyExpenses: number = 1850.5;
  const netFlow: number = monthlyIncome - monthlyExpenses;

  const budgetCategories = [
    { name: "Housing", spent: 1000, budget: 1100, color: "bg-indigo-500" },
    { name: "Groceries", spent: 380, budget: 400, color: "bg-emerald-500" },
    { name: "Utilities", spent: 170, budget: 150, color: "bg-red-500" }, // Example of over budget
    { name: "Transportation", spent: 120, budget: 180, color: "bg-yellow-500" },
    { name: "Entertainment", spent: 90, budget: 120, color: "bg-purple-500" },
    { name: "Savings", spent: 200, budget: 300, color: "bg-teal-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 font-sans flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 md:p-8 my-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8 leading-tight">
          Zen Budget
        </h1>

        {/* Top Summary Cards */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <BudgetSummaryCard
            label="Current Balance"
            value={currentBalance}
            isPositive={true}
          />
          <BudgetSummaryCard
            label="Monthly Net Flow"
            value={netFlow}
            isPositive={netFlow >= 0}
            isNegative={netFlow < 0}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <QuickActionButton
            label="Add Income"
            icon="➕"
            bgColor="bg-green-500"
          />
          <QuickActionButton
            label="Add Expense"
            icon="➖"
            bgColor="bg-red-500"
          />
          <QuickActionButton
            label="View Transactions"
            icon="📋"
            bgColor="bg-blue-500"
          />
          <QuickActionButton
            label="Set Goals"
            icon="🎯"
            bgColor="bg-purple-500"
          />
        </div>

        {/* Budget Categories Section */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
            Your Monthly Budget
            <span className="ml-3 text-sm font-medium text-blue-600 px-3 py-1 rounded-full bg-blue-100">
              June 2025
            </span>
          </h2>
          <div className="space-y-4">
            {budgetCategories.map((category) => (
              <CategoryProgressBar
                key={category.name}
                name={category.name}
                spent={category.spent}
                budget={category.budget}
                color={category.color}
              />
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md">
            Manage Categories
          </button>
        </div>

        {/* Insight/Tip Section */}
        <div className="bg-blue-50 p-5 rounded-lg shadow-md text-center border border-blue-100">
          <h3 className="text-xl font-bold text-blue-800 mb-2">
            💡 Financial Insight
          </h3>
          <p className="text-blue-700">
            You&apos;ve saved ${monthlyIncome - monthlyExpenses} this month!
            Keep up the great work towards your financial goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
