import React, { useState, useRef } from "react";

function useStateWithHistory(initialState) {
  const [state, setStateInternal] = useState(initialState);
  const history = useRef([state]);
  const historyIndex = useRef(0);

  const setState = (newState) => {
    history.current.push(newState);
    historyIndex.current = history.current.length - 1;
    setStateInternal(newState);
  };

  const goBack = () => {
    if (historyIndex.current === 0) return;

    historyIndex.current--;
    setStateInternal(history.current[historyIndex.current]);
  };

  const goForward = () => {
    if (historyIndex.current >= history.current.length - 1) return;

    historyIndex.current++;
    setStateInternal(history.current[historyIndex.current]);
  };

  return [state, setState, goBack, goForward, history.current];
}

// Do not edit the line below.
exports.useStateWithHistory = useStateWithHistory;
