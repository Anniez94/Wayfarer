import express from "express";
import {postUser} from "../../controller/userController";
const route = express.Router();

route.post("/", postUser);

export default route;

