
const User = require("../models/User");


const createUser = async (req,res,next)=>{
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        next(err);
    }
};


const updateUser = async (req,res,next)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
};

const getUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const getUsers = async (req,res,next)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

// user controller
const getUsersByEmails = async (req, res) => {
    try {
      const emails = req.body.emails;
      const users = await User.find({ email: { $in: emails } });
      const userIds = users.map(user => user._id);
      res.status(200).json(userIds);
    } catch (error) {
      res.status(400).send(error);
    }
  };

module.exports = { createUser, updateUser, deleteUser, getUser, getUsers, getUsersByEmails};