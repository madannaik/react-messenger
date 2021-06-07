import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import post from './controller/firstroute.js';
import { getPosts } from './controller/posts.js';
import { Server } from 'socket.io';
import http from "http";
import { instrument } from '@socket.io/admin-ui';
import { getUsers } from './controller/getUserRoute.js';
import { putMessage } from "./controller/messageController.js";
import { updateConversation } from "./controller/converstionfetchandupdate.js";


import { UserModel } from "./models/UsersModel.js";
import { Message } from './models/Messege.js';
const app = express();
const httpserver = http.createServer(app);
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: true }));

app.use(cors());
app.use('/', post);
app.use('/login', getPosts);

app.use('/getUser', getUsers);

app.use('/put', putMessage);

app.use('/api/message', updateConversation);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});
const addUsers = (socketId,email) => {
    !users.some(user => user.roomId === chatID) &&
        users.push({
            socketId: socketId,
            roomId: chatID,
            email: email,
        })
}
const deleteUser = (socketId) => {
    users.filter(user => user.socketId !== socketId);
}
let users = [];
const connectionUrl = 'mongodb+srv://madan:7777@cluster0.guhqf.mongodb.net/Messenger?retryWrites=true&w=majority';
mongoose.connect(connectionUrl,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        const server = httpserver.listen(PORT, () => {
            console.log("server is on");

        })
        const io = new Server(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });
        instrument(io, {
            auth: false
        });
        io.on("connection", (socket => {
            console.log(socket.id);


            // create a socket room upon join and add respective clients to room.
            socket.on("joinchat", function (data) {
                // console.log(data);
                socket.email = data.email;
                socket.chatID = data.chatId;
                UserModel.findOneAndUpdate({"email":data.email},{$set:{isOnline:true}},{new:true},(err,docs)=>console.log(docs));
                // addUsers(socket.id, data.chatId, data.email);
                socket.join(data.chatId);
                // console.log(socket.rooms);
                socket.in(socket.chatId).socketsJoin(socket.id);
                
            });

            socket.on("send_message", (data) => {
                const { from, to, text, date, id } = data;
                // console.log(from,to,text,date,id);
                const message = { from: from, to: to, text: text, time: date };
                Message.findOneAndUpdate({ _id: id }, { $push: { message: message } }, (err,docs) => {
                    // console.log(docs);
                    socket.to(id).emit("recieve_message",message);
                      
                    // res.send({ status: err });
                });
            })
            socket.on("disconnect",()=>{
               let email = socket.disconnect().email;
                UserModel.findOneAndUpdate({email:email},{$set:{isOnline:false}},{new:true},(err,docs)=>{console.log(docs)});
                
            })
            // socket.emit("message", { "minna hayaakkk nigero": "helle" })
        }))

    }).catch((error) => console.error(error));
mongoose.set('useFindAndModify', false);



