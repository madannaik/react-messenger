import React, { useState, useEffect } from "react"
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Heading,
    Divider
} from "@chakra-ui/react"
import { GetFriends } from "../services/API/user-service";
import Avatar from "../assets/boy.svg";
import "../styles/Drawers.scss"
import { Spinner } from "@chakra-ui/react"


export default function DrawerExample({ isOpen, onOpen, onClose, handleClick }) {

    const key = JSON.parse(localStorage.getItem("item"));
    const loggedUser = key?.email;
    useEffect(() => {
        GetFriends(key?.id).then(data =>
            setNames(data.data));
    }, []);
    const [Names, setNames] = useState([]);
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
                        <Heading as="h6" color="royalblue" marginTop="3" size="md" textAlign="center" cursor="pointer" width="100%" variant="outline" colorScheme="whiteAlpha" onClick={() => {
                            setNames([]);
                            GetFriends(key?.id).then(data =>
                                setNames(data.data.sort((x, y) => {
                                    return x.email === loggedUser ? -1 : y === loggedUser ? 1 : 0;
                                })));
                        }} >COR<span className="logo-half">Deᗡ</span></Heading>
                            <span className="divider">
                                <Divider orientation="horizontal" />
                            </span>
                            <div className="userdata">
                                <Spinner top="50%" left="50%" display={Names.length === 0 ? "block" : "none"} position="absolute" color="black" />
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