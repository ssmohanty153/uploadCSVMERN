import { Schema, model } from "mongoose";

const collectionScheam = new Schema({
    message: {
        type: String,
    }
});

export const Collection1 = model('Collection1', collectionScheam);
