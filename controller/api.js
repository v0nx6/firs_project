import { SignIn } from "../route/SignIn.js";
import express from "express";
import { SignUp } from "../route/SignUp.js";
import { updateUser } from "../route/updateUser.js";
import { deleteData } from "../route/deleteData.js";
import { refreshToken } from "../auth/refreshToken.js";
import { verifyJwt } from "../middleware/jwtVerify.js";
import { getData } from "../route/getData.js";
import { logout } from "../route/logOut.js";
const api = express();
api.disable("X-Powered-By:");

api.post("/SignIn", SignIn);
api.post("/SignUp", SignUp);
api.get("/refresh/:id", refreshToken);

api.use(verifyJwt);
api.put("/update/:id", updateUser);
api.delete("/delete/:id", deleteData);
api.get("/getData/", getData);
api.post("/logOut", logout);

export default api;
