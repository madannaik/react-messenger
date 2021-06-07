import mongoose from 'mongoose';

const messages = mongoose.Schema;



const conversation = new messages({
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

}, {collection: "Messeges"});

export const Converstion = mongoose.model('conversation', conversation);