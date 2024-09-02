import { RequestHandler } from "express";

import Tour, {TourModel} from "../models/tours";


export const createTour: RequestHandler = async (req, res, next) => {
    const data: TourModel = req.body;
    try {
        const tour = await Tour.create(data);
        res.status(201).json({ message: "Tour created successfully!", data: tour });
    } catch (error) {
        next(error);
    }
};


export const getTours: RequestHandler = async (req, res, next) => {
    try {
        const tours = await Tour.find();
        res.status(200).json({ data: tours });
    } catch (error) {
        next(error);
    }
};

export const getTourById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        const tour = await Tour.findById(id);
        if (!tour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json({ data: tour });
    } catch (error) {
        next(error);
    }
};


export const updateTour: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json({ message: "Tour updated successfully!", data: updatedTour });
    } catch (error) {
        next(error);
    }
};


export const deleteTour: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedTour = await Tour.findByIdAndDelete(id);
        if (!deletedTour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json({ message: "Tour deleted successfully!" });
    } catch (error) {
        next(error);
    }
};

export const addReview: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, comment, servicesGrade, locationsGrade, amenitiesGrade, roomGrade, pricesGrade } = req.body;

    try {
        const tour = await Tour.findById(id);
        if (!tour) {
            return res.status(404).json({ message: "Tour not found" });
        }

        
        const servicesGradeNum = parseInt(servicesGrade, 10);
        const locationsGradeNum = parseInt(locationsGrade, 10);
        const amenitiesGradeNum = parseInt(amenitiesGrade, 10);
        const roomGradeNum = parseInt(roomGrade, 10);
        const pricesGradeNum = parseInt(pricesGrade, 10);

        
        const totalGrade = Math.round((servicesGradeNum + locationsGradeNum + amenitiesGradeNum + roomGradeNum + pricesGradeNum) / 5);

        const newReview = {
            name,
            email,
            comment,
            servicesGrade: servicesGradeNum,
            locationsGrade: locationsGradeNum,
            amenitiesGrade: amenitiesGradeNum,
            roomGrade: roomGradeNum,
            pricesGrade: pricesGradeNum,
            totalGrade,
            date: new Date(),
        };

        tour.reviews.push(newReview); 

        tour.reviewNumber = tour.reviews.length;

        const gradesSum = tour.reviews.reduce((acc, review) => acc + review.totalGrade, 0);
        tour.grade = Math.round(gradesSum / tour.reviewNumber);

        await tour.save();

        res.status(201).json({ message: "Review added successfully!", data: tour });
    } catch (error) {
        next(error);
    }
};

export const getReviewsByTourId: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        const tour = await Tour.findById(id);
        if (!tour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json({ reviews: tour.reviews });
    } catch (error) {
        next(error);
    }
};