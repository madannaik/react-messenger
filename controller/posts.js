import SignUpModel from '../models/dataschema.js';
import compare from "express";

export const getPosts = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        SignUpModel.findOne({ email: email }, async function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {

                console.log("Result : ", docs);
                if (docs) {
                    console.log(docs['password']);
                    const isMatch = password === docs['password'];
                    if (!isMatch) {
                        res.status(400).json({ message: "Can't even remembe a password" });
                      } else {
                        res.json({ message: "user signed successfully!" ,status:"200"});
                      }
                    
                } else {
                    return res.status(422).json({ messege: "user does not exists", status: "422" });
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}
