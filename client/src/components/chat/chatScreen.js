import { useDisclosure } from "@chakra-ui/hooks";
import {  Divider, Input } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { DrawerMenu } from "./Drawer";
import {React, useEffect, useState} from 'react';
import Avatar from "../../svg/boy.svg"
import "./css/chatscreen.css"
import { names } from "../constants/constant"
import { IconButton } from "@chakra-ui/react"
// import { EditProfile } from "./editprofile";
import { ChatBox } from "./chatbox";

export const ChatScreen = () => {

    useEffect(()=>{
        const requestOptions = {
            method: 'POST'
        }
        fetch('http://127.0.0.1:5000/getUser',requestOptions)
        .then(getResponse => getResponse.json())
        .then(data=>setNames(data))
            .catch(err =>console.log(err));
    },[]);


    const { isOpen, onOpen, onClose } = useDisclosure();
    const [Names, setNames] = useState([]);
    const [input, setinput] = useState("")


    const handlechange = (event) => setinput(event.target.value);
    const handleClick = (event) => {
        console.log(event.target.id);
    };
    return <>
        <div>
            <DrawerMenu isOpen={isOpen} onClose={onClose} onOpen={onOpen} />

            <div className="chatmaindiv">
                <div className="online-div">
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
                    <IconButton icon={<HamburgerIcon />} colorScheme="blackAlpha"  aria-label="menu" onClick={onOpen} marginRight={1} />
                      
                        <Input variant="outline" placeholder="Search user" onChange={handlechange} />
                        
                    </div>

                    <span className="divider">
                        <Divider orientation="horizontal" />
                    </span>
                    <div className="userdata">
                        {Names.map((data) => {
                            return <div className="singlecard" onClick={handleClick} id={data.email} >
                                <div style={{width:"25%",padding:0}}>
                                    <img src={Avatar}
                                         alt={"avatar"}
                                         className="avatar"
                                    />
                                </div>


                                <div className="card-details">
                                    <h6 className="username">{data.username}</h6>

                                    <p>Online</p>
                                </div>
                                <span className="status"></span>

                            </div>
                        })}
                    </div>


                </div>
                <div className="chatdiv">
                    <ChatBox/>
                </div>

            </div>
        </div>
    </>
}