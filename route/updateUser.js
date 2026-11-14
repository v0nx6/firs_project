import User from "../controller/Schema.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userId = req.params.id;
    const updateUser = await User.findById(userId);

    if (!updateUser) {
      res.status(404).json({
        msg: "not found",
      });
      return;
    }

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

    await User.updateOne({ _id: userId }, { $set: updateData });

    res.status(201).json({
      msg: "succes to update data",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
