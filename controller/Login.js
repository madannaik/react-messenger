import SignUpModel from '../models/dataschema.js';


export const LoginRoute = async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body ,"1");
    try {
        SignUpModel.findOne({ email: email }, async function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {

                // console.log("Result : ", docs);
                if (docs) {
                    // console.log(docs['password']);
                    const isMatch = password === docs['password'];
                    if (!isMatch) {
                        res.status(400).json({ message: "Incorrect password" });
                      } else {
                        res.json({ message: "user signed successfully!" ,status:"200",username:docs['username'],email:docs['email'],id:docs['_id']});
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
