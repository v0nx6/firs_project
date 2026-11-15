import User from "../controller/Schema.js";
import "dotenv/config";

export const getData = async (req, res) => {
  try {
    const findUser = await User.findById(req.user.id);

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
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
