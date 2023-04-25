import React from "react";

function useMap(initialValue) {
  const [map, setMap] = useState(new Map(initialValue));

  const set = useCallback((key, value) => {
    setMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(key, value);
      return newMap;
    });
  }, []);

  const del = useCallback((key) => {
    setMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const clear = useCallback(() => {
    setMap(new Map());
  }, []);

  return {
    map,
    set,
    delete: del,
    clear,
  };
}

// Do not edit the line below.
exports.useMap = useMap;
