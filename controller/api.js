import { SignIn } from "../route/SignIn.js";
import express from "express";
import { SignUp } from "../route/SignUp.js";
import { refreshToken } from "../auth/refreshToken.js";
import { verifyJwt } from "../middleware/jwtVerify.js";
import { addProduct } from "../productController/addProduct.js";
const api = express();

api.post("/SignIn", SignIn);
api.post("/SignUp", SignUp);
api.get("/refresh/", refreshToken);

api.use(verifyJwt);
api.post("/addProduct", addProduct);

export default api;
