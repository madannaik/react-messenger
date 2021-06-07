import {Message} from "../models/Messege.js";

export const updateConversation = (req,res)=>{
    const {from,to,text,date,id} = req.body;
    const message = {from:from,to:to,text:text,time:date};
    Message.findOneAndUpdate({_id:id},{$push:{message:message}},(docs,err)=>{
        console.log(docs);
        res.send({status:err});
    });
}