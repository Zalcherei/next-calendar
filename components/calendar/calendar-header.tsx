"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Menu,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
} from "date-fns";
import { ViewType, CalendarSettings } from "@/lib/types";
import { useState, useEffect } from "react";
import { SettingsDialog } from "./settings-dialog";
import { useTheme } from "next-themes";

interface CalendarHeaderProps {
  view: ViewType;
  date: Date;
  onViewChange: (view: ViewType) => void;
  onDateChange: (date: Date) => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function CalendarHeader({
  view,
  date,
  onViewChange,
  onDateChange,
  onToggleSidebar,
  isSidebarOpen,
}: CalendarHeaderProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<CalendarSettings>({
    language: "en-US",
    region: "US",
    timeZone: "America/New_York",
    notifications: {
      email: true,
      desktop: true,
      reminderDefault: 30,
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrevious = () => {
    switch (view) {
      case "month":
        onDateChange(subMonths(date, 1));
        break;
      case "week":
        onDateChange(subWeeks(date, 1));
        break;
      case "day":
        onDateChange(subDays(date, 1));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case "month":
        onDateChange(addMonths(date, 1));
        break;
      case "week":
        onDateChange(addWeeks(date, 1));
        break;
      case "day":
        onDateChange(addDays(date, 1));
        break;
    }
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  const getHeaderDate = () => {
    switch (view) {
      case "month":
        return format(date, "MMMM yyyy");
      case "week":
        return `${format(date, "MMM d")} - ${format(addDays(date, 6), "MMM d, yyyy")}`;
      case "day":
        return format(date, "MMMM d, yyyy");
      default:
        return format(date, "MMMM yyyy");
    }
  };

  const handleSaveSettings = (newSettings: CalendarSettings) => {
    setSettings(newSettings);
    // Here you would typically persist the settings to a backend
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="shrink-0"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <CalendarIcon className="h-6 w-6 shrink-0" />
        <h1 className="text-2xl font-semibold">Calendar</h1>
        <Button variant="outline" onClick={handleToday} className="shrink-0">
          Today
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-medium px-4 min-w-[200px]">
            {getHeaderDate()}
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={view === "month" ? "default" : "ghost"}
          onClick={() => onViewChange("month")}
        >
          Month
        </Button>
        <Button
          variant={view === "week" ? "default" : "ghost"}
          onClick={() => onViewChange("week")}
        >
          Week
        </Button>
        <Button
          variant={view === "day" ? "default" : "ghost"}
          onClick={() => onViewChange("day")}
        >
          Day
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="ml-2"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSettings(true)}
          className="ml-2"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />
    </header>
  );
}
