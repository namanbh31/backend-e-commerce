import express from 'express';
import { CartItemsController } from './cartItems.controller.js';

const cartItemsRouter = express.Router();
const cartItemsController = new CartItemsController();
cartItemsRouter.delete("/:id", (req, res)=>{
    cartItemsController.delete(req, res);
});
cartItemsRouter.post("/", (req, res)=>{
    cartItemsController.add(req, res);
});
cartItemsRouter.get("/", (req, res)=>{
    cartItemsController.get(req, res);
});
export default cartItemsRouter;