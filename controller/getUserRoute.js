import SignUpModel from "../models/dataschema.js";
export const GetUsersRoute = async (req, res) => {

  let IDs = [];
  await SignUpModel.findOne(
    { _id: req.params.id },
    (err, docs) => {
      IDs = docs['friends'];
    }
  )
  let result;
  if (req.params.username === "null") {
    console.log("null");
    result = await SignUpModel.find({ _id: { $nin: IDs } }, { password: 0, __v: 0 });
  }
  else result = await SignUpModel.find({ _id: { $nin: IDs }, username: req.params.username }, { password: 0, __v: 0 });
  console.log(result)
  res.send(result);
}