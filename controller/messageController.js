import {Message} from '../models/Messege.js';

export const putMessage = (req,res)=>{
    const {id1,id2} = req.body;
    console.log(req.body);
    try {
        Message.findOne({members:{member1:id1,member2:id2}},async(docs,err)=>{
            if(docs==={}){
                const data = new Message({
                    members:{
                        member1:id1,
                        member2:id2
                    }
                });
                const result = await data.save();
                console.log(result);
                res.send(result);
            }

        })
    }

    catch (err){
        console.log(err);
    }



}
