import User from "../schema/Schema.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userId = req.user.id;
    const updateData = {};

    if (username) {
      updateData.username = username;
    }

    if (email) {
      updateData.email = email;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const result = await User.updateOne({ _id: userId }, { $set: updateData });

    if (result.matchedCount === 0) {
      res.status(404).json({
        msg: "user not found",
      });
      return;
    }

    res.status(201).json({
      msg: "succes to update data",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
