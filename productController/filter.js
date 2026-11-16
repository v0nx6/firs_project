import Product from "../schema/productSchema.js";

export const filterProduct = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({
        msg: "name query required",
      });
      return;
    }

    const filterResult = await Product.find({ name: name }).populate(
      "seller",
      "username",
    );
    if (filterResult.length > 0) {
      res.status(200).json({
        total: filterResult.length,
        data: filterResult,
      });
    } else {
      res.status(404).json({
        msg: "product not found",
      });
      return;
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
