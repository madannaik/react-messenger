import Avatar from "../../svg/boy.svg"
import "./css/chatbox.css"
import { Image, Box, Input ,Button} from "@chakra-ui/react";
import {ArrowRightIcon} from "@chakra-ui/icons";
export const ChatBox = () => {
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
