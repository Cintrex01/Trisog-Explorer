import { Router } from "express";

import { createTour, getTours, updateTour, deleteTour } from "../controllers/tours";

const router = Router();

router.post("/", createTour);

router.get("/", getTours);

router.patch("/:id", updateTour);

router.delete("/:id", deleteTour);

export default router;

