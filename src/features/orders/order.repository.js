import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import OrderModel from './order.model.js'
import {ApplicationError} from '../../error-handler/applicationError.js'
export default class OrderRepository{
    constructor(){
        this.collection = "orders";
    }
    async placeOrder(userId){
        const client = getClient();
        const session = client.startSession();      
        try{
        // 1. get cart items and calculate total amount

        const db = getDB();
        session.startTransaction();
        const items = await this.getTotalAmount(userId, session);
        const finalTotalAmount = items.reduce((sum, item)=>{
            return sum + item.totalAmount
        }, 0);
        //2. create an order record
        const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date());
        await db.collection(this.collection).insertOne(newOrder, {session});
        //3. reduce the stock
        for(let item of items){
            // console.log(item);
            await db.collection("products").updateOne(
                {_id:new ObjectId(item.productID)},
                {$inc:{stock: -item.quantity}}, 
                {session}
            );
        }
        //4.clear the cart
        await db.collection("cartItems").deleteMany({
            userID:new ObjectId(userId)
        }, {session});
        await session.commitTransaction();
        session.endSession();
        return;
        }
        catch(err){
            await session.abortTransaction();
            session.endSession();
            console.log(err);
            throw new ApplicationError("database connectivity error", 500); 
        }

    }
    async getTotalAmount(userId, session){
        try{
            const db = getDB();
            const items = await db.collection("cartItems").aggregate([
                {
                    $match:{userID:new ObjectId(userId)}

                },
                {
                    $lookup:{
                        from:"products",
                        localField:"productID",
                        foreignField:"_id",
                        as:"productInfo"
                    }
                },
                {
                    $unwind:"$productInfo"
                },
                {
                    $addFields:{
                        "totalAmount":{
                            $multiply:["$productInfo.price", "$quantity"]
                        }
                    }
                }
            ], {session}).toArray();

            return items;
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("database connectivity error", 500);
        }
    }
}