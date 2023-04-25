function memoize(callback, resolver) {
  const cache = new Map();

  function memoized(...args) {
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = callback(...args);
    cache.set(key, result);
    return result;
  }

  memoized.clear = function () {
    cache.clear();
  };

  memoized.delete = function (...args) {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    cache.delete(key);
  };

  memoized.has = function (...args) {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    return cache.has(key);
  };

  return memoized;
}

// Do not edit the line below.
exports.memoize = memoize;
