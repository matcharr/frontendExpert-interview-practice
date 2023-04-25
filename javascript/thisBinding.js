Function.prototype.myCall = function (thisContext, ...args) {
  const uniqueId = Symbol("temp");
  thisContext[uniqueId] = this;

  const result = thisContext[uniqueId](...args);

  delete thisContext[uniqueId];

  return result;
};

Function.prototype.myApply = function (thisContext, args = []) {
  return this.myCall(thisContext, ...args);
};

Function.prototype.myBind = function (thisContext, ...args) {
  const originalFunction = this;

  return function (...newArgs) {
    return originalFunction.myCall(thisContext, ...args, ...newArgs);
  };
};
