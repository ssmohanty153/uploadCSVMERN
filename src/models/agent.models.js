import { Schema, model } from "mongoose";

const agentSchema = new Schema({
    agentName: {
        type: String,

    }, policyNumber: {
        type: String,
        trim: true
    }
});

export const Agent = model('Agent', agentSchema);
