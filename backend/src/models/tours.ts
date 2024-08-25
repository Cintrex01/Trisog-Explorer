import * as mongoose from "mongoose";

import { Model } from "mongoose";

type TourType = TourModel & mongoose.Document

export interface Review {
    name:{
        type:string,
        required:true;
    };
    email:{
        type:string,
        required:true;
    };
    comment:{
        type:string,
        required:true;
    };
    servicesGrade:{
        type:number,
        required:true;
    }
    locationsGrade:{
        type:number,
        required:true;
    }
    amenitiesGrade:{
        type:number,
        required:true;
    }
    pricesGrade:{
        type:number,
        required:true;
    }
    roomGrade:{
        type:number,
        required:true;
    }
    totalGrade:{
        type:number,
        required:true;
    }
    date:{
        type:Date,
        required:true;
    }
}

export interface TourModel{

    title:{
        type:string,
        required:true
    };

    place:{
        type:string;
        required:true;
    };

    continent:{
        type:string;
        required:true;
    };

    type:{
        type:string;
        required:true;
    };

    category:{
        type:string,
        required:true;
    };

    grade:{
        type:string,
        required:true;
    };

    reviewNumber:{
        type:number,
        required:true;
    };

    reviews:{
        type:Review[],
        required:true;
    };

    startDay:{
        type:Date,
        required:true;
    };

    duration:{
        type:number,
        required:true;
    };

    price:{
        type:number,
        required:true;
    };

    maxPeople:{
        type:number,
        required:true;
    };

    minAge:{
        type:number,
        required:true;
    };

    image:{
        type:string,
        required:true;
    };
    
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
    image: { type: String, required: true }
});

const Tour: Model<TourType> = mongoose.model<TourType>('Tour', ToursSchema);

export default Tour;
