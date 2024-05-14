export type Alias<T> = T & { _?: never };

export type Weekday =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type Year = Alias<number>;

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
  year: Year;
  month: Month;
  weeks: Week[];
  weekdays: Weekday[];
}

export interface Interval {
  start: Date;
  end: Date;
}
