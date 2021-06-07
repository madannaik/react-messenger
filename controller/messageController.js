import {Message} from '../models/Messege.js';
import bodyParser from "body-parser";

export const putMessage = (req,res)=>{
    const id1 = `${req.body.member1}${req.body.member2}`;
    const id2 = `${req.body.member2}${req.body.member1}`;
    // console.log(id1,id2);
    try {
        Message.findOne({"$or":[{"conversationId": id1},{"conversationId":id2}]} ,async(err,docs)=>{

            if(docs){
                res.send(docs);
                return 0;
            }
            else{
                console.log("does not exist so create one")
                const data = new Message({
                    conversationId: id1,
                });

                try{
                    const result = await data.save();
                    res.send(result);
                }catch (err){
                    console.log(err);
                }

            }

        })
    }

    catch (err){
        console.log(err);
    }



}
