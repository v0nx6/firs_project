import Product from "../schema/productSchema.js";

export const filterProduct = async (req, res) => {
  try {
    const { name } = req.body;

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
    }
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};
