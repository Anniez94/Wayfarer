import express from "express";
const route = express.Router();
import {postLogin} from "../../controller/authController";

route.post("/", postLogin);

export default route;

