import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import SingnUpRoute from './controller/SingUp.js';
import { LoginRoute } from './controller/Login.js';
import { Server } from 'socket.io';
import http from "http";
import { GetUsersRoute } from './controller/getUserRoute.js';
import { putMessage } from "./controller/messageController.js";
import webSocket from "./services/webSocket.js";
import dotenv from  "dotenv";
import { GetUserData ,EditProfile, UpdatePassword} from './controller/EditProfile.js';
import { addFriends, getFriends } from './controller/Friends.js';
import rateLimit from "express-rate-limit" ;

dotenv.config({path:'./config.env'});
const app = express();
const httpserver = http.createServer(app);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

app.use(express.json({ extended: true }));
app.use(cors());
app.use(limiter);
app.use('/', SingnUpRoute);
app.use('/login', LoginRoute);
app.use('/getUser/:id/username/:username', GetUsersRoute);
app.use('/put', putMessage);
app.use('/getuserdata',GetUserData);
app.use('/updateprofile/changeavatar',EditProfile);
app.use('/updateprofile/changepassword',UpdatePassword);
app.use('/updateprofile/getfriends/:id',getFriends);
app.use('/updateprofile/addfriends',addFriends);
app.use('*', (req, res) => res.status(404).send("error"));

mongoose.connect(process.env.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        const server = httpserver.listen(process.env.PORT, () => {
            console.log("server is on");
        })
        const io = new Server(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });
        io.on("connection", (socket => {webSocket.connection(socket)}))

    }).catch((error) => console.error(error));
mongoose.set('useFindAndModify', false);



