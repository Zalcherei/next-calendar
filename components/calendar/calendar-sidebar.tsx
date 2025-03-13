"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Check, MoreVertical } from "lucide-react";
import { MiniCalendar } from "./mini-calendar";
import { cn } from "@/lib/utils";
import { Calendar, CALENDAR_COLORS } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CalendarSidebarProps {
  isOpen: boolean;
  onCreateClick: () => void;
}

export function CalendarSidebar({ isOpen, onCreateClick }: CalendarSidebarProps) {
  const [calendars, setCalendars] = useState<Calendar[]>([
    { id: '1', name: 'Personal', color: 'bg-blue-500' },
    { id: '2', name: 'Work', color: 'bg-green-500' },
    { id: '3', name: 'Family', color: 'bg-yellow-500' },
  ]);
  const [showCalendarDialog, setShowCalendarDialog] = useState(false);
  const [editingCalendar, setEditingCalendar] = useState<Calendar | null>(null);
  const [newCalendarName, setNewCalendarName] = useState("");
  const [selectedColor, setSelectedColor] = useState(CALENDAR_COLORS[0].value);

  const handleCreateCalendar = () => {
    if (editingCalendar) {
      setCalendars(calendars.map(cal => 
        cal.id === editingCalendar.id 
          ? { ...cal, name: newCalendarName, color: selectedColor }
          : cal
      ));
    } else {
      setCalendars([
        ...calendars,
        {
          id: crypto.randomUUID(),
          name: newCalendarName,
          color: selectedColor,
        },
      ]);
    }
    setShowCalendarDialog(false);
    setEditingCalendar(null);
    setNewCalendarName("");
    setSelectedColor(CALENDAR_COLORS[0].value);
  };

  const handleDeleteCalendar = (calendarId: string) => {
    setCalendars(calendars.filter(cal => cal.id !== calendarId));
  };

  const handleEditCalendar = (calendar: Calendar) => {
    setEditingCalendar(calendar);
    setNewCalendarName(calendar.name);
    setSelectedColor(calendar.color);
    setShowCalendarDialog(true);
  };

  return (
    <aside 
      className={cn(
        "border-r p-4 flex flex-col gap-4 transition-all duration-300",
        isOpen ? "w-64" : "w-0 opacity-0 overflow-hidden"
      )}
    >
      <Button className="gap-2" onClick={onCreateClick}>
        <Plus className="h-4 w-4" />
        Create Event
      </Button>
      <MiniCalendar />
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">My calendars</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowCalendarDialog(true);
                setEditingCalendar(null);
                setNewCalendarName("");
                setSelectedColor(CALENDAR_COLORS[0].value);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {calendars.map((calendar) => (
              <div
                key={calendar.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent group"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${calendar.color}`} />
                  <span>{calendar.name}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditCalendar(calendar)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDeleteCalendar(calendar.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      <Dialog open={showCalendarDialog} onOpenChange={setShowCalendarDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCalendar ? "Edit Calendar" : "Create Calendar"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                placeholder="Calendar name"
                value={newCalendarName}
                onChange={(e) => setNewCalendarName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Color</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <div className={`w-4 h-4 rounded-full ${selectedColor} mr-2`} />
                    {CALENDAR_COLORS.find((c) => c.value === selectedColor)?.name}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="grid grid-cols-5 gap-2">
                    {CALENDAR_COLORS.map((color) => (
                      <button
                        key={color.value}
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center",
                          color.value
                        )}
                        onClick={() => setSelectedColor(color.value)}
                      >
                        {selectedColor === color.value && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCalendarDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCalendar}>
              {editingCalendar ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}