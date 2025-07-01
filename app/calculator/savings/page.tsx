"use client";

import ModeToggle from "@/components/mode-toggle";
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
import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";

const Calculator = () => {
  const [sliderValue, setSliderValue] = useState<number>(0.1);
  const [targetAmount, setTargetAmount] = useState<number | undefined>();
  const [monthlyIncome, setMonthlyIncome] = useState<number | undefined>();

  // Calculate values safely
  const monthlySavings =
    typeof monthlyIncome === "number" && !isNaN(monthlyIncome)
      ? monthlyIncome * sliderValue
      : 0;

  const monthsNeeded =
    monthlySavings > 0 && typeof targetAmount === "number" && targetAmount > 0
      ? Math.ceil(targetAmount / monthlySavings)
      : 0;

  const years = Math.floor(monthsNeeded / 12);
  const months = monthsNeeded % 12;

  return (
    <div className="min-h-screen p-8 ">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Savings Calculator</CardTitle>
          <CardDescription>
            This calculator helps you determine if your savings goal is
            achievable based on your inputs. Enter your details to find out
            whether reaching your target is possible or not.
          </CardDescription>
          <CardAction>
            <ModeToggle />
          </CardAction>
        </CardHeader>
        <CardContent>
          <Card className="w-full lg:max-w-2xl">
            <CardContent className="grid grid-cols-1 gap-4">
              <Label className="flex flex-col items-start space-y-1">
                <span>Target Amount</span>
                <Input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                />
              </Label>
              <Label className="flex flex-col items-start space-y-1">
                <span>Monthly Income</span>
                <Input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                />
              </Label>
              <Label className="flex flex-col items-start space-y-1">
                <span>
                  Percentage of Income: {(sliderValue * 100).toFixed(0)}%
                </span>
                <Slider
                  value={[sliderValue]}
                  max={1}
                  min={0}
                  step={0.05}
                  onValueChange={([val]) => setSliderValue(val)}
                />
              </Label>
              <div className="border p-8">
                <h1>
                  {monthlySavings > 0 &&
                  typeof targetAmount === "number" &&
                  targetAmount > 0 ? (
                    <>
                      <div className="grid grid-cols-2">
                        <p>Months Needed: </p>
                        <span>
                          {monthsNeeded > 12
                            ? `${years} year${years > 1 ? "s" : ""}${
                                months > 0
                                  ? ` and ${months} month${
                                      months > 1 ? "s" : ""
                                    }`
                                  : ""
                              }`
                            : `${monthsNeeded} months`}
                        </span>
                        <p>Savings Amount: </p>
                        <span>
                          $
                          {typeof monthlyIncome === "number" &&
                          !isNaN(monthlyIncome)
                            ? (sliderValue * monthlyIncome).toFixed(2)
                            : "0.00"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>Enter values to calculate.</>
                  )}
                </h1>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
