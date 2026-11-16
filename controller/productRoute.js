import express from "express";
const prd = express();
import { verifyJwt } from "../middleware/jwtVerify.js";
import { getAllProduct } from "../productController/getAllProduct.js";
import { filterProduct } from "../productController/filter.js";
import { addProduct } from "../productController/addProduct.js";
import { addToCart } from "../productController/addToCart.js";
import { displayCart } from "../productController/cartDisplay.js";
import { checkOut } from "../productController/checkOut.js";

prd.get("/getAll", getAllProduct);
prd.get("/filter", filterProduct);

prd.use(verifyJwt);
prd.post("/addProduct", addProduct);
prd.post("/addToCart", addToCart);
prd.get("/cart", displayCart);
prd.post("/checkOut", checkOut);

export default prd;
