import mongoose from 'mongoose';

let schema = mongoose.Schema;

let loginInfo = new schema({
    username:String,
    email: String,
    password: String
}, {collection: "UserData"});

let SignUpModel = mongoose.model('loginModel', loginInfo);

export default SignUpModel;