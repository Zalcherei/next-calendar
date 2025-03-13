export type ViewType = "month" | "week" | "day";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  color: string;
  calendarId: string;
}

export interface Calendar {
  id: string;
  name: string;
  color: string;
}

export interface CalendarSettings {
  language: string;
  region: string;
  timeZone: string;
  notifications: {
    email: boolean;
    desktop: boolean;
    reminderDefault: number; // minutes
  };
}

export const CALENDAR_COLORS = [
  { name: 'Lavender', value: 'bg-purple-500' },
  { name: 'Sage', value: 'bg-green-500' },
  { name: 'Coral', value: 'bg-red-500' },
  { name: 'Sky', value: 'bg-blue-500' },
  { name: 'Marigold', value: 'bg-yellow-500' },
  { name: 'Rose', value: 'bg-pink-500' },
  { name: 'Ocean', value: 'bg-cyan-500' },
  { name: 'Forest', value: 'bg-emerald-500' },
  { name: 'Berry', value: 'bg-fuchsia-500' },
  { name: 'Slate', value: 'bg-slate-500' },
];

export const LANGUAGES = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'English (UK)', value: 'en-GB' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Italian', value: 'it' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese (Simplified)', value: 'zh-CN' },
  { label: 'Chinese (Traditional)', value: 'zh-TW' },
];

export const REGIONS = [
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'European Union', value: 'EU' },
  { label: 'Canada', value: 'CA' },
  { label: 'Australia', value: 'AU' },
  { label: 'Japan', value: 'JP' },
  { label: 'India', value: 'IN' },
  { label: 'Brazil', value: 'BR' },
];

export const TIME_ZONES = [
  { label: '(GMT-08:00) Pacific Time', value: 'America/Los_Angeles' },
  { label: '(GMT-07:00) Mountain Time', value: 'America/Denver' },
  { label: '(GMT-06:00) Central Time', value: 'America/Chicago' },
  { label: '(GMT-05:00) Eastern Time', value: 'America/New_York' },
  { label: '(GMT+00:00) UTC', value: 'UTC' },
  { label: '(GMT+01:00) Central European Time', value: 'Europe/Paris' },
  { label: '(GMT+02:00) Eastern European Time', value: 'Europe/Helsinki' },
  { label: '(GMT+05:30) India Standard Time', value: 'Asia/Kolkata' },
  { label: '(GMT+08:00) China Standard Time', value: 'Asia/Shanghai' },
  { label: '(GMT+09:00) Japan Standard Time', value: 'Asia/Tokyo' },
];