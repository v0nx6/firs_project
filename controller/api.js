import { SignIn } from "../route/SignIn.js";
import express from "express";
import { SignUp } from "../route/SignUp.js";
import { updateUser } from "../route/updateUser.js";
import { deleteData } from "../route/deleteData.js";
const api = express();

api.post("/SignIn", SignIn);
api.post("/SignUp", SignUp);
api.put("/update/:id", updateUser);
api.delete("/delete/:id", deleteData);

export default api;
