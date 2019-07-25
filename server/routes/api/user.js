import express from "express";
import {postUser, getSignup} from "../../controller/userController";
const route = express.Router();

route.post("/", postUser);
route.get("/", getSignup);

export default route;

