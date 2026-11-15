import User from "../controller/Schema.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const logout = async (req, res) => {
  try {
    const tokenReq = req.headers.Authorization || req.headers.authorization;
    if (!tokenReq) {
      res.status(400).json({
        msg: "token required",
      });
      return;
    }

    const token = tokenReq.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.status(403).json({
          msg: "forbidden",
        });
        return;
      }

      const userId = decode.userInfo.id;

      const findUser = await User.findOne({ _id: userId });

      if (!findUser) {
        res.status(404).json({
          msg: "user not found",
        });
        return;
      }

      await User.updateOne(
        { _id: findUser.id },
        { $set: { refreshToken: null } },
      );
    });

    res.status(200).json({
      msg: "logout success",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
