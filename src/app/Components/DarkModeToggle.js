import React from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const DarkModeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2 bg-secondary/50 p-2 rounded-full">
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <div className="flex items-center">
        <Switch
          id="dark-mode"
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
          aria-label="Toggle dark mode"
        />
        <Label
          htmlFor="dark-mode"
          className="ml-2 cursor-pointer select-none hidden sm:inline-block"
        >
          {theme === "dark" ? "Dark" : "Light"}
        </Label>
      </div>
      <Moon className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </div>
  );
};

export default DarkModeToggle;
