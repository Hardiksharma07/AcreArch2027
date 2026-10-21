const express = require('express');
const { login, session } = require('../controllers/authController');
const { protectAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/login', login);
router.get('/session', protectAdmin, session);
module.exports = router;
