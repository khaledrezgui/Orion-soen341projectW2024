const express = require('express');
const {createUser,
    updateUser,
    deleteUser,
    getUser,
    getUsers,
getUsersByEmails } = require('../controllers/user.js');
const User = require('../models/User.js');
const router = express.Router();

//CREATE
router.post("/", createUser);

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getUsers);

router.post("/byEmails", getUsersByEmails);

module.exports = router;
