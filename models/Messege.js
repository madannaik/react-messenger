import mongoose from 'mongoose';

const messages = mongoose.Schema;

const messageSchema = new messages({
    conversationId:String,
    message: Array,
}, {collection: "Messeges"});

export const Message = mongoose.model('Message', messageSchema);