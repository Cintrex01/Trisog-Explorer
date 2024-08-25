import { RequestHandler } from "express";

import Tour, {TourModel} from "../models/tours";

// Criar um novo tour
export const createTour: RequestHandler = async (req, res, next) => {
    const data: TourModel = req.body;
    try {
        const tour = await Tour.create(data);
        res.status(201).json({ message: "Tour created successfully!", data: tour });
    } catch (error) {
        next(error);
    }
};

// Obter todos os tours
export const getTours: RequestHandler = async (req, res, next) => {
    try {
        const tours = await Tour.find();
        res.status(200).json({ data: tours });
    } catch (error) {
        next(error);
    }
};

// Atualizar um tour por ID
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

// Deletar um tour por ID
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