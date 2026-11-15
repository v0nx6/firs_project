import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../controller/Schema.js";

export const refreshToken = async (req, res) => {
  try {
    const cookie = req.cookies?.jwt;

    if (!cookie) {
      res.status(401).json({
        msg: "refresh token required",
      });
      return;
    }

    let decode;
    try {
      decode = jwt.verify(cookie, process.env.JWT_VERIFY);
    } catch (error) {
      return res.status(401).json({
        msg: "invalid refresh token",
      });
    }

    const findUser = await User.findById(decode.userInfo.id);

    if (!findUser) {
      res.status(403).json({
        msg: "Forbidden",
      });
      return;
    }

    if (findUser.refreshToken !== cookie) {
      res.status(401).json({
        msg: "invalid token",
      });
      return;
    }

    const createJWT = jwt.sign(
      {
        userInfo: {
          id: findUser._id,
          username: findUser.username,
          email: findUser.email,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "60s" },
    );

    res.status(201).json({
      msg: "succes to refresh Token",
      "new Token": createJWT,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
