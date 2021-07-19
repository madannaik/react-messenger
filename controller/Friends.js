import SignUpModel from "../models/dataschema.js"

export const addFriends = async (req,res)=>{
    console.log(req.body.addFriendId);
   
    SignUpModel.findByIdAndUpdate(
        {_id:req.body._id},
        {$addToSet:{friends:req.body.addFriendId}},
        (err,docs)=>{
            // console.log(docs);
            if(err) res.send({status:"error handling data"})
            else res.send({status:"added successfully"})
        })
}
export const getFriends = async (req,res)=>{
    let IDs;
    await SignUpModel.findOne(
        {_id:req.params.id},
        (err,docs)=>{
            IDs = docs['friends'];
            // res.send(docs);
            // IDs = docs['friends'];
        }
    )
    SignUpModel.find({_id:{$in:IDs}},{password:0},(err,docs)=>{
        if (err) res.send({status:"error"})
        else res.send({status:"success",data:docs});
    })
}
