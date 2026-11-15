import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyJwt = (req, res, next) => {
  const tokenReq = req.headers.Authorization || req.headers.authorization;

  if (!tokenReq?.startsWith("Bearer ")) {
    res.status(403).json({
      msg: "Forbidden",
    });
    return;
  }

  const token = tokenReq.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.userInfo;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "invalid token",
    });
  }
};
