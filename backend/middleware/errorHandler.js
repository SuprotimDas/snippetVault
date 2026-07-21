const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err.stack);

  if (err.name === 'CastError') {
    return res.status(404).json({ success: false, error: 'Resource not found specifier error.' });
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ success: false, error: message.join(', ') });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error Architecture Breakdown'
  });
};

module.exports = errorHandler;