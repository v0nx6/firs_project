import express from "express";
import { getData } from "../route/getData.js";
import { updateUser } from "../route/updateUser.js";
import { logout } from "../route/logOut.js";
import { deleteData } from "../route/deleteData.js";
import { verifyJwt } from "../middleware/jwtVerify.js";
const user = express();

user.use(verifyJwt);
user.get("/me", getData);
user.put("/update", updateUser);
user.post("/logout", logout);
user.delete("/delete", deleteData);

export default user;
