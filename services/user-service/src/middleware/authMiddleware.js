const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);
    console.log(
      "JWT SECRET:",
      process.env.JWT_SECRET
    );

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;