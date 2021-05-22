import mongoose from 'mongoose';

const messages = mongoose.Schema;

const memberSchema = new messages({
    member1:{
        type:String,
    },
    member2:{
        type:String,
    }
})

const messageFormat  = new messages({
    from:{
        type:String,
    },
    to:{
        type:String,
    },
    text:{
        type:String
    },
    time:{
        type:Date,
        default:Date.now
    }
})
const messageSchema = new messages({
    members: memberSchema,
    message: messageFormat,
}, {collection: "UserData"});

export const Message = mongoose.model('Message', messageSchema);