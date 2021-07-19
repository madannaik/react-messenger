import { UserModel } from "../models/UsersModel.js";

export const isActive = (isactive,email) =>{
    if(isactive){
        UserModel.findOneAndUpdate({"email":email},{$set:{isOnline:true}},{new:true},(err,docs)=>console.log("yes"));
    }
    else {
        UserModel.findOneAndUpdate({email:email},{$set:{isOnline:false}},{new:true},(err,docs)=>{console.log("no")});
    }
}

