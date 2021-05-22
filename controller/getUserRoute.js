import {UserModel} from "../models/UsersModel.js";
export const getUsers = async  (req,res) =>{
  const  result = await UserModel.find({},{password:0,__v:0});
  res.send(result);
}