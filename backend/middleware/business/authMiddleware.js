//businesspayroll
//businessloan
const { verifyToken } = require("../../utils/tokenUtils");

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authenticationMiddleware;


//analytics

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyToken(token); 
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};

//businessAcount
exports.authenticate1 = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Authentication token is required" });

    const user = verifyToken(token);
    if (!user) return res.status(401).json({ error: "Invalid token" });

    req.user = user; // Attach the user to the request
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};


//invoice
//request
//rolepermission
const authenticationMiddleware1 = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
};

module.exports = authenticationMiddleware1;
