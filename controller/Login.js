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

                if (docs) {

                    const isMatch = password === docs['password'];
                    if (!isMatch) {
                        res.send({ message: "Incorrect password" });
                      } else {
                        res.send({ message: "user signed successfully!" ,status:"200",username:docs['username'],email:docs['email'],id:docs['_id']});
                      }
                    
                } else {
                    return res.send({ messege: "user does not exists", status: "422" });
                }
            }
        });
    } catch (err) {
        return res.send({ messege: "server is down", status: "422" });
    }
}
