import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../controller/Schema.js";

export const refreshToken = async (req, res) => {
  try {
    const cookie = req.cookies;
    const userId = req.params.id;

    if (!cookie?.jwt) {
      res.status(403).json({
        msg: "Unauthorized",
      });
      return;
    }

    const findUser = await User.findById({ _id: userId });

    if (!findUser) {
      res.status(403).josn({
        msg: "Forbidden",
      });
      return;
    }

    const token = cookie.jwt;

    jwt.verify(token, process.env.JWT_VERIFY, (err, decode) => {
      if (err || findUser.username !== decode.userInfo.username) {
        res.status(403).json({
          msg: "forbidden",
        });
        return;
      }
    });

    const createJWT = jwt.sign(
      {
        userInfo: {
          username: findUser.username,
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
