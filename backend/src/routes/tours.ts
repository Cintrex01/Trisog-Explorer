import { Router } from "express";

import { createTour, getTours, updateTour, deleteTour,getTourById, addReview, getReviewsByTourId } from "../controllers/tours";

const router = Router();

router.post("/", createTour);

router.get("/", getTours);

router.get("/:id", getTourById);

router.patch("/:id", updateTour);

router.delete("/:id", deleteTour);

router.post("/:id/reviews", addReview);

router.get("/:id/reviews", getReviewsByTourId); 

export default router;

