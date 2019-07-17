const express = require("express");
const route = express.Router();
const {postBus} = require("../../controller/busController");
const {authenticate} = require("../../middleware/authenticate");

route.post("/", authenticate, postBus);
route.get("/", authenticate, postBus);

export default route;

