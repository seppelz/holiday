import { parse, parseISO } from 'date-fns';

/**
 * Parses a date string in YYYY-MM-DD format into a Date object,
 * ensuring consistent behavior across timezones by setting the time to noon UTC.
 * This prevents the date from shifting due to timezone offsets.
 */
export const parseDateString = (dateStr: string): Date => {
  // Parse the date string into a Date object
  const date = parseISO(dateStr);
  
  // Set the time to 12:00:00 UTC to avoid timezone issues
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    12, // noon UTC
    0,
    0,
    0
  ));
};

/**
 * Formats a Date object into a YYYY-MM-DD string
 */
export const formatDateString = (date: Date): string => {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}; 