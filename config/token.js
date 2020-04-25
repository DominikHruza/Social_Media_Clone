const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token
  const token = req.header('x-auth-token');
  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, 'mypracticejwttokengenerate');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
