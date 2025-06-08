const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ error: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token inválido' });

  jwt.verify(token, process.env.JWT_SECRET || "claveSecreta", (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token no válido' });
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
