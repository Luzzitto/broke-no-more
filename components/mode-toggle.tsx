"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={"outline"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Moon
        className={`h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 block dark:hidden`}
      />
      <Sun
        className={`h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 hidden dark:block`}
      />
    </Button>
  );
};

export default ModeToggle;
