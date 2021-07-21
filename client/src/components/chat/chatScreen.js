import {  Divider, Input } from "@chakra-ui/react";
import { React, useContext, useEffect, useState } from 'react';
import Avatar from "../../svg/boy.svg"
import { ChatBox } from "./chatbox";
import { ReactReduxContext } from "react-redux";
import { GetFriends } from "../../services/API/user-service";
import { useHistory } from "react-router";
import "./css/chatscreen.css"

export const ChatScreen = () => {
    const context = useContext(ReactReduxContext);
    const loggedUser = context.store.getState().logindetails.profile.email;
    const history = useHistory()
    useEffect(() => {
        const key = context.store.getState().logindetails.isLoggedIn;
        if (!key) {
            history.push("/");
        }
        else {
            GetFriends(context.store.getState().logindetails.profile.id).then(data =>
                setNames(data.data));
        }
    }, []);

    const [Names, setNames] = useState([]);
    const [input, setinput] = useState("");

    const [currentUserData, setcurrentUserData] = useState({
        currentuser: "",
        currentUserId: "",
        currentUserAvatar: "",
    })


    const handlechange = (event) => setinput(event.target.value);
    const handleClick = (event) => {
        setcurrentUserData(
            {
                ...currentUserData,
                currentuser: event.username,
                currentUserId: event._id,
                currentUserAvatar: event.image,

            }
        )


    };
    return <>
        <div>
 

            <div className="chatmaindiv">
                <div className="online-div">
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>                    
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
                    <ChatBox receiverID={currentUserData.currentUserId} username={currentUserData.currentuser} avatar={currentUserData.currentUserAvatar} handleclick={handleClick} />
                </div>

            </div>
        </div>
    </>
}