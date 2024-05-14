import { cn } from './cn.js';

test('cn', () => {
  expect(cn('class1', '', 'class2', '', null)).toBe('class1 class2');
});
