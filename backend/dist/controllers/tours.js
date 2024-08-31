"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTour = exports.updateTour = exports.getTourById = exports.getTours = exports.createTour = void 0;
const tours_1 = __importDefault(require("../models/tours"));
// Criar um novo tour
const createTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const tour = yield tours_1.default.create(data);
        res.status(201).json({ message: "Tour created successfully!", data: tour });
    }
    catch (error) {
        next(error);
    }
});
exports.createTour = createTour;
// Obter todos os tours
const getTours = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tours = yield tours_1.default.find();
        res.status(200).json({ data: tours });
    }
    catch (error) {
        next(error);
    }
});
exports.getTours = getTours;
// Obter um tour por ID
const getTourById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tour = yield tours_1.default.findById(id);
        if (!tour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json({ data: tour });
    }
    catch (error) {
        next(error);
    }
});
exports.getTourById = getTourById;
// Atualizar um tour por ID
const updateTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedTour = yield tours_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json({ message: "Tour updated successfully!", data: updatedTour });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTour = updateTour;
// Deletar um tour por ID
const deleteTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTour = yield tours_1.default.findByIdAndDelete(id);
        if (!deletedTour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json({ message: "Tour deleted successfully!" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTour = deleteTour;
