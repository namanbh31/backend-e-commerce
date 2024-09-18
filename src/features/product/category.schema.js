import mongoose from "mongoose";

export const categorySchema = mongoose.Schema({
    name:String,
    products:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Product'
        }
    ]
});