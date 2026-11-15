import User from "../controller/Schema.js";

export const deleteData = async (req, res) => {
  try {
    const userId = await User.deleteOne({ _id: req.user.id });

    if (userId.deleteCount === 0) {
      res.status(404).json({
        msg: "user not found",
      });
    }
    res.status(200).json({
      msg: "succes to delete user",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
