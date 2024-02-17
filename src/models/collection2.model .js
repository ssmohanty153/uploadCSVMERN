import { Schema, model } from "mongoose";

const collectionScheam = new Schema({
    message: {
        type: String,
    }
});

export const Collection2 = model('Collection2', collectionScheam);
