import userModel from "../features/users/user.model.js";

const basicAuthorizer = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).send("No authorization details found");
    }
    console.log(authHeader);
    const base64Credentials = authHeader.replace('Basic', '');
    console.log(base64Credentials);
    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    console.log(decodedCreds);
    const creds = decodedCreds.split(":")
    const user = userModel.getAll().find((u)=>u.email == creds[0] && u.password == creds[1]);
    if(user){
        next();
    }
    else{
       return res.status(401).send("Incorrect Credentials"); 
    }
}
export default basicAuthorizer;