import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ExpenseTable from "./table";

const View = () => {
  return (
    <Card className="basis-2/3">
      <CardHeader>
        <CardTitle>View Expense</CardTitle>
        <CardDescription>
          Explore detailed records of your expenses in a sortable and filterable
          table for better tracking and analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ExpenseTable />
      </CardContent>
    </Card>
  );
};

export default View;
