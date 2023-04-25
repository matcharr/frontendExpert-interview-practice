function deepEquals(valueOne, valueTwo) {
  if (Object.is(valueOne, valueTwo)) {
    return true;
  }

  if (typeof valueOne !== typeof valueTwo) {
    return false;
  }

  if (valueOne !== null && valueTwo !== null && typeof valueOne === "object") {
    if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
      if (valueOne.length !== valueTwo.length) {
        return false;
      }

      for (let i = 0; i < valueOne.length; i++) {
        if (!deepEquals(valueOne[i], valueTwo[i])) {
          return false;
        }
      }
    } else if (!Array.isArray(valueOne) && !Array.isArray(valueTwo)) {
      const keysOne = Object.keys(valueOne);
      const keysTwo = Object.keys(valueTwo);

      if (keysOne.length !== keysTwo.length) {
        return false;
      }

      for (let i = 0; i < keysOne.length; i++) {
        if (
          !keysTwo.includes(keysOne[i]) ||
          !deepEquals(valueOne[keysOne[i]], valueTwo[keysOne[i]])
        ) {
          return false;
        }
      }
    } else {
      return false;
    }
  } else {
    return false;
  }

  return true;
}

// Do not edit the line below.
exports.deepEquals = deepEquals;
