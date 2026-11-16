import { register } from "../route/register.js";
import express from "express";
import { login } from "../route/login.js";
import { refreshToken } from "../auth/refreshToken.js";
const api = express();

api.post("/register", register);
api.post("/login", login);
api.get("/refresh/", refreshToken);

export default api;
