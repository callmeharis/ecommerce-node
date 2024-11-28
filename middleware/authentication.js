const { UnauthenticatedError } = require("../errors");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    // Attach the user details to req.user
    req.user = {
      userId: user._id,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
