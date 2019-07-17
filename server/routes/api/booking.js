import express from "express";
import {postBooking, deleteBooking, getBooking} from "../../controller/bookingController";
import {authenticate} from "../../middleware/authenticate";

const route = express.Router();

route.get("/", authenticate, getBooking )
route.post("/", authenticate, postBooking);
route.get("/:id", authenticate, deleteBooking);


export default route;

