import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Manage = () => {
  return (
    <Card className="basis-1/3">
      <CardHeader>
        <CardTitle>Manage Expense</CardTitle>
        <CardDescription>
          Add, edit, or remove your expenses. Keep your spending organized and
          up to date for accurate budget tracking.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Label className="block">
          <span>Expense Name</span>
          <Input type="text" className="mt-1 block" />
        </Label>
        <Label className="block">
          <span>Type</span>
          <Select>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select expense type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time Payment</SelectItem>
              <SelectItem value="subscription">Subscription</SelectItem>
              <SelectItem value="recurring">Recurring</SelectItem>
            </SelectContent>
          </Select>
        </Label>
        <Label className="block">
          <span>Amount</span>
          <Input type="number" className="mt-1 block" />
        </Label>
        <Button>Add Expense</Button>
      </CardContent>
    </Card>
  );
};

export default Manage;
