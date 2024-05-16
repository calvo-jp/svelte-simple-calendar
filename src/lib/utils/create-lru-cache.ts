/* Credits: https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js */

export function createLruCache<Key, Value>(maxCacheSize: number) {
  if (maxCacheSize < 1) {
    return {
      get: () => undefined,
      set: () => {},
    };
  }

  let cacheSize = 0;
  let cache = new Map<Key, Value>();
  let previousCache = new Map<Key, Value>();

  function update(key: Key, value: Value) {
    cache.set(key, value);
    cacheSize++;

    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = new Map<Key, Value>();
    }
  }

  function get(key: Key) {
    let value: Value | undefined;

    value = cache.get(key);

    if (value !== undefined) {
      return value;
    }

    value = previousCache.get(key);

    if (value !== undefined) {
      update(key, value);
    }

    return value;
  }

  function set(key: Key, value: Value) {
    if (cache.has(key)) {
      cache.set(key, value);
    } else {
      update(key, value);
    }
  }

  return {
    get,
    set,
  };
}
