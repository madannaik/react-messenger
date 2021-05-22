import mongoose from 'mongoose';

let schema = mongoose.Schema;

let UsersInfo = new schema({
  username:String,
  email: String,
}, {collection: "UserData"});

export const UserModel = mongoose.model('UserModel', UsersInfo);


