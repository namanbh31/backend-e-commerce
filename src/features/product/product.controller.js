import { fileLoader } from "ejs";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductsController{
    constructor(){
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req, res){
        try{
            const products = await this.productRepository.getAll();
            return res.status(200).send(products);
        }
        catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
    async addProduct(req, res, next){
        try{
            const {name, price, sizes, desc, category} = req.body;
            const newProduct = new ProductModel(name, desc, req.file.filename, category, parseFloat(price), sizes.split(','));
            const createdRecord = await this.productRepository.add(newProduct);
            return res.status(201).send(createdRecord);
        }
        catch(err){
            // console.log(err);
            // return res.status(500).send("Something went wrong");
            next(err);
        }

    }
    async rateProduct(req, res, next){
        try{
            const userID = req.userID;
            const productID = req.body.productID;
            const rating = req.body.rating;
            const error = await this.productRepository.rate(userID, productID, rating);
            return res.status(200).send("rating added");
        }
        catch(err){
            next(err);
        }


    }
    async getOneProduct(req, res){
        try{
            const id = req.params.id;
            const product = await this.productRepository.get(id);
            if(!product){
                return res.status(404).send('product not found');
            }
            return res.status(200).send(product);
        }
        catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }

;
    }
    async filterProducts(req, res, next){
        try{
            const minprice = req.query.minPrice;
            // const maxprice = req.query.maxPrice;
            const categories = req.query.category;
            const result = await this.productRepository.filter(minprice, categories);
            return res.status(200).send(result);
        }
        catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }

    }
    async averagePrice(req, res, next){
        try{
            const result = await this.productRepository.averageProductPricePerCategory();
            return res.status(200).send(result);
        }
        catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
}