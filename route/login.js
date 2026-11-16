import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../schema/Schema.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        msg: "email and password required",
      });
      return;
    }

    const findUser = await User.findOne({ username: username });
    if (!findUser) {
      res.status(404).json({
        msg: "username or password wrong",
      });
      return;
    }

    const compare = await bcrypt.compare(password, findUser.password);
    if (!compare) {
      res.status(403).json({
        msg: "forbidden",
      });
      return;
    }

    const createJWT = jwt.sign(
      {
        userInfo: {
          username: username,
          email: findUser.email,
          id: findUser._id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "60s" },
    );

    const refreshJWT = jwt.sign(
      {
        userInfo: {
          username: username,
          email: findUser.email,
          id: findUser._id,
        },
      },
      process.env.JWT_VERIFY,
      { expiresIn: "1d" },
    );

    await User.updateOne(
      { _id: findUser._id },
      { $set: { refreshToken: refreshJWT } },
    );

    res.cookie("jwt", refreshJWT, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      msg: "succes to logIn",
      jwt: createJWT,
      user: findUser.username,
      id: findUser._id,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
