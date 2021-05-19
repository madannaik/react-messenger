import Avatar from "../../svg/boy.svg"
import "./css/chatbox.css"
import { Image, Box, Input ,Button} from "@chakra-ui/react";
import {ArrowRightIcon} from "@chakra-ui/icons";
<<<<<<< HEAD
import Chatbubble from './chatbubble';
import { io } from "socket.io-client";


=======
>>>>>>> parent of c1ff260 (on pause for 2 days)
export const ChatBox = () => {

    // const socketData = io("localhost:5000",{reconnection:false});
    //
    // const tryReconnect = () => {
    //     setTimeout(() => {
    //         socketData.io.open((err) => {
    //             if (err) {
    //                 tryReconnect();
    //             }
    //         });
    //     }, 2000);
    // }
    // socketData.io.on("close", tryReconnect);
    // socketData.on("connect", () => {
    //     console.log(socketData.id);
    // });
    //

    return <>
        <div className="chatarea">
            <div className="chatuserdata">
                <div className="chatusericon">
                    <Image className="chatavatar" src={Avatar} alt={"usericon"} />
                    <Box className="chatusername">Dave</Box>
                </div>
                <div className="chatdisplayspace">
                    
                </div>
                <div className="chatexchange">
                    <Input variant="filled" placeholder="filled" className="catchusertext" />
                    <Button rightIcon={<ArrowRightIcon />} colorScheme="blue" variant="outline" paddingX={3} paddingY={0} >
                        Send
                    </Button>
                </div>
            </div>
        </div>
    </>
}
