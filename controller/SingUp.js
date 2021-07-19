
import express from 'express';
import SignUpModel from '../models/dataschema.js';
import mail from "@sendgrid/mail";

const app = express.Router();
const APIKey = "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";
mail.setApiKey(APIKey);

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

              // res.status(201).json({ message: "user registered successfully!!" ,status:"200"});
              const message = {
                to: email.toString(), // Change to your recipient
                from: 'naikmadan9999@gmail.com', // Change to your verified sender
              }
              try {
                await mail.send({
                  to: email.toString(), // Change to your recipient
                  from: 'naikmadan9999@gmail.com', // Change to your verified sender
                  templateId: 'd-d813e697b0e6406b9f5ae77f71b81db5',

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
    console.log(err);
  }

});
export default app;


