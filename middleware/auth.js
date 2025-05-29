const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ error: 'Invalid token' });
  }
}

function checkRole(requiredRole) {
  return function (req, res, next) {
    if (req.user && req.user.role === requiredRole) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  };
}

module.exports = { auth, checkRole };
