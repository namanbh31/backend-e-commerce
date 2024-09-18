import { ApplicationError } from "../../error-handler/applicationError.js";
import userModel from "../users/user.model.js";
export default class ProductModel {
  constructor(name, desc, imageUrl, category, price, sizes, id) {
    this._id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.sizes = sizes;

  }
  static addProduct(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }
  static filter(minPrice, maxPrice, category) {
    const ans = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category == category)
      );
    });
    return ans;
  }
  static get(id) {
    const ans = products.find((product) => product.id == id);
    return ans;
  }
  static getAll() {
    return products;
  }
  static rateProduct(userID, productID, rating) {
    const user = userModel.getAll().find((u) => u.id == userID);
    if (!user) {
      throw new ApplicationError("User not found",404);
    }
    const product = products.find((p) => p.id == productID);
    console.log("product");
    if (!product) {
      throw new ApplicationError("Product not found", 400);
    }
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({ userID: userID, ratings: rating });
    } else {
      const existingRatingIndex = product.rating.findIndex(
        (p) => p.userID == userID
      );
      if (existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex] = {
          userID: userID,
          rating: rating,
        };
      } else {
        product.ratings.push({ userID: userID, rating: rating});
      }
    }
  }
}
var products = [
  new ProductModel(
    1,
    "product 1",
    "Description for product 1",
    "https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fdfstudio-d420.kxcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2019%2F06%2Fdigital_camera_photo-1080x675.jpg&imgrefurl=https%3A%2F%2Fwww.dfstudio.com%2Fdigital-image-size-and-resolution-what-do-you-need-to-know%2F&docid=KEFtss0dYCDpzM&tbnid=0kl2WrGN8BrkhM&vet=12ahUKEwigt7fNjNqFAxUPzjgGHd51A54QM3oECFUQAA..i&w=1080&h=675&hcb=2&ved=2ahUKEwigt7fNjNqFAxUPzjgGHd51A54QM3oECFUQAA",
    "electronics",
    29.99,
    "regular"
  ),
  new ProductModel(
    2,
    "product 2",
    "Description for product 2",
    "https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fdfstudio-d420.kxcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2019%2F06%2Fdigital_camera_photo-1080x675.jpg&imgrefurl=https%3A%2F%2Fwww.dfstudio.com%2Fdigital-image-size-and-resolution-what-do-you-need-to-know%2F&docid=KEFtss0dYCDpzM&tbnid=0kl2WrGN8BrkhM&vet=12ahUKEwigt7fNjNqFAxUPzjgGHd51A54QM3oECFUQAA..i&w=1080&h=675&hcb=2&ved=2ahUKEwigt7fNjNqFAxUPzjgGHd51A54QM3oECFUQAA",
    "electronics",
    59.99,
    "irregular"
  ),
];
