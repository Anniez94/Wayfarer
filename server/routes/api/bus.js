const express = require("express");
const route = express.Router();
const {postBus, getAllBuses} = require("../../controller/busController");
const {authenticate} = require("../../middleware/authenticate");

route.post("/", authenticate, postBus);
route.get("/", authenticate, getAllBuses);

export default route;

