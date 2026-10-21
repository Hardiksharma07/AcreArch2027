const jwt = require('jsonwebtoken');

function protectAdmin(req, res, next) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) return res.status(401).json({ success: false, message: 'Admin authentication required' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { issuer: 'acrearch-api' });
    if (payload.role !== 'admin') throw new Error('Invalid role');
    req.admin = payload;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Admin session is invalid or expired' });
  }
}

module.exports = { protectAdmin };
