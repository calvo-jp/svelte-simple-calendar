import { chunk } from './chunk.js';

test('chunk', () => {
  const array = [1, 2, 3, 4, 5];
  const result = chunk(array, 2);
  expect(result).toEqual([[1, 2], [3, 4], [5]]);
});
