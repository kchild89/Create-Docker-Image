const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ errorMessage: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ errorMessage: "Invalid token" });
  }
};

module.exports = { verifyToken };
