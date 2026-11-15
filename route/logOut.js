import User from "../controller/Schema.js";
import "dotenv/config";

export const logout = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user.id },
      { $set: { refreshToken: null } },
    );
    res.clearCookie("jwt");
    res.status(200).json({
      msg: "logout success",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
