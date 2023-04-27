function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (typeof delay === "number") {
      const id = setInterval(tick, delay);

      // Clear interval if the component is unmounted or the delay changes.
      return () => clearInterval(id);
    }
  }, [delay]);
}

// Do not edit the line below.
exports.useInterval = useInterval;
