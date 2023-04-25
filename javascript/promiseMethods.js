Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    let settled = false;

    for (const promise of promises) {
      promise
        .then((value) => {
          if (!settled) {
            settled = true;
            resolve(value);
          }
        })
        .catch((error) => {
          if (!settled) {
            settled = true;
            reject(error);
          }
        });
    }
  });
};

Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let remainingPromises = promises.length;
    let rejectionErrors = [];

    if (remainingPromises === 0) {
      reject(new AggregateError("All promises were rejected.", []));
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          if (remainingPromises > 0) {
            remainingPromises = 0;
            resolve(value);
          }
        })
        .catch((error) => {
          rejectionErrors[index] = error;
          remainingPromises--;

          if (remainingPromises === 0) {
            reject("all promises rejected");
          }
        });
    });
  });
};

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let remainingPromises = promises.length;
    let resolveValues = Array(remainingPromises);

    if (remainingPromises === 0) {
      resolve(resolveValues);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          resolveValues[index] = value;
          remainingPromises--;

          if (remainingPromises === 0) {
            resolve(resolveValues);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    let remainingPromises = promises.length;
    let settledResults = Array(remainingPromises);

    if (remainingPromises === 0) {
      resolve(settledResults);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          settledResults[index] = { status: "fulfilled", value: value };
          remainingPromises--;

          if (remainingPromises === 0) {
            resolve(settledResults);
          }
        })
        .catch((error) => {
          settledResults[index] = { status: "rejected", error: error };
          remainingPromises--;

          if (remainingPromises === 0) {
            resolve(settledResults);
          }
        });
    });
  });
};
