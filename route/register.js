import User from "../schema/Schema.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
      res.status(400).json({
        msg: "username and password required!",
      });
      return;
    }

    const findUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (findUser) {
      res.status(409).json({
        msg: "username or email already exist",
      });
      return;
    }

    await User.create({
      username: username,
      email: email,
      password: password,
    });

    res.status(201).json({
      msg: "succes to create user",
      username: username,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
