"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    switch (theme) {
      case "dark":
        setTheme("light");
        return;
      case "light":
        setTheme("dark");
        return;
    }
  };

  return (
    <div className="relative mr-8">
      <button
        onClick={handleThemeChange}
        className="absolute inset-0 m-auto flex size-8 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-600 cursor-pointer"
      >
        <Sun className="absolute inset-0 m-auto size-4 shrink-0 scale-100 text-neutral-500 transition-all duration-300 dark:scale-0 dark:rotate-45" />
        <Moon className="absolute inset-0 m-auto size-4 shrink-0 scale-0 rotate-45 transition-all duration-300 dark:scale-100 dark:rotate-0 dark:text-neutral-200" />
      </button>
    </div>
  );
};

export default ModeToggle;
