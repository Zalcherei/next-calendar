"use client";

import { ViewType, CalendarEvent } from "@/lib/types";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
  addDays,
  startOfDay,
  endOfDay,
  isWithinInterval,
} from "date-fns";
import React from "react";

interface CalendarProps {
  view: ViewType;
  date: Date;
  events: CalendarEvent[];
  onCellClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export function Calendar({
  view,
  date,
  events,
  onCellClick,
  onEventClick,
}: CalendarProps) {
  const renderEvent = (event: CalendarEvent) => (
    <div
      key={event.id}
      className={`${event.color} text-white rounded px-2 py-1 text-sm mb-1 cursor-pointer truncate`}
      onClick={(e) => {
        e.stopPropagation();
        onEventClick(event);
      }}
    >
      {event.title}
    </div>
  );

  const getEventsForDate = (date: Date) => {
    return events.filter((event) =>
      isWithinInterval(date, {
        start: startOfDay(new Date(event.start)),
        end: endOfDay(new Date(event.end)),
      }),
    );
  };

  const renderMonthView = () => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const days = eachDayOfInterval({ start, end });

    const firstDayOfMonth = startOfWeek(start);
    const lastDayOfMonth = endOfWeek(end);

    const daysToDisplay = eachDayOfInterval({
      start: firstDayOfMonth,
      end: lastDayOfMonth,
    });

    return (
      <div className="flex-1 grid grid-cols-7 grid-rows-6 gap-[1px] bg-border">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="bg-background p-2 text-sm text-muted-foreground text-center"
          >
            {day}
          </div>
        ))}
        {daysToDisplay.map((day, idx) => {
          const dayEvents = getEventsForDate(day);
          return (
            <div
              key={idx}
              className={`bg-background p-2 min-h-[100px] hover:bg-accent/50 cursor-pointer ${
                !isSameMonth(day, date) ? "text-muted-foreground" : ""
              } ${isSameDay(day, new Date()) ? "font-bold" : ""}`}
              onClick={() => onCellClick(day)}
            >
              <div className="font-medium">{format(day, "d")}</div>
              <div className="mt-1">
                {dayEvents.map((event) => renderEvent(event))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const start = startOfWeek(date);
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-8 gap-[1px] bg-border">
          <div className="bg-background w-16" />
          {days.map((day, idx) => (
            <div
              key={`header-${idx}`}
              className="bg-background p-2 text-sm text-center"
            >
              <div className="text-muted-foreground">{format(day, "EEE")}</div>
              <div className={isSameDay(day, new Date()) ? "font-bold" : ""}>
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-8 gap-[1px] bg-border">
            {hours.map((hour) => (
              <React.Fragment key={`hour-row-${hour}`}>
                <div className="bg-background p-2 text-sm text-muted-foreground text-right w-16">
                  {format(new Date().setHours(hour), "ha")}
                </div>
                {days.map((day, dayIdx) => {
                  const dayEvents = getEventsForDate(day);
                  return (
                    <div
                      key={`cell-${hour}-${dayIdx}`}
                      className="bg-background min-h-[48px] hover:bg-accent/50 cursor-pointer relative"
                      onClick={() => {
                        const clickedDate = new Date(day);
                        clickedDate.setHours(hour);
                        onCellClick(clickedDate);
                      }}
                    >
                      {dayEvents.map((event) => renderEvent(event))}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const today = startOfDay(date);
    const dayEvents = getEventsForDate(today);

    return (
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-[1px] bg-border">
          <div className="bg-background w-16" />
          <div className="bg-background p-2 text-sm text-center">
            <div className="text-muted-foreground">{format(today, "EEEE")}</div>
            <div className={isSameDay(today, new Date()) ? "font-bold" : ""}>
              {format(today, "d")}
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-2 gap-[1px] bg-border">
            {hours.map((hour) => (
              <React.Fragment key={`hour-row-${hour}`}>
                <div className="bg-background p-2 text-sm text-muted-foreground text-right w-16">
                  {format(new Date().setHours(hour), "ha")}
                </div>
                <div
                  key={`cell-${hour}`}
                  className="bg-background min-h-[48px] hover:bg-accent/50 cursor-pointer relative"
                  onClick={() => {
                    const clickedDate = new Date(today);
                    clickedDate.setHours(hour);
                    onCellClick(clickedDate);
                  }}
                >
                  {dayEvents.map((event) => renderEvent(event))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-hidden">
      {view === "month" && renderMonthView()}
      {view === "week" && renderWeekView()}
      {view === "day" && renderDayView()}
    </div>
  );
}
