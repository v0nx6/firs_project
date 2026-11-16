import Product from "../schema/productSchema.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
      res.status(400).json({
        msg: "name, price and stock required",
      });
      return;
    }

    const userId = req.user.id;

    const checkProduct = await Product.findOne({
      name: name,
      seller: userId,
    });

    if (checkProduct) {
      res.status(409).json({
        msg: "cannot create double product",
      });
      return;
    }

    await Product.create({
      name: name,
      price: price,
      stock: stock,
      seller: userId,
    });

    res.status(201).json({
      msg: "succes to add product",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
