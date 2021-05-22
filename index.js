import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import post from './controller/firstroute.js';
import {getPosts} from './controller/posts.js';
import {Server} from 'socket.io';
import {instrument} from '@socket.io/admin-ui';
import {getUsers} from './controller/getUserRoute.js';
import {putMessage} from "./controller/messageController.js";
// import {putMessage} from  './controller/messageController.js';
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json({extended: true}));

app.use(cors());
app.use('/', post);
app.use('/login', getPosts);
app.use('/getUser',getUsers);
app.use('/put',putMessage);
const server = app.listen(PORT,()=>{
  console.log("server is on");
})

const  io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
instrument(io, {
  auth: false
});

io.on("connection",(socket => {
  console.log(socket.id);
}))

const connectionUrl = 'mongodb+srv://madan:7777@cluster0.guhqf.mongodb.net/Messenger?retryWrites=true&w=majority';
mongoose.connect(connectionUrl,
    {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log('connected');
}).catch((error) => console.error(error));
mongoose.set('useFindAndModify', false);

