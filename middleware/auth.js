const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      msg: "No Token authorization denied",
    });
  }

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);

    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token is not valid",
    });
  }
};
