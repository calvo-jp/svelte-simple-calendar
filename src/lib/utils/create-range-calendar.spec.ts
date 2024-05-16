import { createRangeCalendar } from './create-range-calendar.js';

test('createRangeCalendar', () => {
  const calendars = createRangeCalendar(new Date());

  expect(calendars).toEqual(expect.any(Array));
  expect(calendars.length).toBe(2);
  expect(calendars[0]).toEqual(
    expect.objectContaining({
      year: expect.any(Number),
      month: expect.any(String),
      weeks: expect.any(Array),
      weekdays: expect.any(Array),
      dates: expect.any(Array),
    }),
  );
  expect(calendars[1]).toEqual(
    expect.objectContaining({
      year: expect.any(Number),
      month: expect.any(String),
      weeks: expect.any(Array),
      weekdays: expect.any(Array),
      dates: expect.any(Array),
    }),
  );
});
