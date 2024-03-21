const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");
const carsRoute = require("./routes/cars.js");
const reservationsRoute = require("./routes/reservations.js");
const branchesRoute = require("./routes/branches.js");

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://khaled:database123@cluster0.k6hhjl9.mongodb.net/carrental?retryWrites=true&w=majority&appName=Cluster0");;
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//middlewares

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/cars", carsRoute);
app.use("/api/reservations", reservationsRoute);
app.use("/api/branches", branchesRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend....");
});