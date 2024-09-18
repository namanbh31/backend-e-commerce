import mongoose from "mongoose";
export const reviewScema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    rating:Number
});