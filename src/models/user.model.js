import { Schema, model } from "mongoose";
const userSchema = new Schema({
    firstName: {
        type: String,

        lowercse: true,
        trim: true,
    },
    dob: {
        type: Date,

        lowercse: true,
        trim: true,
    },
    address: {
        type: String,

        trim: true,
    },
    phone: {
        type: String,

    },
    state: {
        type: String,

    },
    zipCode: {
        type: String,

    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    gender: {
        type: String,

    },
    userType: {
        type: String,

    },
    policyNumber:{
        type: String,
      
       
        lowercase: true,
        trim: true
    }
}, { timestamps: true })

export const User = model("User", userSchema)