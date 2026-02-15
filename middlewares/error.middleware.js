export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Email already exists',
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};
