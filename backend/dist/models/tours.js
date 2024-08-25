"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const ReviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true },
    servicesGrade: { type: Number, required: true },
    locationsGrade: { type: Number, required: true },
    amenitiesGrade: { type: Number, required: true },
    pricesGrade: { type: Number, required: true },
    roomGrade: { type: Number, required: true },
    totalGrade: { type: Number, required: true },
    date: { type: Date, required: true },
});
const ToursSchema = new mongoose.Schema({
    title: { type: String, required: true },
    place: { type: String, required: true },
    continent: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    grade: { type: Number, required: true },
    reviewNumber: { type: Number, required: true },
    reviews: { type: [ReviewSchema], required: true },
    startDay: { type: Date, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    minAge: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});
const Tour = mongoose.model('Tour', ToursSchema);
exports.default = Tour;
