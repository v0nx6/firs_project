import User from "../controller/Schema.js";

export const deleteData = async (req, res) => {
  try {
    const userId = req.params.id;

    const findUser = await User.findById(userId);
    if (!findUser) {
      res.status(404).json({
        msg: "not found",
      });
      return;
    }

    await User.deleteOne({ _id: userId });

    res.status(200).json({
      msg: "succes to delete user",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
