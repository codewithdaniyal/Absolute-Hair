import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isToday, isTomorrow, parse, addDays } from 'date-fns';
import { Salon } from '../types/database';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `£${price.toFixed(0)}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} mins`;
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (mins === 0) {
    return hours === 1 ? '1 hr' : `${hours} hrs`;
  }
  
  return hours === 1 
    ? `1 hr ${mins} mins` 
    : `${hours} hrs ${mins} mins`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, 'EEEE, d MMMM');
}

export function formatTime(timeString: string): string {
  try {
    const time = parse(timeString, 'HH:mm', new Date());
    return format(time, 'h:mm a');
  } catch {
    return timeString;
  }
}

export function getDayStatus(salon: Salon, date: Date = new Date()): 'open' | 'closed' | 'today' | 'tomorrow' {
  const dayName = format(date, 'EEEE').toLowerCase() as keyof typeof salon.hours;
  const hours = salon.hours[dayName];
  
  if (!hours) {
    return 'closed';
  }
  
  if (isToday(date)) {
    return 'today';
  }
  
  if (isTomorrow(date)) {
    return 'tomorrow';
  }
  
  return 'open';
}

export function getOpenHoursLabel(salon: Salon): string {
  const today = new Date();
  const todayName = format(today, 'EEEE').toLowerCase() as keyof typeof salon.hours;
  const todayHours = salon.hours[todayName];
  
  if (todayHours) {
    const [open, close] = todayHours.split('-');
    return `Open Today: ${formatTime(open)} – ${formatTime(close)}`;
  }
  
  // Find next open day
  for (let i = 1; i <= 7; i++) {
    const nextDay = addDays(today, i);
    const dayName = format(nextDay, 'EEEE').toLowerCase() as keyof typeof salon.hours;
    const hours = salon.hours[dayName];
    
    if (hours) {
      const [open, close] = hours.split('-');
      const label = i === 1 ? 'Tomorrow' : format(nextDay, 'EEEE');
      return `Open ${label}: ${formatTime(open)} – ${formatTime(close)}`;
    }
  }
  
  return 'Closed';
}

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number,
  interval: number = 30
): string[] {
  const slots: string[] = [];
  const start = parse(startTime, 'HH:mm', new Date());
  const end = parse(endTime, 'HH:mm', new Date());
  
  let current = start;
  
  while (current < end) {
    const slotEnd = new Date(current.getTime() + duration * 60000);
    if (slotEnd <= end) {
      slots.push(format(current, 'HH:mm'));
    }
    current = new Date(current.getTime() + interval * 60000);
  }
  
  return slots;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
