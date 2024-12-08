//businessacount
//businesspayroll
//businessloan
//invocie
//request
//rolepermission
const authorizeRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: Insufficient privileges." });
    }
    next();
  };
  
  