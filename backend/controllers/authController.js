const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function safeEqual(value, expected) {
  const left = Buffer.from(String(value || ''));
  const right = Buffer.from(String(expected || ''));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function login(req, res) {
  const { adminId, password } = req.body || {};
  if (!adminId || !password) return res.status(400).json({ success: false, message: 'Admin ID and password are required' });
  if (!safeEqual(adminId, process.env.ADMIN_ID) || !safeEqual(password, process.env.ADMIN_PASSWORD)) {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }
  const token = jwt.sign({ sub: adminId, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h', issuer: 'acrearch-api' });
  res.json({ success: true, data: { token, admin: { id: adminId } } });
}

function session(req, res) {
  res.json({ success: true, data: { admin: { id: req.admin.sub } } });
}

module.exports = { login, session };
