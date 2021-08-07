import { io } from "socket.io-client";
import {API_URL} from  "../utils/misc"
export const socketData = io(API_URL,{reconnection:false});
const tryReconnect = () => {
    setTimeout(() => {
        socketData.io.open((err) => {
            if (err) {
                tryReconnect();
            }
        });
    }, 20);
}

socketData.on("disconnect",tryReconnect);



