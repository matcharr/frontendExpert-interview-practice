function throttle(callback, delay) {
  let lastCall = 0;
  let timeoutID = null;

  const invokeFunction = (context, ...args) => {
    lastCall = Date.now();
    timeoutID = null;
    return callback.apply(context, args);
  };

  const throttled = function (...args) {
    const now = Date.now();
    const timeElapsed = now - lastCall;

    if (timeElapsed < delay) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(
        () => invokeFunction(this, ...args),
        delay - timeElapsed
      );
      return;
    }

    return invokeFunction(this, ...args);
  };

  throttled.cancel = function () {
    clearTimeout(timeoutID);
    timeoutID = null;
  };

  return throttled;
}

// Do not edit the line below.
exports.throttle = throttle;
