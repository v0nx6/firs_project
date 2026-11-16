import Cart from "../schema/cartSchema.js";
import Product from "../schema/productSchema.js";

export const addToCart = async (req, res) => {
  try {
    const { name, sellerID } = req.body;

    if (!name) {
      res.status(400).json({
        msg: "name required",
      });
      return;
    }

    const findProduct = await Product.findOne({
      $and: [{ name: name, seller: sellerID }],
    });

    if (!findProduct) {
      res.status(404).json({
        msg: "product not found",
      });
      return;
    }

    await Cart.create({
      username: req.user.username,
      product: findProduct._id,
      price: findProduct.price,
      seller: findProduct.seller,
    });

    res.status(201).json({
      msg: "succes to add product",
      "product name": findProduct.name,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
