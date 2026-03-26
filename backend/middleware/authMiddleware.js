const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!['admin', 'manager'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Admin/Manager only.' });
  }
  next();
};

const managerMiddleware = (req, res, next) => {
  if (!['admin', 'manager', 'supervisor'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Manager/Supervisor access required.' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware, managerMiddleware };
