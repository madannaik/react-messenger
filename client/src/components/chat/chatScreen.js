import { useDisclosure } from "@chakra-ui/hooks";
import { Divider, Input } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { DrawerMenu } from "./Drawer";
import {names} from "../constants/misc";
import { React, useContext, useEffect, useState } from 'react';
import Avatar from "../../svg/boy.svg"
import "./css/chatscreen.css"

import { IconButton } from "@chakra-ui/react"
// import { EditProfile } from "./editprofile";
import { ChatBox } from "./chatbox";
import { ReactReduxContext } from "react-redux";

export const ChatScreen = () => {
    const context = useContext(ReactReduxContext);
    const loggedUser = context.store.getState().profile.username;
    useEffect(() => {
        const requestOptions = {
            method: 'POST'
        }
        fetch('http://127.0.0.1:5000/getUser', requestOptions)
            .then(getResponse => getResponse.json())
            .then(data => {
                setNames(data);
                // console.log(data);
            })
            .catch(err => console.log(err));
    }, []);


    const { isOpen, onOpen, onClose } = useDisclosure();
    const [Names, setNames] = useState([]);
    const [input, setinput] = useState("");
    const [currentuser, setCurrentUser] = useState('')
    const [currentUserId, setCurrentUserId] = useState('')



    const handlechange = (event) => setinput(event.target.value);
    const handleClick = (event) => {
        setCurrentUser(event.username);
        setCurrentUserId(event._id);
        // console.log(currentuser);
        // console.log(currentUserId);
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
                                <div style={{ width: "25%", padding: 0 }}>
                                    <img src={Avatar}
                                        alt={"avatar"}
                                        className="avatar"
                                    />
                                </div>
                                <h6 className="username">{data.username === loggedUser ? "saved message" : data.username}</h6>
                            </div>
                        })}
                    </div>


                </div>
                <div className="chatdiv">
                    <ChatBox receiverID={currentUserId} username={currentuser} />
                </div>

            </div>
        </div>
    </>
}