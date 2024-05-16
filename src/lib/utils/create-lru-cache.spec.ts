import { createLruCache } from './create-lru-cache.js';

const cache = createLruCache<unknown, number>(1024);

test('createLruCache', () => {
  function add(...numbers: number[]) {
    let sum = cache.get(numbers);

    if (sum) {
      console.log('Cache Hit');
      return sum;
    } else {
      console.log('Cache Miss');
    }

    sum = numbers.reduce((acc, num) => acc + num, 0);
    cache.set(numbers, sum);
    return sum;
  }

  vi.spyOn(console, 'log');
  add(1, 2, 3);
  expect(console.log).toHaveBeenCalledWith('Cache Miss');
  add(1, 2, 3);
  expect(console.log).not.toHaveBeenCalledWith('Cache Hit');
});
