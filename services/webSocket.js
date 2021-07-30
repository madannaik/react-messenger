import { updateConversation } from "../controller/converstionfetchandupdate.js";
import {UserModel} from "../models/UsersModel.js"
import {isActive} from "../controller/isActive.js"
// import { isActive } from "../controller/isActive.js";
// class DatabaseFuctions{
//     isActive(isactive,email){
//         if(isactive){
//             UserModel.findOneAndUpdate({"email":email},{$set:{isOnline:true}},{new:true},(err,docs)=>console.log("yes"));
//         }
//         else {
//             UserModel.findOneAndUpdate({email:email},{$set:{isOnline:false}},{new:true},(err,docs)=>{console.log("no")});
//         }
//     }
// }
class WebSockets {
    connection(socket) {
        socket.on("joinchat", function (data) {
            socket.email = data.email;
            socket.chatID = data.chatId;
            // super.isActive(true, data.email);    
            isActive(true, data.email);     
            // create a socket roomm    
            socket.join(data.chatId);
            // join users 
            socket.in(socket.chatId).socketsJoin(socket.id);
        });
        socket.on("send_message", (data) => {
            const { from, to, text, date, id } = data;

            const message = { from: from, to: to, text: text, time: date };
            updateConversation(id, message, () => {
                socket.to(id).emit("recieve_message", message);
            })

        })
        socket.on("disconnect", () => {
            let email = socket.disconnect().email;
                isActive(false,email);
                // super.isActive(false, data.email);   
        })
    }


}

export default new WebSockets();