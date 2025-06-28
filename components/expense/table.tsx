import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Example data
const expenses = [
  {
    name: "Netflix Subscription",
    type: "Entertainment",
    amount: 15.99,
    date: "2024-06-01",
    recurring: true,
  },
  {
    name: "Groceries",
    type: "Food",
    amount: 120.5,
    date: "2024-06-10",
    recurring: false,
  },
  {
    name: "Gym Membership",
    type: "Health",
    amount: 45.0,
    date: "2024-06-05",
    recurring: true,
  },
];

const ExpenseTable = () => {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Expense Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date / Recurring Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium">{expense.name}</TableCell>
            <TableCell>{expense.type}</TableCell>
            <TableCell>
              {expense.recurring ? `Recurring: ${expense.date}` : expense.date}
            </TableCell>
            <TableCell className="text-right">
              ${expense.amount.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">${total.toFixed(2)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ExpenseTable;
