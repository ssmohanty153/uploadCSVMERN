import { Schema, model } from "mongoose";

const carrierSchema = new Schema({
    companyName: {
        type: String,
    },
    policyNumber: {
        type: String,

       
        lowercase: true,
        trim: true
    }
});

export const Carrier = model('Carrier', carrierSchema);