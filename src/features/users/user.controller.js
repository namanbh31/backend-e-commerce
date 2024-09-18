import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import brcrypt from 'bcrypt';

export default class UserController {
  constructor(){
    this.userRepository = new UserRepository();
  }
  async resetPassword(req, res, next){
    try{
      const {newPassword} = req.body;
      const userID = req.userID;
      const hashedPassword = await brcrypt.hash(newPassword, 12);  
      await this.userRepository.resetPassword(userID, hashedPassword);
      res.status(200).send("Password is updated");
    }
    catch(err){
      console.log(err);
      throw new ApplicationError("Internal server error with database", 500);
    }

  }       
  async signUp(req, res, next) {
    // const hashedPassword = await brcrypt.hash(password, 12);
    try {
      const { name, email, password, type } = req.body;
      const newUser = new UserModel(name, email, password, type);
      await this.userRepository.signUp(newUser);
      return res.status(201).send(newUser);

    } catch (error) {
      // throw new ApplicationError("Internal server error with database", 500);
      next(error);
    }
  }
  async signIn(req, res) {
    try{

      const user = await this.userRepository.findByEmail(req.body.email);
      if(!user){
        return res.status(400).send("invalid credentials");
      }
      const result = await brcrypt.compare(req.body.password, user.password)
      if (!result) {
        return res.status(400).send("invalid credentials");
      } else {
        const token = jwt.sign(
          { userId: user._id, email: user.email},
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res.send(token);
      }
    } 
    catch(err){
      console.log(err);
      return res.status(500).send("something went wrong while signIn");
    }

  }
}
