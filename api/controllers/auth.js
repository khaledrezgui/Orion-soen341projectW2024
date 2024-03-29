const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
};
const register = async (req,res,next)=>{
   try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hash,
        creditCard: {
            name: "N/A",
            number: "0000000000000000",
            cvv: "000",
            expiry: "00/00"
        }
    })

    await newUser.save()
    res.status(200).send("User has been created.")
   }catch(err){
    next(err);
   }
}

const login = async (req,res,next)=>{
    try{
     const user = await User.findOne({username:req.body.username});
     if (!user) return next(createError(404,"User not found!"));

     const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
     if (!isPasswordCorrect) 
        return next(createError (400,"Wrong password or username!"));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        const {password, isAdmin, ...otherDetails} = user._doc;
        res.status(200).json({ token, user: {...otherDetails, isAdmin} });
    }catch(err){
     next(err);
    }
 }
 
 module.exports = { register, login, };
