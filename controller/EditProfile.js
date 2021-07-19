import SignUpModel from "../models/dataschema.js";
import { UserModel } from "../models/UsersModel.js"

export const EditProfile = (req, res) => {
    UserModel.findOneAndUpdate(
        { _id: req.body._id },
        { $set: { "image": req.body.image } },
        { new: true },
        (err, docs) => {
            if (err) { console.log(err); }
            else { res.send(docs) };
        })
}


export const UpdatePassword = (req, res) => {

    SignUpModel.findOneAndUpdate(
        { $and: [{ _id: req.body._id }, { password: req.body.password }] },
        { $set: { password: req.body.newpassword } },
        { 'password': 1, "_id": 0, new: true },
        (err, docs) => {
            if (err) res.send({ status: "server error", key: "danger" })
            else if (docs === null) res.send({ status: "Incorrect password", key: "warning" })
            else res.send({ status: "password Updated" });
        })

}
export const GetUserData = (req, res) => {
    UserModel.findOne({ ...req.body }, { "password": 0 }, (err, docs) => {
        if (err) res.status(400).send("client error")
        else res.send(docs);
    })
}
