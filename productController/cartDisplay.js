import Cart from "../schema/cartSchema.js";

export const displayCart = async (req, res) => {
  try {
    const user = req.user.username;

    const allCart = await Cart.find({ username: user })
      .populate("product", "name price")
      .populate("seller", "username");

    if (allCart.length <= 0) {
      res.status(404).json({
        msg: "cart is empty",
      });
      return;
    }

    const total = allCart.reduce((previous, current) => {
      return previous + current.price;
    }, 0);

    res.status(200).json({
      person: user,
      total_price: total,
      total: allCart.length,
      data: allCart,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
