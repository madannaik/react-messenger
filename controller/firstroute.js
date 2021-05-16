
import express from 'express';
import SignUpModel from '../models/dataschema.js';

const app = express.Router();
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send({ status: 'ok' }));
app.post("/",async function (req, res) {

  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    let userExist;
    SignUpModel.findOne({ email: email },async function (err,docs){
      if (err){
        console.log(err)
    }
    else{
      
        console.log("Result : ",docs);
        if (docs) {
          return res.status(422).json({ messege: "useralready exists" ,status:"422"});
        }  else {
          const user = new SignUpModel({ username, email, password });
    
    
          const userRegister = await user.save();
    
          res.status(201).json({ message: "user registered successfully!!" ,status:"200"});
        }
    }
    });  
  } catch (err) {
    console.log(err);
  }

});
export default app;


