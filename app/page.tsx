"use client";

import { useState } from "react";
import { Calendar } from "@/components/calendar/calendar";
import { CalendarHeader } from "@/components/calendar/calendar-header";
import { CalendarSidebar } from "@/components/calendar/calendar-sidebar";
import { EventDialog } from "@/components/calendar/event-dialog";
import { ViewType, CalendarEvent } from "@/lib/types";

export default function Home() {
  const [view, setView] = useState<ViewType>("month");
  const [date, setDate] = useState<Date>(new Date());
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleCreateEvent = (event: CalendarEvent) => {
    setEvents([...events, event]);
    setShowEventDialog(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setShowEventDialog(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowEventDialog(false);
    setSelectedEvent(null);
  };

  const handleCellClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setShowEventDialog(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(null);
    setShowEventDialog(true);
  };

  return (
    <div className="flex h-screen bg-background">
      <CalendarSidebar 
        isOpen={isSidebarOpen} 
        onCreateClick={() => {
          setSelectedDate(new Date());
          setSelectedEvent(null);
          setShowEventDialog(true);
        }}
      />
      <main className="flex-1 flex flex-col">
        <CalendarHeader 
          view={view}
          date={date}
          onViewChange={setView}
          onDateChange={setDate}
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <Calendar 
          view={view}
          date={date}
          events={events}
          onCellClick={handleCellClick}
          onEventClick={handleEventClick}
        />
      </main>
      <EventDialog
        open={showEventDialog}
        onOpenChange={setShowEventDialog}
        selectedDate={selectedDate}
        event={selectedEvent}
        onCreateEvent={handleCreateEvent}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
}