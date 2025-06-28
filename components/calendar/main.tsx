"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  // Helper functions
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Calendar Navigation
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

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

    const days = [];
    const today = formatDate(new Date());

    // Fill leading empty days
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(
        <div
          key={`empty-start-${i}`}
          className="p-2 bg-muted/50 border rounded-md"
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(new Date(currentYear, currentMonth, day));
      const isToday = dateString === today;
      days.push(
        <div
          key={`day-${day}`}
          className={`p-2 border rounded-md flex flex-col items-start min-h-[80px] text-sm ${
            isToday
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          <span className={`${isToday ? "font-bold" : "font-semibold"}`}>
            {day}
          </span>
        </div>
      );
    }

    // TODO: Add fill for ending empty days

    return days;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={goToPreviousMonth}>&lt; Previous</Button>
        <h3 className="text-xl font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <Button onClick={goToNextMonth}>Next &gt;</Button>
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
    </>
  );
};

export default Calendar;
