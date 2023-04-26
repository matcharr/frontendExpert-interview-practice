class MyPromise {
  constructor(executorFunc) {
    this._state = "pending";
    this._value = null;
    this._fulfilledHandlers = [];
    this._rejectedHandlers = [];

    try {
      executorFunc(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        if (typeof onFulfilled === "function") {
          queueMicrotask(() => {
            try {
              const result = onFulfilled(value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        } else {
          resolve(value);
        }
      };

      const handleRejected = (value) => {
        if (typeof onRejected === "function") {
          queueMicrotask(() => {
            try {
              const result = onRejected(value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        } else {
          reject(value);
        }
      };

      if (this._state === "pending") {
        this._fulfilledHandlers.push(handleFulfilled);
        this._rejectedHandlers.push(handleRejected);
      } else if (this._state === "fulfilled") {
        handleFulfilled(this._value);
      } else if (this._state === "rejected") {
        handleRejected(this._value);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  resolve(value) {
    if (this._state === "pending") {
      this._state = "fulfilled";
      this._value = value;
      this._fulfilledHandlers.forEach((handler) =>
        queueMicrotask(() => handler(value))
      );
      this._fulfilledHandlers = [];
    }
  }

  reject(value) {
    if (this._state === "pending") {
      this._state = "rejected";
      this._value = value;
      this._rejectedHandlers.forEach((handler) =>
        queueMicrotask(() => handler(value))
      );
      this._rejectedHandlers = [];
    }
  }

  get state() {
    return this._state;
  }

  get value() {
    return this._value;
  }
}

// Do not edit the line below.
exports.MyPromise = MyPromise;
