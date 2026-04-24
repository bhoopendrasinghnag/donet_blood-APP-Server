import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "AUTH_HEADER_MISSING",
        message: "Authorization header is missing"
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "INVALID_TOKEN_FORMAT",
        message: "Token must be in format: Bearer <token>"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "TOKEN_MISSING",
        message: "Token not found"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(decoded);
    // console.log(req.user);
    next();

  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "TOKEN_EXPIRED",
        message: "Session expired, please login again"
      });
    }

    return res.status(401).json({
      success: false,
      error: "INVALID_TOKEN",
      message: "Invalid authentication token"
    });
  }
};

export default authMiddleware;