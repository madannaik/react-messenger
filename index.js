
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import post from './controller/firstroute.js'
import { getPosts } from './controller/posts.js';
import  socketio  from "socket.io";
import http from "http"
const app = express(); 
app.use(express.urlencoded({extended:true}));

app.use(cors());
app.use("/",post);
app.use("/login",getPosts); 
const server = http.createServer(app);
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection)
// const server = createServer(app);


 const PORT = process.env.PORT || 5000;
 const connectionUrl = "mongodb+srv://madan:7777@cluster0.guhqf.mongodb.net/Messenger?retryWrites=true&w=majority";
 mongoose.connect(connectionUrl,{useNewUrlParser:true,useUnifiedTopology:true})
         .then(()=>{
               app.listen(PORT,()=>console.log("server is running"))
         })
         .catch((error)=>console.error(error));
mongoose.set('useFindAndModify',false);   