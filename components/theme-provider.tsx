"use client";

import React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider: React.FC<
  React.ComponentProps<typeof NextThemeProvider>
> = ({ children, ...props }) => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
};

export default ThemeProvider;
