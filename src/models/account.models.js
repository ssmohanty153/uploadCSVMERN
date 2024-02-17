import { Schema, model } from "mongoose";

const accountSchema = new Schema({
    accountName: {
        type: String,
    }, policyNumber: {
        type: String,
        lowercase: true,
        trim: true
    }
});

export const UserAccount = model('UserAccount', accountSchema);
