import { io } from "socket.io-client";

export const socketData = io("http://localhost:5000",{reconnection:false});
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



