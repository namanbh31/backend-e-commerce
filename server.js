import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";
import ProductRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import UserRouter from "./src/features/users/user.routes.js";
import cartItemsRouter from "./src/features/cartitems/cartItems.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import apiDocs from "./swagger.json" assert{type:'json'};
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
import orderRouter from "./src/features/orders/order.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import mongoose from "mongoose";
import likeRouter from "./src/features/like/like.routes.js";
const server = express();

server.use(loggerMiddleware);
server.use(bodyParser.json());
server.use("/api/orders", jwtAuth, orderRouter);
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
server.use("/api/products",jwtAuth, ProductRouter);
server.use("/api/users", UserRouter);
server.use("/api/likes", jwtAuth, likeRouter);
server.use("/api/cartitems",jwtAuth, cartItemsRouter);
server.get('/', (req, res)=>{
    res.send('Welcome to e-com api');
});

// Middleware to handle 404

server.use((req, res)=>{
    res
    .status(404)
    .send("API not found");
});
// Middleware to handle errors
server.use((err, req, res, next)=>{
    console.log(err);
    if(err, mongoose.Error.ValidationError){
        return res.status(400).send(err.message);
    }
    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message);
    }
    return res.status(500).send("something went wrong, please try again");
});
server.listen(3200, ()=>{
    console.log('server is listening on port 3200');
    // connectToMongoDB();
    connectUsingMongoose();
});