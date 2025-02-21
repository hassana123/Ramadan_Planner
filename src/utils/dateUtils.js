import { format, isAfter, isBefore, startOfDay, differenceInDays } from 'date-fns';

export const RAMADAN_START_DATE = startOfDay(new Date('2025-03-01'));
export const RAMADAN_END_DATE = startOfDay(new Date('2025-03-30')); // Adjusted for February

export function getCurrentRamadanDay() {
  const today = startOfDay(new Date());
  const startDay = RAMADAN_START_DATE;
  
  // If today is before Ramadan, return 0
  if (isBefore(today, startDay)) {
    return 0;
  }
  
  // If today is after Ramadan, return 30
  if (isAfter(today, RAMADAN_END_DATE)) {
    return 30;
  }
  
  // Ensure accurate day calculation
  const diffDays = differenceInDays(today, startDay) + 1;
  return Math.min(diffDays, 30);
}

export function isRamadanStarted() {
  const today = startOfDay(new Date());
  return !isBefore(today, RAMADAN_START_DATE);
}

export function getDaysProgress() {
  const currentDay = getCurrentRamadanDay();
  return Array.from({ length: 30 }, (_, index) => ({
    day: index + 1,
    isAccessible: index < currentDay,
    isCurrent: index + 1 === currentDay,
  }));
}


