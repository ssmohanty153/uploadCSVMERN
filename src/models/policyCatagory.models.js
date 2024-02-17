
import { Schema, model } from "mongoose";

const policyCatagorySchema = new Schema({
    categoryName: {
        type: String,

    },
    policyNumber:{
        type: String,
        
        lowercase: true,
        trim: true
    }
});

export const PolicyCatagory = model('PolicyCatagory', policyCatagorySchema);
