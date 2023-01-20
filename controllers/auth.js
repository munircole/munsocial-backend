import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js"



/* Register User */
 export const register = async (req, res) => {
    try {
        const {
            firstname,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordhash = await bcrypt.hash(password, salt);

        const newuser = new User({

            firstname,
            lastName,
            email,
            password: passwordhash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)

        });

        const savedUser = await newuser.save();
        res.status(201).json(savedUser);

    } catch(err){
        res.status(500).json({ error: err.message});

    }
 }


 /* Login */

 export const login = async( req, res) => {
    try{
        const{
            email,
            password
        } = req.body;

        const user = await User.findOne({email: email});
        if (!user) return res.status(400).json({msg: " This user does not exist."});

        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) return res.status(400).json({msg: " the password you entered is incorrect"});

        const token = jwt.sign({ id: user._id}, process.env.jwt_SECRET);
        delete user.password;
        res.status(200).json({token, user});


    }catch(err){
        res.status(500).json({error: err.message});
    }

 }