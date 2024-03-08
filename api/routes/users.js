const express = require("express");
const User = require("../models/User.js");
const router = express.Router();

//CREATE
router.post("/", async (req, res) => {

    const newUser = new User(req.body)

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", async (req, res) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", async (req, res) => {

    try {
        const updatedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET
router.get("/:id", async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.get("/", async (req, res) => {

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
