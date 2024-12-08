const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  // Create a JWT token
  const payload = {
    user_id: user._id, 
    role: user.role, // Attach any required user data here
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h', // Set token expiry time as needed
  });

  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
