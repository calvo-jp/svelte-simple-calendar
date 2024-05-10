export type Weekday =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export interface Day {
  date: Date;
  isToday: boolean;
  isDisabled: boolean;
  isPlaceholder: boolean;
  isNextMonthDate: boolean;
  isPreviousMonthDate: boolean;
}

export type Week = Day[];

export interface Calendar {
  year: number;
  month: number;
  weeks: Week[];
  weekdays: string[];
}

export interface DateRange {
  from: Date;
  to: Date;
  dates: Date[];
}
