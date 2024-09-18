import express from 'express';
import upload from '../../middlewares/fileupload.middleware.js';
import ProductsController from './product.controller.js';
const ProductRouter = express.Router();
const productsController = new ProductsController();

ProductRouter.get('/filter', (req, res, next)=>{
    productsController.filterProducts(req, res, next);
});
ProductRouter.get('/', (req, res, next)=>{
    productsController.getAllProducts(req, res, next);
});
ProductRouter.post('/', upload.single('imageUrl'), (req, res, next)=>{
    productsController.addProduct(req, res, next);
});
ProductRouter.get('/averagePrice', (req, res, next)=>{
    productsController.averagePrice(req, res, next);
});
ProductRouter.get('/:id', (req, res, next)=>{
    productsController.getOneProduct(req, res, next);
});
ProductRouter.post('/rate', (req, res, next)=>{
    productsController.rateProduct(req, res, next);
});

export default ProductRouter;