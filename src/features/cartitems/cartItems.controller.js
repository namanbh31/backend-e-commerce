import CartItemsRepository from "./cartitems.repository.js";
export class CartItemsController{
    constructor(){
        this.cartItemsRepository = new CartItemsRepository();
    }
    async add(req, res){
        try{
            const {productID, quantity} = req.body;
            const userID = req.userID;
            await this.cartItemsRepository.add(productID, userID, quantity);
            return res.status(201).send("cart is updated");
        }
        catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
    async get(req, res){
        try{
            const userID = req.userID;
            const result = await this.cartItemsRepository.get(userID);
            return res.status(200).send(result);
        }
        catch(err){
            return res.status(200).send("Something went wrong");
        }

    }
    async delete(req, res){
        try{
            const cartItemID = req.params.id;
            const userID = req.userID;
            const result = await this.cartItemsRepository.delete(userID, cartItemID);
            if(!result){
            return res.status(200).send("item not found");
            }
            return res.status(200).send("item successfully deleted");
        }
        catch(err){
            return res.status(200).send("Something went wrong");
        }
    }
}