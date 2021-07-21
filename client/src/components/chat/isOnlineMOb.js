import React, { useState, useContext, useEffect } from "react"
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Divider
} from "@chakra-ui/react"
import { ReactReduxContext } from "react-redux";
import { GetFriends } from "../../services/API/user-service";
import Avatar from "../../svg/boy.svg";
import "./css/Drawers.scss"



export default function DrawerExample({ isOpen, onOpen, onClose, handleClick }) {


    const context = useContext(ReactReduxContext);
    const loggedUser = context.store.getState().logindetails.profile.email;
    useEffect(() => {
        GetFriends(context.store.getState().logindetails.profile.id).then(data =>
            setNames(data.data));
    }, []);
    const [Names, setNames] = useState([]);
    const [input, setinput] = useState("");
    const handlechange = (event) => setinput(event.target.value);
    const btnRef = React.useRef()


    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton _focus={{
                        border: "none"
                    }} />
                    <DrawerHeader></DrawerHeader>
                    <DrawerBody>
                        <div className="online-div-mob">
                            <Input variant="outline" color="white" placeholder="Search user" onChange={handlechange} />
                            <span className="divider">
                                <Divider orientation="horizontal" />
                            </span>
                            <div className="userdata">
                                {Names.map((data) => {

                                    return <div className="singlecard" onClick={() => {
                                        onClose();
                                        handleClick(data);
                                    }} key={data.email} >
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
                    </DrawerBody>


                </DrawerContent>
            </Drawer>
        </>
    )
}