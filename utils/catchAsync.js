const catchAsync = (fn) => (req, res, next) => {
  // Ensure `fn` is an async function returning a promise
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsync;
