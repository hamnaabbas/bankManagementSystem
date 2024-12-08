const { generateToken } = require("../../utils/tokenUtils");
const User = require("../../models/customer/userModel");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Authenticate user (e.g., check if user exists and password matches)
    const user = await User.findOne({ email });
    if (!user || !user.verifyPassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a token
    const token = generateToken(user);

    // Respond with the token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
