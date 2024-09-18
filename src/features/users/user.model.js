import { getDB } from "../../config/mongodb.js";

export default class userModel{
    constructor(name, email, password, type, id){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }

    static getAll(){
        return users;
    }
}
let users = [{
    id:1,
    name:"Admin User",
    email:"seller@ecom.com",
    password:"123",
    type:"seller"
},
{
    id:2,
    name:"customer User",
    email:"customer@ecom.com",
    password:"123",
    type:"customer"
}
]