function reducer(state, { type, responseJSON, error }) {
  switch (type) {
    case "loading":
      return { ...state, isLoading: true };
    case "success":
      return { responseJSON, isLoading: false, error: null };
    case "error":
      return { responseJSON: null, isLoading: false, error };
    default:
      throw new Error("Unknown action type");
  }
}

function useFetch(url) {
  const [state, dispatch] = useReducer(reducer, {
    responseJSON: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let shouldCancel = false;

    const callFetch = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await fetch(url);
        const newResponseJSON = await response.json();
        if (shouldCancel) return;
        dispatch({ type: "success", responseJSON: newResponseJSON });
      } catch (newError) {
        if (shouldCancel) return;
        dispatch({ type: "error", error: newError });
      }
    };
    callFetch();
    return () => (shouldCancel = true);
  }, [url]);

  return state;
}

// Do not edit the line below.
exports.useFetch = useFetch;
