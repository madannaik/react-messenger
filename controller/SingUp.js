
import express from 'express';
import SignUpModel from '../models/dataschema.js';
import mail from "@sendgrid/mail";
import dotenv from "dotenv"
const app = express.Router();
dotenv.config({path:'./config.env'});
mail.setApiKey(process.env.SENDGRID_API);
let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send({ status: 'ok' }));
app.post("/", async function (req, res) {

  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    let userExist;
    SignUpModel.findOne({ email: email }, async function (err, docs) {
      if (err) { console.log(err) }
      else {
        console.log("Result : ", docs);
        if (docs) {
          return res.status(422).json({ message: "useralready exists", status: "422" });
        } else {

          let name = await SignUpModel.findOne({ username: username }, async function (err, docs) {
            if (docs) {
              console.log(err);
              res.send({ message: "username is taken", status: "422" })
            }
            else {
              const user = new SignUpModel({ username, email, password });
              const message = {
                to: email.toString(), // Change to your recipient
                from: 'naikmadan9999@gmail.com', // Change to your verified sender
              }
              try {
                await mail.send({
                  to: email.toString(), // Change to your recipient
                  from: 'njgutmmmjplpamgofe@zqrni.com', // Change to your verified sender
                  templateId: 'd-244f129c512e4ff6b474d0345e2c56a9',

                });
                console.log("mail sent")
                const userRegister = await user.save();
                await SignUpModel.findByIdAndUpdate({ _id: userRegister["_id"] }, { $addToSet: { friends: userRegister["_id"] } });
                res.status(201).json({ message: "user registered successfully!!", status: "200" });
              } catch (error) {
                console.error(error);
                res.send({ message: "invalid mail id!!", status: "404" });
                if (error.response) {
                  console.error(error.response.body);

                }
              }
            }
          });


        }
      }

    });
  } catch (err) {
    res.send({message:"server is down",status: "401" })
  }

});
export default app;


