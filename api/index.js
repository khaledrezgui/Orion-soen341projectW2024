const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");
const carsRoute = require("./routes/cars.js");

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.")
    } catch (error) {
        throw error
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})

//middlewares

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", authRoute);
app.use("/api/cars", authRoute);

app.listen(8800, () => {
    connect()
    console.log("Connected to backend....");
});