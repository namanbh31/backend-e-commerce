import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next)=>{

    try{
        const token = req.headers['authorization'];
        if(!token){
            return res.
            status(401)
            .send("Unauthorized");
        }
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET);  
            req.userID = payload.userId;
        next();
    
    }
    catch(err){
        res
        .status(401)
        .send("Unauthorized");
    }
}
export default jwtAuth;