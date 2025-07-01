"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const HowMuch = () => {
  const [perDay, setPerDay] = useState<number>(0);
  const [perWeek, setPerWeek] = useState<number>(0);
  const [perMonth, setPerMonth] = useState<number>(0);
  const [perYear, setPerYear] = useState<number>(0);

  type Period = "day" | "week" | "month" | "year";

  const conversions = {
    day: {
      toYear: (value: number) => value * 365,
      toMonth: (value: number) => (value * 365) / 12,
      toWeek: (value: number) => (value * 365) / 52,
    },
    week: {
      toYear: (value: number) => value * 52,
      toMonth: (value: number) => (value * 52) / 12,
      toDay: (value: number) => value * 7,
    },
    month: {
      toYear: (value: number) => value * 12,
      toWeek: (value: number) => (value * 12) / 52,
      toDay: (value: number) => (value * 12) / 365,
    },
    year: {
      toMonth: (value: number) => value / 12,
      toWeek: (value: number) => value / 52,
      toDay: (value: number) => value / 365,
    },
  };

  const updateAllPeriods = (period: Period, value: number) => {
    switch (period) {
      case "year":
        setPerYear(value);
        setPerMonth(Number(conversions.year.toMonth(value).toFixed(2)));
        setPerWeek(Number(conversions.year.toWeek(value).toFixed(2)));
        setPerDay(Number(conversions.year.toDay(value).toFixed(2)));
        break;
      case "month":
        setPerMonth(value);
        setPerYear(Number(conversions.month.toYear(value).toFixed(2)));
        setPerWeek(Number(conversions.month.toWeek(value).toFixed(2)));
        setPerDay(Number(conversions.month.toDay(value).toFixed(2)));
        break;
      case "week":
        setPerWeek(value);
        setPerYear(Number(conversions.week.toYear(value).toFixed(2)));
        setPerMonth(Number(conversions.week.toMonth(value).toFixed(2)));
        setPerDay(Number(conversions.week.toDay(value).toFixed(2)));
        break;
      case "day":
        setPerDay(value);
        setPerYear(Number(conversions.day.toYear(value).toFixed(2)));
        setPerMonth(Number(conversions.day.toMonth(value).toFixed(2)));
        setPerWeek(Number(conversions.day.toWeek(value).toFixed(2)));
        break;
      default:
        break;
    }
  };

  const handlePerYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updateAllPeriods("year", value);
  };

  const handlePerMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updateAllPeriods("month", value);
  };

  const handlePerWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updateAllPeriods("week", value);
  };

  const handlePerDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updateAllPeriods("day", value);
  };

  return (
    <div className="min-h-screen p-8">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>How much ____?</CardTitle>
          <CardDescription>
            Instantly convert an amount between daily, weekly, monthly, and
            yearly values.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Amount Converter</CardTitle>
              <CardDescription>
                Enter a value in any field below and see how much it is per day,
                week, month, or year.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="perDay">Per Day</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <Input
                      id="perDay"
                      type="number"
                      value={perDay === 0 ? "" : perDay}
                      onChange={handlePerDayChange}
                      placeholder="Enter amount per day"
                      className="pl-7"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="perWeek">Per Week</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <Input
                      id="perWeek"
                      type="number"
                      value={perWeek === 0 ? "" : perWeek}
                      onChange={handlePerWeekChange}
                      placeholder="Enter amount per week"
                      className="pl-7"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="perMonth">Per Month</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <Input
                      id="perMonth"
                      type="number"
                      value={perMonth === 0 ? "" : perMonth}
                      onChange={handlePerMonthChange}
                      placeholder="Enter amount per month"
                      className="pl-7"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="perYear">Per Year</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <Input
                      id="perYear"
                      type="number"
                      value={perYear === 0 ? "" : perYear}
                      onChange={handlePerYearChange}
                      placeholder="Enter amount per year"
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default HowMuch;
