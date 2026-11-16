import Product from "../schema/productSchema.js";

export const getAllProduct = async (req, res) => {
  try {
    const getAll = await Product.find().populate("seller", "username");

    res.status(200).json({
      total: getAll.length,
      data: getAll,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
