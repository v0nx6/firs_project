import User from "../controller/Schema.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const getData = async (req, res) => {
  try {
    const reqToken = req.headers.Authorization || req.headers.authorization;

    if (!reqToken) {
      res.status(403).josn({
        msg: "token required",
      });
      return;
    }

    const token = reqToken.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.status(403).json({
          msg: "debug",
        });
        return;
      }
      const userId = decode.userInfo.id;

      const findUser = await User.findOne({ _id: userId });

      if (!findUser) {
        res.status(403).json({
          msg: "user not found",
        });
        return;
      }

      res.status(200).json({
        username: findUser.username,
        id: findUser._id,
        email: findUser.email,
      });
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
