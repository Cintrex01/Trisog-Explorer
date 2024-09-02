import * as mongoose from "mongoose";

export interface Review {
    name: string;
    email: string;
    comment: string;
    servicesGrade: number;
    locationsGrade: number;
    amenitiesGrade: number;
    pricesGrade: number;
    roomGrade: number;
    totalGrade: number;
    date: Date;
}

export interface TourModel {
    title: string;
    place: string;
    continent: string;
    type: string;
    category: string;
    grade: number;
    reviewNumber: number;
    reviews: Review[]; 
    startDay: Date;
    duration: number;
    price: number;
    maxPeople: number;
    minAge: number;
    image: string;
    description: string;
}

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
    description: {type: String, required: true}
});

const Tour = mongoose.model<TourModel & mongoose.Document>('Tour', ToursSchema);

export default Tour;