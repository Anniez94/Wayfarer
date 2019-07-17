import express from "express";
import {postTrip, getAllTrips, deleteTrip} from "../../controller/tripController";
import {authenticate} from "../../middleware/authenticate";
const route = express.Router();

route.get("/", authenticate , getAllTrips);
route.get("/:id", authenticate, deleteTrip)
route.post("/", authenticate, postTrip);

export default route;

