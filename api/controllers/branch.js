const Branch = require("../models/Branch");
const Car = require('../models/Car');


const createBranch = async (req, res, next) => {
    const newBranch = new Branch(req.body);

    try {
        const savedBranch = await newBranch.save();
        res.status(200).json(savedBranch);
    } catch (err) {
        next(err);
    }
};

const getBranch = async (req, res, next) => {
    try {
        const branch = await Branch.findById(req.params.id);
        res.status(200).json(branch);
    } catch (err) {
        next(err);
    }
};

const getBranches = async (req, res, next) => {
    try {
        const branches = await Branch.find();
        res.status(200).json(branches);
    } catch (err) {
        next(err);
    }
};



module.exports = { createBranch, getBranch, getBranches };