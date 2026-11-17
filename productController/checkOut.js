import Cart from "../schema/cartSchema.js";
import Order from "../schema/orderSchema.js";

export const checkOut = async (req, res) => {
  try {
    const name = req.user.username;

    const cart = await Cart.find({ username: name }).populate("product");

    if (cart.length === 0) {
      res.status(400).json({
        msg: "cart is empty",
      });
      return;
    }

    let totalPrice = 0;
    const order = [];

    for (const item of cart) {
      const product = item.product;

      if (product.stock < 1) {
        res.status(400).json({
          msg: "low stock",
        });
        return;
      }

      totalPrice += product.price;
      order.push({
        product: product._id,
        price: product.price,
      });

      product.stock -= 1;
      await product.save();
    }

    const newOrder = await Order.create({
      buyer: req.user.id,
      item: order,
      total: totalPrice,
    });

    await Cart.deleteMany({ username: name });

    res.status(200).json({
      msg: "succes to order",
      order_id: newOrder.id,
      total: totalPrice,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
