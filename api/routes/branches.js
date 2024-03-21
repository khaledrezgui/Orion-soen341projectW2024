const express = require('express');
const { createBranch,
    getBranch,
    getBranches } = require('../controllers/branch.js');
const Branch = require('../models/Branch.js');
const router = express.Router();

//CREATE
router.post("/", createBranch);

//GET
router.get("/:id", getBranch);

//GET ALL
router.get("/", getBranches);

module.exports = router;
