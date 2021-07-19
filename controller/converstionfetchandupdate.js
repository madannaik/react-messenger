import {Message} from "../models/Messege.js";

export const updateConversation = (id,message,callback)=>{
    Message.findOneAndUpdate({_id:id},{$push:{message:message}},(err,docs)=>{
       if(err) return err;
       else {
         callback();  
       }
    });
}
