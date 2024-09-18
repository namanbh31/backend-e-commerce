import mongoose, { model } from "mongoose";
import {likeSchema} from "./like.schema.js"
const LikeModel = mongoose.model('Like', likeSchema);
export class LikeRepository{
    async likeProduct(userId, productId){
        try{
            const newLike = new LikeModel({
                user:new mongoose.Types.ObjectId(userId),
                likeable: new mongoose.Types.ObjectId(productId),
                types:'Product'
            });
            await newLike.save(); 
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("database connectivity error", 500);
        }
    }

    async likeCategory(userId, categoryId){
        try{
            const newLike = new LikeModel({
                user:new mongoose.Types.ObjectId(userId),
                likeable: new mongoose.Types.ObjectId(categoryId),
                types:'Category'
            });
            await newLike.save(); 
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("database connectivity error", 500);
        }
    }
    async getLikes(type, id){
        return await LikeModel.find({
            likeable:new mongoose.Types.ObjectId(id),
            types:type
        }).populate('user').populate({path:'likeable', model:type});
    }
}