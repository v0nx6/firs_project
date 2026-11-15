import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyJwt = async (req, res, next) => {
  try {
    const tokenReq = req.headers.Authorization || req.headers.authorization;

    if (!tokenReq?.startsWith("Bearer")) {
      res.status(403).json({
        msg: "debug",
      });
      return;
    }

    const token = tokenReq.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.status(403).json({
          msg: "Forbidden",
        });
        return;
      }
    });

    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
