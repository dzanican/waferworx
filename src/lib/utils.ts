import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function getWorkWeek(date: Date): { year: number; week: number } {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const week = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return { year: date.getFullYear(), week };
}

export function getWeekDates(year: number, week: number): { start: Date; end: Date } {
  const jan1 = new Date(year, 0, 1);
  const daysOffset = (week - 1) * 7 - jan1.getDay() + 1;
  const start = new Date(year, 0, 1 + daysOffset);
  const end = new Date(start);
  end.setDate(end.getDate() + 4);
  return { start, end };
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().split("T")[0];
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString();
}

export function formatWorkWeek(year: number, week: number): string {
  return `WW${week.toString().padStart(2, "0")} ${year}`;
}
