import { Schema, model } from "mongoose";

const policyInfoSchema = new Schema({
    policyNumber: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    policyStartDate: {
        type: Date,
        trim: true
    },
    policyEndDate: {
        type: Date,
        trim: true
    },
    policyCategory: {
        type: String,
        trim: true
    },
    collectionId: {
        type: String,
       
        lowercase: true,
        trim: true
    },
    companyCollectionId: {
        type: String,
        lowercase: true,
        trim: true
    },
    userId: {
        type: String,
        lowercase: true,
        trim: true
    },
    agencyId: {
        type: String,
        lowercase: true,
        trim: true
    },
    hasActiveClientPolicy: {
        type: Boolean,
        lowercase: true,
        trim: true
    },
    premiumAmount:{
        type: String,
        lowercase: true,
        trim: true
    }
});

export const PolicyInfo = model('PolicyInfo', policyInfoSchema);