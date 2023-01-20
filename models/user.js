import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true,
        min: 2,
        max: 50,
    },

    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },

    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },

    password: {
        type: String,
        require: true,
        min: 6,
    },

    picturePath: {
        type: String,
        default: "",  
    },

    Friends: {
        type: Array,
        default: [],
    },

    location: String,
    occupation: String,
    ViewedProfile: Number,
    impressions: Number,



},
{ timestamps: true}

);

const user = mongoose.model("User", UserSchema)
 
export default user;