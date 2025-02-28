"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const tours_1 = __importDefault(require("./routes/tours"));
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/tours", tours_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
const mongoUri = "mongodb+srv://lucas:lucas@tours.btu0v.mongodb.net/?retryWrites=true&w=majority&appName=tours";
mongoose_1.default.connect(mongoUri)
    .then(() => {
    console.log("Database connected to MongoDB Atlas");
})
    .catch((error) => {
    console.error("Database connection error:", error);
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
