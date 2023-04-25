function debounce(callback, delay, immediate = false) {
  let timerID;

  return function (...args) {
    clearTimeout(timerID);

    const shouldCallImmediately = timerID == null && immediate;
    if (shouldCallImmediately) {
      callback.apply(this, args);
    }

    timerID = setTimeout(() => {
      if (!immediate) {
        callback.apply(this, args);
      }
      timerID = null;
    }, delay);
  };
}

// Do not edit the line below.
exports.debounce = debounce;
