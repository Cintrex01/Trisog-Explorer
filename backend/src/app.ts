import express from "express";
import cors from "cors";
import db from "mongoose";
import tourRoutes from "./routes/tours";
import {json,urlencoded} from "body-parser";

const app = express();

app.use(cors());

app.use(json());

app.use(urlencoded({extended:true}));

app.use("/tours",tourRoutes);

app.use((err:Error, req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.status(500).json({message:err.message});
});

const mongoUri = "mongodb+srv://lucas:lucas@tours.btu0v.mongodb.net/?retryWrites=true&w=majority&appName=tours";

db.connect(mongoUri)
  .then(() => {
    console.log("Database connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});