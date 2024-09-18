import { LikeRepository } from "./like.repository.js";


export class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }
    async likeItem(req, res, next){

        try{
            const {id, type} = req.body;
            const userId = req.userID;
            if(type!='Product' && type!='Category'){
                
                return res.status(400).send("invalid type");
            }
            if(type=='Product'){
                await this.likeRepository.likeProduct(userId, id);
            }
            else{
                await this.likeRepository.likeProduct(userId, id);
            }
            return res.status(200).send();
        }
        catch(err){
            next(err);
        }
    }
    async getLikes(req, res, next){
        try{
            const {id, type} = req.query;
            const likes = await this.likeRepository.getLikes(type, id);
            return res.status(200).send(likes);
        }
        catch(err){
            next(err);
        }
    }
}