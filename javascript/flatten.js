function flatten(value) {
    function flattenArray(array) {
      return array.reduce((acc, item) => {
        if (Array.isArray(item)) {
          return acc.concat(flattenArray(item));
        } else if (typeof item === 'object' && item !== null) {
          return acc.concat(flattenObject(item));
        } else {
          return acc.concat(item);
        }
      }, []);
    }
  
    function flattenObject(obj) {
      return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key];
        if (Array.isArray(value)) {
          acc[key] = flattenArray(value);
        } else if (typeof value === 'object' && value !== null) {
          const flattened = flattenObject(value);
          Object.assign(acc, flattened);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
    }
  
    if (Array.isArray(value)) {
      return flattenArray(value);
    } else if (typeof value === 'object' && value !== null) {
      return flattenObject(value);
    } else {
      return value;
    }
  }
  
  // Do not edit the line below.
  exports.flatten = flatten;
  