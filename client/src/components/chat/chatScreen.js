import { useDisclosure } from "@chakra-ui/hooks";
import { Divider, Input} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { DrawerMenu } from "./Drawer";
import { React, useContext, useEffect, useState } from 'react';
import Avatar from "../../svg/boy.svg"
import "./css/chatscreen.css"
import { IconButton } from "@chakra-ui/react"
import { ChatBox } from "./chatbox";
import { ReactReduxContext } from "react-redux";
import { GetFriends } from "../../services/API/user-service";

export const ChatScreen = () => {
    const context = useContext(ReactReduxContext);
    const loggedUser = context.store.getState().profile.email;
    useEffect(() => {
        GetFriends(context.store.getState().profile.id).then(data=>
            setNames(data.data));
    }, []);


    const { isOpen, onOpen, onClose } = useDisclosure();
    const [Names, setNames] = useState([]);
    const [input, setinput] = useState("");

    const [currentUserData,setcurrentUserData] = useState({
        currentuser:"",
        currentUserId:"",
        currentUserAvatar:"",
    })


    const handlechange = (event) => setinput(event.target.value);
    const handleClick = (event) => {
        setcurrentUserData(
            {
                ...currentUserData,
                currentuser:event.username,
                currentUserId:event._id,
                currentUserAvatar:event.image,

            }
        )
        
        
    };
    return <>
        <div>
            <DrawerMenu isOpen={isOpen} onClose={onClose} onOpen={onOpen} />

            <div className="chatmaindiv">
                <div className="online-div">
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
                        <IconButton icon={<HamburgerIcon />} colorScheme="blackAlpha" aria-label="menu" onClick={onOpen} marginRight={1} />

                        <Input variant="outline" color="white" placeholder="Search user" onChange={handlechange} />

                    </div>

                    <span className="divider">
                        <Divider orientation="horizontal" />
                    </span>
                    <div className="userdata">
                        {Names.map((data) => {
                            
                            return <div className="singlecard" onClick={() => handleClick(data)} key={data.email} >
                                <div className="avatar-cnt">
                                    <img src={data.image ?? Avatar}
                                        alt={"avatar"}
                                        className="avatar"
                                    />
                                </div>
                               
                                
                                <h6 className="username">{data.email === loggedUser ? "saved message" : data.username}</h6>
                            </div>
                        })}
                    </div>


                </div>
                <div className="chatdiv">
                    <ChatBox receiverID={currentUserData.currentUserId} username={currentUserData.currentuser} avatar={currentUserData.currentUserAvatar} />
                </div>

            </div>
        </div>
    </>
}