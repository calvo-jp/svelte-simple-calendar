export type Weekday =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export interface CalendarDate {
  value: Date;
  isToday: boolean;
  isDisabled: boolean;
  isPlaceholder: boolean;
  isNextMonthDate: boolean;
  isPreviousMonthDate: boolean;
}

export type Week = CalendarDate[];

export interface ICalendar {
  year: number;
  month: number;
  weeks: Week[];
  days: string[];
}

export interface DateRange {
  from: Date;
  to: Date;
  dates: Date[];
}
