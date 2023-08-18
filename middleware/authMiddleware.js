require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const tokenWithoutBearer = token.split(" ")[1];

  if (!tokenWithoutBearer) {
    return res.status(401).json({ message: "Login to access the route" });
  }

  jwt.verify(tokenWithoutBearer, jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach the user ID from the token to the request object for later use
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
