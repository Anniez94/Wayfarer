import express from "express";
import {postBus, getAllBuses} from "../../controller/busController";
import {authenticate} from "../../middleware/authenticate";
const route = express.Router();

route.post("/", authenticate, postBus);
route.get("/", authenticate, getAllBuses);

export default route;

