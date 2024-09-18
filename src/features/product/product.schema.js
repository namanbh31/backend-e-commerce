import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

export const productSchema = mongoose.Schema({
  name:String,
  description:String,
  imageUrl:String,
  category:String,
  price:Number,
  sizes:Array,
  inStock:Number,
  reviews:[{type:mongoose.Schema.Types.ObjectId, ref:"review"}],
  categories:[{type:mongoose.Schema.Types.ObjectId, ref:"Category"}]
});
    