import Calendar from "@/components/calendar/main";
import Expense from "@/components/expense/main";
import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import React from "react";

const App = () => {
  return (
    <div className="min-h-screen p-8">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Budgeting Dashboard</CardTitle>
          <CardDescription>
            Track your expenses, set budgets, and gain insights into your
            financial habits with this simple budgeting dashboard.
          </CardDescription>
          <CardAction>
            <ModeToggle />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <Card className="basis-1/3">
              <CardHeader>
                <CardTitle>Initial Configuration</CardTitle>
                <CardDescription>
                  Set up your starting balance, preferred currency, and monthly
                  budget to begin tracking your finances.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Label className="block">
                  <span>Initial Bank Balance</span>
                  <Input type="number" className="mt-1 block" />
                </Label>
                <Label className="block">
                  <span>Income Amount</span>
                  <Input type="number" className="mt-1 block" />
                </Label>
                <Label className="block">
                  <span>Income Type</span>
                  <Select>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select income type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </Label>
                <Button>Update</Button>
              </CardContent>
            </Card>
            <Card className="basis-2/3">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  View a summary of your current balance, recent transactions,
                  and budget status at a glance.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Visualize your income and expenses throughout the month. Use the
                calendar to track upcoming bills, paydays, and financial events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Savings Goal</CardTitle>
              <CardDescription>
                Set and track your savings goals. Monitor your progress and stay
                motivated to reach your financial targets.
              </CardDescription>
            </CardHeader>
          </Card>
          <Expense />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
