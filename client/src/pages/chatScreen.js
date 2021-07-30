import { Divider, IconButton, Input } from "@chakra-ui/react";
import { React, useEffect, useState } from 'react';
import Avatar from "../assets/boy.svg"
import { ChatBox } from "../components/chatbox";
import { GetFriends } from "../services/API/user-service";
import { useHistory } from "react-router";
import "../styles/chatscreen.css"
import { SpinnerIcon } from "@chakra-ui/icons";

export const ChatScreen = () => {
    const key = JSON.parse(localStorage.getItem("item"));
    const loggedUser = key?.email;
    const history = useHistory()
    let elem = [];

    useEffect(() => {
        const keys = key?.isLoggedIn;
        if (!keys) {
            history.push("/");
        }
        else {
            GetFriends(key.id).then(data =>
                setNames(data.data.sort((x, y) => {
                    return x.email === loggedUser ? -1 : y === loggedUser ? 1 : 0;
                })));
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
                        <IconButton icon={<SpinnerIcon />} variant="outline" colorScheme="whiteAlpha" onClick={() => {
                            GetFriends(key?.id).then(data =>
                                setNames(data.data.sort((x, y) => {
                                    return x.email === loggedUser ? -1 : y === loggedUser ? 1 : 0;
                                })));
                        }} />
                        <Input variant="outline" color="white" placeholder="Search user" onChange={handlechange} />

                    </div>

                    <span className="divider">
                        <Divider orientation="horizontal" />
                    </span>
                    <div className="userdata">
                        {
                            Names.map((data) => {

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